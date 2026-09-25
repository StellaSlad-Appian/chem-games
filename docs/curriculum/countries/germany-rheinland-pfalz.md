# Rheinland-Pfalz Gymnasium chemistry curriculum (G9 and G8GTS): Sek I Themenfelder, MSS Bausteine, organic chemistry, energetics, kinetics, equilibrium

**Purpose:** the Rheinland-Pfalz (RP) reference for the organic chemistry and energetics games planned in
[`../ORGANIC_GAMES_FRAMEWORK.md`](../../ORGANIC_GAMES_FRAMEWORK.md), in the same shape as
[`germany-bavaria.md`](./germany-bavaria.md). No earlier RP research exists in this repo.
**Research date:** 25 Sept 2026 (desk research by an agent, from primary sources).
**Review status:** not yet checked by a teacher who teaches in Rheinland-Pfalz. Stella knows teachers there who can review it.

Primary sources: the MSS *Lehrplan Chemie* (2022), the Sek I *Lehrpläne für die naturwissenschaftlichen Fächer, Klassenstufen 7 bis 9/10* (2014), the *Richtlinien G8GTS* (2015, republished 2024), the ministry's *Rundschreiben zur Abiturprüfungsordnung* (23.06.2025) and its 2022 letter on the Abitur changes, the KMK *Wochenpflichtstunden 2025/2026*. The PDFs were read in full (text extraction). Full URL list at the end. Anything not confirmed from a primary source is marked **(unverified)**.

Access note: `bildung.rlp.de`, `lehrplaene.bildung-rp.de` and `static.bildung-rp.de` refused connections from this machine on 25 Sept 2026. The Lehrpläne were downloaded from the ministry's *Schulcampus* (edu-sharing) links that bildung.rlp.de itself points to; the bildung.rlp.de pages were read from Wayback Machine snapshots of April, May and September 2026.

## What this means for chem-games (summary)

- **The MSS is not split into years.** The Oberstufe Lehrplan is a set of *Bausteine* that schools order freely across Jgst. 11–13 (G9). Only the *Integrationsphase* (11/1) is fixed. A game has to be tagged with a **Baustein** (e.g. "7.2 Reaktionsgeschwindigkeit") and a course level (GK/LK), not with a year.
- **The mole comes late.** The Sek I Lehrplan has no *Stoffmenge*, no molar mass and no oxidation numbers. *Stoffmenge*, molar mass, molar volume and concentrations are introduced in the Integrationsphase (Jgst. 11/1; Jgst. 10 in G8GTS). Oxidation numbers first appear in MSS Baustein 4.1.
- **Sek I organic chemistry is thin and deliberately unsystematic.** Sek I has methane (TF 3), the first ten alkane names, alkanols as solvents (TF 5) and polymers (TF 7). The Lehrplan says systematic naming of homologous series and isomers is *not* done ("Auf eine ausufernde Betrachtung der systematischen Benennungen von homologen Reihen und Isomeren wird verzichtet"). IUPAC nomenclature, *Konstitutionsisomerie*, alkenes/alkynes and E/Z all start in the MSS.
- **Energetics:** the Grundkurs (GK) does ΔrH, enthalpy diagrams, calorimetry, bond enthalpies, enthalpies of formation and Hess. **Entropy, ΔG and Gibbs–Helmholtz are Leistungskurs (LK) only.** Bavaria's gA does Gibbs qualitatively; RP's GK does not do it at all.
- **Kinetics is more mathematical than in Bavaria.** A simplified **rate law (*Geschwindigkeitsgesetz*) is compulsory for GK and LK**, and **Kc = k_hin/k_rück** is derived from it for elementary reactions. **Maxwell–Boltzmann ("Energieverteilungskurven nach Boltzmann") is LK only.** Reaction order, *Zeitgesetze*, Arrhenius and tangent/secant rates are only optional *Vertiefungsmöglichkeiten*.
- **Mechanisms:**
  - GK (compulsory): radical substitution, electrophilic addition of halogens, and radical polymerisation.
  - LK adds as compulsory: electrophilic addition of HX (Markovnikov) and of water, elimination, the ester addition–elimination mechanism with acidic and alkaline hydrolysis, and electrophilic aromatic substitution.
  - Nucleophilic substitution at halogenoalkanes is only an LK *Wahlbaustein* (8.6).
  - **E/Z via priority rules is for everyone.** **R/S (CIP) is LK compulsory**, which is unusual for a German Land.
- **The Abitur uses one fixed format, with central tasks.** The written Chemistry Abitur is on the LK (eA) level. The student chooses 3 of 4 tasks: 2 set by the school's own teacher, 2 set centrally. 300 min, 40 BE per task, IQB operators and the IQB formula collection. Used since the 2025 Abitur.
- **G8GTS shifts everything one year earlier.** In the ~G8 all-day Gymnasien the MSS runs 10–12, and Klasse 10 is both the end of Sek I and the MSS introductory phase.

---

## 0. Timeline: what applies in school year 2026/27

| Level | Document | Status in 2026/27 |
|---|---|---|
| Kl. 5–6 (Orientierungsstufe) | *Rahmenlehrplan Naturwissenschaften* (integrated subject "Naturwissenschaften"; its Themenfelder are cited by the Sek I Lehrplan, e.g. "NaWi TF 5 Teilchen, Aggregatzustand", "TF 7 Stoffeigenschaft, Stoffklasse, Stoffgemisch, Stofftrennung") | In force. Edition date not confirmed **(unverified; believed to be 2010)** |
| Kl. 7–9/10 (all school types) | *Lehrpläne für die naturwissenschaftlichen Fächer Biologie, Chemie, Physik, Klassenstufen 7 bis 9/10*, Ministerium für Bildung, Wissenschaft, Weiterbildung und Kultur, **"Erscheinungstermin: 2014"**. Chemistry = 12 *Themenfelder* | In force. bildung.rlp.de still links it as the Sek I Lehrplan (Wayback snapshots of April and May 2026) |
| G8GTS Kl. 7–12 | *Richtlinien zur Umsetzung der Lehrpläne Biologie, Chemie und Physik … im 8-jährigen Gymnasium mit Ganztagsschule (G8GTS)*, dated 2015, re-posted in a 2024 folder | In force. Its MSS references use the **old 1998 Baustein numbering** ("5 Int", "16 P", "76 P"…), so they are stale |
| MSS Jgst. 11–13 (G9) / 10–12 (G8GTS) | *Lehrplan Chemie, Grund- und Leistungsfach in der gymnasialen Oberstufe (Mainzer Studienstufe)*, Ministerium für Bildung, **"Erscheinungstermin: 2022"**. It replaced the 1998 Lehrplan | In force for every MSS cohort. It is binding "ab dem Schuljahr 2022/23 aufwachsend" and first applied to the **2025 Abitur** (Klett synopsis: "gültig ab Abitur SJ 2024/25") |
| Abitur | AbiPrO of 21.07.2010 as amended; *Rundschreiben zur Abiturprüfungsordnung vom 23.06.2025* (school year 2025/26). New task structure for the sciences "erstmals für Schülerinnen und Schüler …, die im Jahr 2025 die Abiturprüfung ablegen" (ministry letter of 20.06.2022) | In force. The 2026/27 Rundschreiben was not found **(unverified whether anything changed)** |

- **New Lehrpläne announced:** none found.
  - The bildung.rlp.de Naturwissenschaften page (snapshot May 2026) lists the 2014 Sek I Lehrplan next to the KMK 2004 standards and the KMK *weiterentwickelte Bildungsstandards* for the MSA (13.06.2024).
  - A Sek I revision to implement the 2024 standards is plausible but was **not found announced (unverified)**.
- **Before the 2022 Lehrplan:** the old MSS Lehrplan Chemie dates from 1998 (Edoweb record, superseded). It is the source of the "zentrale Elemente" wording that older secondary sources still quote.

---

## 1. Structure

### 1.1 G9 and G8GTS

- **G9 is the norm.** The G8 Abitur exists only at schools that applied for it, and only as an all-day school: *G8GTS, Gymnasium mit 8-jähriger Schulzeit und Ganztagsschule*.
  - The number of G8GTS schools is **(unverified; roughly 20)**.
  - The Abitur certificate is issued by 31 March of the final year (Studienkreis, secondary source).
- **G9:** Orientierungsstufe 5–6, Mittelstufe 7–10, MSS 11–13.
  - The MSS lasts about 2.5 years: *Einführungsphase* 11/1 and *Qualifikationsphase* 11/2–13.
  - Lehrplan quote: "in G9 das Halbjahr 11/2 sowohl zur Einführungs- als auch zur Qualifikationsphase gehört".
- **G8GTS:** Orientierungsstufe 5–6, Mittelstufe 7–9, MSS 10–12.
  - Klasse 10 is both the last Sek I year (the MSA-level qualification is reached "spätestens am Ende der Jahrgangsstufe 10") and the MSS *Einführungsphase*.
  - The Lehrplan (5.1) says Jgst. 10 must also cover "noch ausstehende Inhalte des Lehrplans der Sekundarstufe I".

### 1.2 When chemistry starts; hours (Sek I)

- **Kl. 5–6:** integrated subject *Naturwissenschaften*, 7 contingent hours over the two years (Stundentafel of 2004). There is no separate chemistry.
- **G9 Kl. 7–10:**
  - The Stundentafel gives a contingent for the "Naturwissenschaftl. Bereich" of **19 hours over 7–10**. **Chemie has a minimum of [6] hours over the four years** (Biologie [6], Physik [7]).
  - The footnote says the contingents "sind durchgehend auf die Jahrgangsstufen zu verteilen".
  - Source: VV of 26.10.2004, GAmtsbl. 1/2005 p. 5, from a school's scan. KMK *Wochenpflichtstunden 2025/26* still reports a free Sek I total contingent of 181 h for G9, consistent with this table.
  - **How schools split the 6 hours is school-specific.** Chemistry typically runs as its own subject from Kl. 8 (a secondary search result: "ab Klasse 8"). Some schools start in Kl. 7 **(unverified: no statewide rule found)**.
- **G8GTS Kl. 7–9:**
  - The sciences get "je eine Wochenstunde weniger" than in G9 7–10.
  - For chemistry the Richtlinien assume **1/2/2 hours in Kl. 7/8/9**.
  - The *Wahlpflichtfach Naturwissenschaften* can add science. Students who take Informatik in Jgst. 10 drop one science.
- **Wahlpflicht / Wahlfächer (G9):** the Stundentafel's *wahlfreier Bereich* lists a 3rd foreign language, Informatik, and "weitere Wahlfächer, z. B. … Naturwissenschaftl. Bereich". There is no chemistry-specific Wahlpflichtfach with its own Lehrplan **(unverified)**.
- **Sek I Lehrplan structure:**
  - 12 *Themenfelder* (TF) with **no year assignment in the chemistry part**. The Physics part, by contrast, has "Themenfelder pro Lernjahr".
  - The **order is binding in principle**: "Alternative Planungen gehen zu Lasten der inneren Logik". A Fachkonferenz may reorder only "im Ausnahmefall".
  - TF 1–3 need the most time; TF 4 needs less.
  - Pupils who leave after Kl. 9 (*Berufsreife*) "die Themenfelder 9-12 in der Regel so nicht kennen lernen". So **TF 9–12 are in practice the last Sek I year (Kl. 10 in G9)** (inference).
  - The same Lehrplan applies to every school type. Its level is "an einem mittleren Niveau". Each TF lists *G* (Grundverständnis) and *V* (Vertiefung) options; the Gymnasium is expected to use the V options ("anschlussfähiges Wissen für das Lernen in der Oberstufe").

### 1.3 MSS: Grundkurs (GK) and Leistungskurs (LK)

- **Hours:** the Lehrplan's time model counts 100 school weeks, **GK 300 h and LK 500 h, i.e. 3 and 5 h/week**. Of these, about 60 % is planned for Lehrplan content, the rest goes to lost lessons and a *pädagogischer Freiraum*:

| | GK | LK |
|---|---|---|
| Hours to be taught (after losses) | 243 | 405 |
| Pflichtbausteine (P) | 142 h (58.4 %) | 228 h (56.3 %) |
| Wahlpflichtbausteine (WP), minimum | 9 h, i.e. at least 1 WP Rahmenbaustein | 30 h, i.e. at least 2 WP Rahmenbausteine |
| Wahlbausteine (W), minimum | 35 h (about 7–9 Bausteine) | 50 h (about 10–12 Bausteine) |
| Pädagogischer Freiraum | 57 h | 97 h |

- **Baustein rules:**
  - The Baustein titles are the same for GK and LK. The LK gets the GK hours plus "+ n h" of *Additum*.
  - The *Fundamentum* applies to both levels, the *Additum* to the LK only.
  - A Baustein can be W for the GK and P for the LK (e.g. 8.3 Aromaten I).
  - Pflichtbausteine must be covered "vollumfänglich". W/WP content may be covered exemplarily, "in hinreichender Breite und Tiefe".
  - Pflicht content taught before the Qualifikationsphase must be revisited in it, so that it can be examined orally.
- **WP choice:**
  - GK must pick ≥ 1 of *Lipide*, *Kohlenhydrate*, *Proteine*.
  - LK must pick ≥ 2 of *Farbmittel* (6.1–6.3), *Lipide*, *Kohlenhydrate*, *Proteine*.
  - So biomolecules are guaranteed only in part: a GK student meets at least one of fats, sugars or proteins.
- **Leistungsfächer:** RP students take several Leistungsfächer, and the written Abitur subjects are Leistungsfächer.
  - The Chemistry Rundschreiben sets GK-format tasks (255 min, 30 BE) only for Freie Waldorfschulen. That implies a Gymnasium's written Chemistry Abitur is always at LK level.
  - Unconfirmed: the exact number of Leistungsfächer (3), and whether a science must be taken through to the Abitur **(unverified; MSS-Verordnung not read)**.
- **The Integrationsphase opens the MSS (compulsory, GK 25 h / LK 30 h, in 11/1).** It repeats and extends Sek I: atomic model, bonding, structure–property relations and stoichiometry.
  - For G8GTS the 2022 Lehrplan places it in 10/1. The 2015 G8GTS Richtlinien say instead "Eine Integrationsphase findet nicht mehr wie bisher statt", and fold the content into TF 9, 11 and 12.
  - **These contradict each other (unverified which applies; the newer Lehrplan probably wins).**
- **Order of the Bausteine is free.** The Lehrplan gives four non-binding *Strukturierungsvorschläge* (A–D). Vorschlag A (GK), for example, runs:
  1. Integrationsphase → alkanes (8.1) → fossil fuels (8.5 W)
  2. "voraussichtlicher Beginn der Qualifikationsphase" → alkenes (8.2) → redox 4.1 → carbonyl compounds 3.1–3.3
  3. equilibrium 7.1 → kinetics 7.2 → 7.5 → MWG 7.3 → environmental chemistry 17.1 → acids and bases 15 → titration 1.2 → carbohydrates 11 (WP)
  4. part 2: energetics 5 → electrochemistry 4.2–4.5 → aromatics → dyes → drugs → plastics → solar cells

### 1.4 Abitur format (written, Chemistry)

From the Rundschreiben of 23.06.2025, §4.3, and the ministry letter of 20.06.2022.

- **The ministry letter of 20.06.2022 announced the model:** "Unter Beibehaltung der in Rheinland-Pfalz bewährten Form der dezentralen Aufgabenstellung". RP keeps teacher-set tasks and adds central ones.
- **The teacher submits 3 equivalent task proposals.** The *Abiturauswahlkommission* picks 2 of them and adds **2 centrally set tasks**. The student **chooses 3 of the 4**.
- **Time and marks:** each task takes 90 min. The total is **300 min including the choice time**. Each task is worth **40 BE**.
- **Rules for each proposal:**
  - Each proposal centres on a *different Rahmenbaustein*, spans several Rahmenbausteine of the Qualifikationsphase, and covers AFB I–III, weighted AFB II > AFB I > AFB III.
  - It uses the **IQB operator list** (*Grundstock von Operatoren*).
  - At least one proposal includes Jgst. 13 content (Jgst. 12 in G8GTS).
  - At least one proposal centres on Wahlpflicht- or Wahlbausteine.
  - Task types: material-based, practical (at most one proposal), or mixed.
- **Aids:** a scientific calculator, plus the **IQB formula collection** (*Mathematisch-naturwissenschaftliche Formelsammlung*). Other aids introduced in class may be allowed by the teacher.
- **Timing:** G9 written exams are in **January** of Jgst. 13. G8GTS and other routes sit later (a central make-up date in May is mentioned).
- **The central tasks:** whether they are drawn from the **IQB joint pool** is **(unverified)**.
  - For English the Rundschreiben says explicitly: "Die zentrale Aufgabe entspricht den Vorgaben des Gemeinsamen Abituraufgabenpools". For Chemistry it does not.
  - An RP teacher's blog prepares students with IQB pool tasks.
- **Oral exam:** two tasks, from different half-years of the Qualifikationsphase, covering at least two *Inhaltsbereiche* of the Bildungsstandards.

---

## 2. Content by year

### 2.1 Sek I Themenfelder (G9: Kl. 7/8–10; order binding, years not fixed)

The table gives the placement per Themenfeld. G9 years are *typical* (inferred). G8GTS years are from the Richtlinien. "Fachbegriffe" are the terms the Lehrplan makes binding for pupils.

| TF | Title | G9 year (typical) | G8GTS year | Content (Stoffebene / Teilchenebene) and binding Fachbegriffe |
|---|---|---|---|---|
| 1 | *Chemikers Vorstellungen von den Stoffen* | 7 or 8 | 7 (1 h) | Diversity of substances, element vs compound, element symbols, formula, **PSE**, chemical reaction, combustion, *Edukt/Produkt*, **conservation of mass**. A simple atom model with only mass, size and sphere shape; Dalton's indivisibility is deliberately left out. Hazard labels are folded in here for G8GTS |
| 2 | *Von der Saline zum Kochsalz* | 8 | 8 | Salts; *Gemisch/Reinstoff*; **separation methods** (flow chart). Properties: melting temperature, conductivity in solution and melt, solubility, brittleness. **Differentiated atom model: nucleus (p, n) and shell (e)**, ions, **ionic bonding, ion lattice**, *Oktettregel*. V options: *Verhältnisformeln*, shell/energy-level model, extraction, chromatography |
| 3 | *Heizen und antreiben* | 8 | 8 | Hydrogen and methane as fuels; **combustion, reaction equations**, analysis/synthesis of water; **exotherm/endotherm, *Aktivierungsenergie*, *Reaktionsenergie* with energy diagrams**; *Brennwert*; fire triangle. **Electron-pair bonding, molecules**. G options: tests for CO₂, O₂, H₂ and water. V options: EPA model for water and methane; "hier bereits die homologe Reihe der Alkane" |
| 4 | *Vom Erz zum Metall* | 8 | 8 | Ores, metals and their extraction by reaction; metal oxides; **metallic bonding / metal lattice**; conductivity, density. Forming and decomposing an oxide are "prinzipiell umkehrbar". V options: electron transfer (first donor–acceptor contact), noble/base metals, simple quantitative equations. G8GTS adds the blast furnace or copper extraction here (from TF 8) |
| 5 | *Sauber und schön* | 9 | 9 | Water, **hydrocarbons and *Alkanole* as solvents**; *Kohlenstoffverbindung*, **Alkane, Alkanole, *funktionelle Gruppe***; polar/unpolar, dipole, hydrophil/hydrophob/lipophil/lipophob; properties change with molecule size within a class. **"Die Namen der ersten zehn Vertreter der Alkane werden … eingeführt. Auf eine ausufernde Betrachtung der systematischen Benennungen von homologen Reihen und Isomeren wird verzichtet."** V options: EPA tetrahedron, **electronegativity** ("zur Vorbereitung auf die Oberstufe … sinnvoll"), hydrogen bonds, Van der Waals. G options: tensides |
| 6 | *Säuren und Laugen* | 9 | 9 | Indicators, **pH**; *Säure* vs *saure Lösung*; *Base/Alkalien*, *alkalische Lösung (Lauge)*; **neutralisation** (Oxonium-Kation + Hydroxid-Anion → water); *Protonenübertragung*, *Donator-Akzeptor-Prinzip*; reactions with limestone and base metals. V option: pH as a factor-10 scale. **"Explizit ist hier nicht das Konzept der Säurestärke über pKs-Werte gemeint."** The G8GTS Richtlinien say carboxylic acids are handled here **(unverified in the TF text)** |
| 7 | *Schöne neue Kunststoffwelt* | 9 | 9 | Plastics; **Thermoplaste, Elastomere, Duroplaste**; macromolecule, monomer, **Mehrfachbindung**, polymer, *Polyreaktion*; monomers with a multiple bond or several functional groups. G option: PE or PP with structural formulas. V options: functional groups, intermolecular forces, comparison with starch, cellulose and DNA. **"In Abgrenzung zur Oberstufe werden keine Reaktionsmechanismen besprochen."** |
| 8 | *Vom Reagenzglas zum Reaktor* | 9–10 | cut; integrated in TF 3, 4, 6 or 7 | Industrial processes (a company visit), *Ausbeute*, continuous vs batch, countercurrent principle, *Energiebilanz*; **catalysts lower the activation energy**. G option: particle size (*Zerteilungsgrad*), pre-heating, catalysts. V option: pressure and concentration for optimisation |
| 9 | *Den Stoffen auf der Spur* | 10 | 10 (E-phase; plus mole/stoichiometry "gemäß der Integrationsphase") | Water analysis: **titration (*Maßanalyse*), concentration, colorimetry, chromatography**, measurement accuracy, *Nachweisgrenze*, *Grenzwert*. V option: calibration, element families, stoichiometry |
| 10 | *Gefährliche Stoffe* | 10 | cut; integrated in TF 1, 3, 5 | Toxic and explosive substances, *Gefahrstoffkennzeichnung*, LD50, AGW, BGW; benefit/risk analysis |
| 11 | *Stoffe im Fokus von Umwelt und Klima* | 10 | 10 (GK adds equilibrium/Le Chatelier; LK adds MWG and catalysis) | **Carbon cycle**, natural and anthropogenic greenhouse effect, absorption/emission, carbon sinks, fossil vs renewable energy carriers, dynamic model, modelling |
| 12 | *Mobile Energieträger* | 10 | 10 (tied to MSS redox Bausteine) | Batteries, accumulators, **Redoxreihe**, oxidation and reduction as electron release and uptake, **galvanic element**, donor–acceptor; accumulator reactions are reversible. "ohne vertiefte Betrachtungen von Elektrodenprozessen" |

**Not in the Sek I chemistry Lehrplan** (checked by full-text search):
- *Stoffmenge*/mole, molar mass, oxidation numbers, isomer naming, alkenes as a class (only "Mehrfachbindung" for monomers), reaction rate, equilibrium.
- Radioactivity is in the **Physics** Lehrplan.
- The MSS Lehrplan confirms that in Sek I equilibrium and kinetics are "in aller Regel nicht oder nur diffus beleuchtet", and that alkynes and aromatics are "in aller Regel nicht" taught.

### 2.2 MSS: Integrationsphase (Jgst. 11/1 G9; 10/1 G8GTS), GK 25 h / LK 30 h, compulsory, same content for both

- ***Aufbau der Materie*:** atomic model (ionisation energies, energy-level model); "Aufbau des PSE: Elektronenkonfiguration und Atommasse".
- ***Chemische Bindungen*:**
  - ionic bonding, salts, *Ionengruppe*, *Verhältnisformel*
  - **electron-pair bonding, single and multiple bonds**
  - "Darstellung von Molekülen und Molekül-Ionen: **Summen-, Lewis-, Skelett-, Halbstruktur-Formel, Formalladungen**"
  - electronegativity, polar covalent bond, partial charge, **molecular geometry**, dipole
  - **"Konstitutionsisomerie (weitere Isomerieformen → Aliphaten I und II), IUPAC-Nomenklatur"**
  - metallic bonding, electron-gas model
- ***Struktur und Eigenschaften*:** dipole–dipole interactions ("temporäre Dipole, permanente Dipole"), hydrogen bonds, ion–dipole interactions; melting and boiling temperatures and solubility ("Vergleich von Alkanen mit Alkanolen").
- ***Stöchiometrie*:**
  - equations "auf Stoff-, Teilchen- und Formelebene"
  - **chemisches Rechnen:** *Stoffmenge*, molar mass, **molar volume**, *Massenkonzentration*, *Stoffmengenkonzentration*
  - used and deepened continuously in later Bausteine

### 2.3 MSS Bausteine, Jgst. 11–13 (G9) / 10–12 (G8GTS), in any order

Key: P = Pflicht, WP = Wahlpflicht, W = Wahl. "GK/LK: P 4 h" means compulsory in both, 4 h. "LK + n h" is the LK *Additum*. Hours are guideline values. The table is complete; the four strands are expanded below it.

| Rahmenbaustein | Bausteine (status, hours) | Content (GK = Fundamentum; **LK only** marked) |
|---|---|---|
| 1 Analytik | 1.1 Chromatografie (**LK P 4**); 1.2 Maßanalyse (GK P 4, LK P 10); 1.3 Massenspektrometrie (**LK W 2**); 1.4 nasschemische Analyse (GK/LK P 3); 1.5 Spektroskopie (GK W 4, LK W 7) | **1.1:** stationary and mobile phase, retention time, *Retentionsfaktor*, two methods (paper, TLC, column, GC). **1.2:** standard solution, burette, equivalence point; titration of monoprotic acids; indicator-based endpoint. **LK:** polyprotic acids, titration-curve calculations, potentiometric endpoint, one redox titration. **1.3:** ionisation, fragmentation, isotopes, reading spectra. **1.4:** precipitation, colour, flame and gas tests; ions (chloride, bromide, carbonate, ammonium…); "Analyse von funktionellen Gruppen". **1.5:** EM spectrum, excitation, UV/VIS photometer, calibration line. **LK:** Lambert–Beer |
| 2 Arzneimittel | 2.1 Grundlagen (W 5); 2.2 Pharmakokinetik (W 2); 2.3 Arzneimittelforschung (W 5) | Definitions, classes, history, patents, galenics; uptake, action, breakdown, interactions; drug research, clinical phases, quality control, synthesis |
| 3 Carbonylverbindungen | 3.1 *Alkanale (Aldehyde) und Alkanone (Ketone)* (P 4); 3.2 *Carbonsäuren und Carbonsäurederivate* (P 3); 3.3 *Esterbildung und Esterspaltung* (GK P 4, LK P +4) | **3.1:** oxidation of primary and secondary alkanols; aldehyde and keto groups, homologous series, nomenclature; tests (**Fehling, Benedict, Tollens**). **3.2:** oxidation to *Alkansäuren*; carboxy group, homologous series, nomenclature; esters and salts. **3.3:** esterification (condensation), *Carbonsäurealkylester*, uses, nomenclature. **LK:** mechanism of nucleophilic substitution ("Additions-Eliminierungs-Mechanismus"); mechanism of acidic and alkaline hydrolysis (transesterification to biodiesel, saponification, biodegradable polyesters). Optional *Vertiefung*: aldols, imines, oximes; amides, anhydrides, acid chlorides; IR of C=O |
| 4 Elektronenübertragungsreaktionen | 4.1 Donator-Akzeptor-Prinzip, Redoxreaktionen (GK P 5, LK +1); 4.2 Galvanische Zellen (P 6, LK +4); 4.3 Elektrolysezellen (P 4, LK +4); 4.4 chemische Energiespeicherung (P 6, LK +3); 4.5 Korrosion (P 5); 4.6 Solarzellen und Leuchtmittel (W 5) | **4.1:** **oxidation numbers**, redox couples, balancing inorganic redox equations in acidic and alkaline solution (organic redox via 3). **LK:** comproportionation and disproportionation, redox titration. **4.2:** electrochemical double layer, anode/cathode, cell voltage, **standard hydrogen half-cell, standard electrode potentials, *elektrochemische Spannungsreihe***. **LK:** concentration cell, **Nernst equation incl. pH dependence**. **4.3:** electrolysis cells, one extraction process, ecology. **LK:** **Faraday's laws**, decomposition voltage, overpotential. **4.4:** primary cell, secondary cell, fuel cell. **4.5:** acid and oxygen corrosion; active and passive protection |
| 5 Energetik | 5.1 Energie (P 2); 5.2 *Enthalpie und Entropie* (GK P 8, LK +7; the GK list writes "Enthalpie [und Entropie]") | See 2.4 |
| 6 Farbmittel | 6.1–6.3 (GK W; **LK WP** 5/8/4); 6.4 Geschichte, 6.5 Pigmente (W 3) | Colour theory, chromophore. **LK:** auxochrome and antiauxochrome groups; dye classes. **LK:** **azo dyes and the mechanism of their synthesis**, plus 2 more classes (no mechanism); dyeing methods; history (IG Farben, indigo); pigments |
| 7 Gleichgewicht und Kinetik | 7.1 chemisches Gleichgewicht (P 5); 7.2 Reaktionsgeschwindigkeit (P 7, LK +4); 7.3 Massenwirkungsgesetz (P 5); 7.4 Löslichkeit (**LK P 2**); 7.5 angewandte Verfahren (P 2) | See 2.5 and 2.6 |
| 8 (Halogen-)Kohlenwasserstoffe | 8.1 Aliphaten I – Alkane (P 3, LK +3); 8.2 Aliphaten II – Alkene und Alkine (P 4, LK +6); 8.3 Aromaten I (**GK W 6 / LK P 6+1**); 8.4 Aromaten II (**LK W 6**); 8.5 fossile Energieträger (W 4); 8.6 Halogenkohlenwasserstoffe (**LK W 3**); 8.7 Orbitalmodell (**LK W 5**) | See 2.3.1 |
| 9 Komplexchemie (LK only) | 9.1 Grundlagen (**LK P 5**); 9.2 Ergänzung (**LK W 5**) | Central particle as Lewis acid, ligands as Lewis bases, dative bond, IUPAC names of complexes, coordination number, applications; chelates, complex-formation constants, isomerism of complexes, crystal and ligand field theory (only if 8.7 was taught) |
| 10 Lipide | 10.1 Struktur und Eigenschaften (GK WP 5, LK WP 6); 10.2 Vorkommen und Verwendung (WP 4) | Ester bond; waxes (mono-), phospholipids (di-) and fats and oils (tri-esters); saturated and unsaturated fatty acids; acid, saponification and iodine numbers; nutrition, hardening of fats, biodiesel, emulsifiers, soaps. The intro says E/Z nomenclature is applied here |
| 11 Makromoleküle I – Kohlenhydrate | 11.1 Monosaccharide (GK WP 3, LK WP 5); 11.2 Di- und Polysaccharide (GK WP 6, LK WP 8) | Aldoses and ketoses "jeweils in **FISCHER- und HAWORTH-Projektion**". **LK:** nucleophilic addition (hemiacetal, hemiketal). Glycosidic bond α/β; maltose, cellobiose, sucrose, lactose, starch, cellulose; reducing vs non-reducing sugars. **LK:** addition–elimination to full acetals |
| 12 Makromoleküle II – Proteine | 12.1 Aminosäuren (GK WP 2, LK WP 3); 12.2 Struktur (GK WP 3, LK WP 4); 12.3 Funktion (GK WP 4, LK WP 6) | Structure, classification by side chain. **LK:** zwitterion, isoelectric point. Peptide bond, (poly)condensation, primary to quaternary structure, denaturation, **Biuret / Xanthoprotein**. **LK:** mesomerism of the peptide bond. Enzymes, technical uses |
| 13 Makromoleküle III – Kunststoffe | 13.1 Syntheseverfahren (P 4, LK W +2); 13.2 Struktur und Eigenschaften (P 5, LK W +2); 13.3 Spezialkunststoffe (W 3); 13.4 ökologisch-ökonomische Betrachtungen (P 5) | **Mechanism of radical polymerisation** (photolysis, photoinitiator); polycondensation (polyesters, polyamides). **LK optional:** polyester and polyamide mechanisms; cross-linking, intermolecular forces, thermoplastics, thermosets and elastomers, processing, additives; recycling types, bioplastics, micro- and nanoplastics |
| 14 Moderne Werkstoffe | 14.1–14.3 Nanomaterialien (GK W, **LK P** 2/4/2); 14.4 weitere innovative Materialien (W 3) | Definition, natural occurrence, structures, properties (lotus effect), applications, risks |
| 15 Protonenübergangsreaktionen | 15.1 Brønsted (P 3); 15.2 Lösungen von Säuren und Basen (P 6, LK +4); 15.3 Indikatoren (P 1, LK +1); 15.4 Puffersysteme (P 1, LK +2); 15.5 Titration (→ 1.2) | **15.1:** Brønsted acid and base, protolysis equilibrium, conjugate pairs, *Ampholyt*, autoprotolysis, *K*W and p*K*W. **15.2:** pH, pOH; acid vs acidic solution; ***K*S (*Säureexponent* p*K*S), *K*B, p*K*B**; pH of strong acids and bases. **LK:** pH of weak acids and bases, and of salt solutions. **15.3:** indicators, qualitative. **LK:** indicator equation, transition range. **15.4:** buffers, qualitative. **LK:** **Henderson–Hasselbalch**, buffer range, buffer capacity |
| 16 Tenside | 16.1 Struktur und Eigenschaften (W 4); 16.2 Herstellung und Verwendung (W 4) | Anionic, cationic, non-ionic and amphoteric tensides; Tyndall effect, micelles, emulsifying; saponification, detergents |
| 17 Umweltchemie | 17.1 Umweltprobleme und Umweltschutz (GK P 12, LK P 18); 17.2 Umweltanalytik (GK W 5, LK W 8) | Environmental compartments, **carbon cycle, greenhouse effect, climate change, acidification of oceans and soils**, alternative fuels, plus one more issue (ozone hole, photochemical smog…). **LK:** a further element cycle (N, P or S). Water or soil analysis (Winkler, BSB5, photometry of phosphate and nitrate). **LK:** CSB, gravimetry, chelatometry |

#### 2.3.1 Organic chemistry, in depth (Rahmenbausteine 3, 8, 10–13)

- **Nomenclature:**
  - IUPAC nomenclature starts in the Integrationsphase.
  - Branched and unbranched alkanes: 8.1.
  - Alkenes and alkynes "Nomenklatur (Prioritätsregeln)": 8.2.
  - Aldehydes, ketones and carboxylic acids with their homologous series: 3.1 and 3.2.
  - Esters ("Carbonsäurealkylester … Nomenklatur"): 3.3.
  - **LK:** R/S nomenclature "gemäß CAHN-INGOLD-PRELOG-Konvention": 8.2.
  - **LK:** complex nomenclature: 9.1.
- **Functional groups:** hydroxy (Alkanole, from Sek I), aldehyde, keto, carboxy, ester; amino and peptide groups (12, WP); halogen (8.1, 8.2, 8.6). Amides, anhydrides, acid chlorides and ethers appear only as optional *Vertiefung*.
- **Isomerism:**
  - *Konstitutionsisomerie*: Integrationsphase and 8.1.
  - **"Konfigurationsisomerie (geometrische Isomerie)"** with priority rules (i.e. E/Z): 8.2, GK and LK.
  - **LK:** *Konformationsisomerie*, Newman/sawhorse projection (8.1).
  - **LK:** "Konfigurationsisomerie (optische Isomerie) am Beispiel chiraler Halogenalkan-Moleküle (Enantiomere)" with R/S (8.2).
  - GK: Fischer projections of monosaccharides in 11.1 (WP). The Lehrplan does not name chirality, D/L or enantiomers for the GK **(unverified what GK teachers do)**.
- **Reactions and mechanisms:**

| Mechanism / reaction | GK | LK | Where |
|---|---|---|---|
| Combustion (complete, incomplete) | P | P | 8.1 |
| Radical substitution (alkanes + halogens, photolysis, photoinitiator) | P | P, plus regioselectivity and inductive effect | 8.1 |
| Electrophilic addition of halogens; bromine test for multiple bonds | P | P | 8.2 |
| Electrophilic addition of HX (Markovnikov, inductive effect) and of water | – | P | 8.2 |
| Elimination (making alkenes) | – | P | 8.2 |
| Oxidation of alkanols to alkanals, alkanones and alkanoic acids | P | P | 3.1, 3.2 |
| Esterification (condensation) | P, no mechanism | P, with addition–elimination mechanism; acidic and alkaline hydrolysis | 3.3 |
| Electrophilic aromatic substitution | W (8.3) | P, 2 examples | 8.3 |
| Second substitution, directing effects, I/M effects, phenol acidity, aniline basicity | – | W | 8.4 |
| Nucleophilic substitution at halogenoalkanes | – | W | 8.6 |
| Radical polymerisation (mechanism) | P | P | 13.1 |
| Polycondensation | P | P; polyester and polyamide mechanisms W | 13.1 |
| Nucleophilic addition (hemiacetal) and acetal formation | – | WP | 11.1, 11.2 |
| Azo coupling (mechanism) | – | WP | 6.2 |
| sp/sp²/sp³ hybridisation, σ/π, MO theory, band model | – | W | 8.7 |

- **Aromaticity (8.3):** Kekulé and Robinson formulas, the mesomerism model, delocalisation, the **Hückel rule**, and comparing electrophilic addition with electrophilic aromatic substitution. It is W for the GK and P for the LK.

### 2.4 Energetics (5.1, 5.2, GK and LK)

- **Sek I (TF 3, 8, 11):**
  - *exotherm/endotherm*, *Aktivierungsenergie*, *Reaktionsenergie* in energy diagrams, *Brennwert*, *Energiebilanz*
  - "Energieträgerwechsel" is the Sek I term for energy transfer (**no ΔH**)
  - the MSS intro confirms the Sek I work is qualitative
- **5.1 (P 2 h):** energy carriers, energy transfer, **open, closed and isolated systems**, **1st law**.
- **5.2 Fundamentum (GK and LK, 8 h):**
  - **Reaktionsenthalpie ΔrH**: exotherm/endotherm, *Enthalpiediagramme*, "Bestimmung mittels **Kalorimetrie**"
  - **bond enthalpies:** "Abschätzung von molaren Standardreaktionsenthalpien (ΔrH°m) aus molaren Standardbindungsenthalpien"
  - **enthalpies of formation:** ΔrH°m from ΔfH°m
  - **"Satz von HESS, Enthalpiezyklus"**
- **5.2 Additum (LK only, +7 h):**
  - **2nd law** ("Entropiesatz"): ΔS_ges ≥ 0, ΔS_ges = ΔS_Sys + ΔS_Umg, ΔH = −T·ΔS_Umg
  - driving forces: entropy vs enthalpy
  - ΔrS°m from S°m
  - **free reaction enthalpy ΔrG**, *exergonisch/endergonisch*
  - **Gibbs–Helmholtz** (ΔG = ΔH − T·ΔS_sys = −T·ΔS_ges), predicting the direction of reactions
  - ΔrG°m from ΔfG°m
- **Optional *Vertiefung* only:** volume work, ΔrU = ΔrH + W_v (the Bavarian energy/enthalpy distinction), and **ΔrG°m ↔ K**.

### 2.5 Kinetics (7.2)

- **Sek I:** activation energy and catalysts (TF 3, TF 8). *Zerteilungsgrad* and pre-heating appear in TF 8.
- **Fundamentum (GK and LK, 7 h):**
  - **rate "als zeitliche Änderung der Konzentration"**
  - factors: **temperature (RGT-Regel), concentration, pressure, *Zerteilungsgrad*, catalyst (homogeneous and heterogeneous catalysis)**
  - "vereinfachte Betrachtung der **Kollisions- bzw. Stoßtheorie, Geschwindigkeitsgesetz**"
  - kinetic interpretation of how equilibrium is reached (v_hin ≠ v_rück, v_ges ≠ 0) and of the equilibrium state (v_hin = v_rück, v_ges = 0)
- **Additum (LK only, +4 h):** "Interpretation von Konzentrations-Zeit-Diagrammen"; "**Mindestenergie, Energieverteilungskurven nach BOLTZMANN**".
- **Optional *Vertiefung* only:** Arrhenius equation; autocatalysis and photocatalysis; oscillating reactions; rate–time diagrams; **reaction order, *Zeitgesetze***; secant and tangent slopes (*Durchschnitts- und Momentangeschwindigkeit*).

### 2.6 Equilibrium (7.1, 7.3–7.5)

- **7.1 (GK and LK, P 5 h):**
  - forward and back reaction, dynamic equilibrium, reaching equilibrium vs the equilibrium state
  - **qualitative disturbance, Le Chatelier** (temperature, concentration, pressure)
  - Lehrplan S 15: "grenzen … den statischen Zustand auf Stoffebene vom dynamischen Zustand auf Teilchenebene ab"
- **7.3 MWG (GK and LK, P 5 h), the same for both levels:**
  - **"Gleichgewichtskonstante (Kc = khin/krück) herleiten über den Gleichgewichtszustand (vhin = vrück) am Beispiel von Elementarreaktionen"**
  - "einfache Berechnungen von cGl (Kc bekannt) bzw. Kc (cGl bekannt)"
  - interpreting the position of equilibrium from Kc
  - quantitative disturbance: a mathematical reading of Le Chatelier
  - **Optional *Vertiefung* only:** calculations from c₀ (ICE-type), **Kp and the ideal gas law**, steady state
- **7.4 Löslichkeit (LK only, P 2 h):** solubility equilibrium, ***K*L, p*K*L**, simple calculations.
- **7.5 angewandte Verfahren (GK and LK, P 2 h):**
  - one of Haber–Bosch, contact process or Ostwald
  - optimising yield by shifting the equilibrium (temperature, concentration, pressure)
  - speeding up the approach to equilibrium (temperature, catalyst)
- **Related:**
  - acid–base equilibria (15)
  - complex-formation equilibria (**LK** 9.2 W)
  - electrochemical equilibrium (4.2)

---

## 3. Where each topic sits: summary for game design (G9)

| Topic | Sek I (TF, typical year) | MSS GK | MSS LK |
|---|---|---|---|
| Particle and atom model, PSE, formulas | TF 1–2 (7/8) | Integrationsphase (11/1) | same |
| Ionic, covalent, metallic bonding | TF 2–4 (8) | Integrationsphase | same; orbitals, hybridisation 8.7 W |
| EN, polarity, intermolecular forces | TF 5 (9; EN only as V) | Integrationsphase | same |
| Mole, molar mass, molar volume, concentration | – (G8GTS: TF 9 in 10) | **Integrationsphase (11/1)** | same |
| Alkane names (first ten) | TF 3 V, TF 5 (8–9) | 8.1 | 8.1 + conformations |
| IUPAC nomenclature, constitutional isomerism | – ("wird verzichtet") | Integrationsphase, 8.1, 8.2, 3.x | same + R/S |
| Alkenes, alkynes, E/Z | – | 8.2 | 8.2 |
| Chirality, enantiomers | – | only Fischer projections in 11.1 (WP) | **8.2 R/S (P)**, 11.1 |
| Alkanols; aldehydes, ketones, acids; esters | TF 5 (alkanols as solvents) | 3.1–3.3 | + ester mechanism |
| Tests for functional groups | – | 3.1 (Fehling, Benedict, Tollens), 8.2 (bromine water), 1.4; 12.2 (Biuret) | same |
| Radical substitution, electrophilic addition | – | 8.1, 8.2 | + Markovnikov, elimination |
| Nucleophilic substitution | – | – | 3.3 (acyl, P); 8.6 (halogenoalkanes, W) |
| Aromatics, SEAr | – | 8.3 (W) | 8.3 (P), 8.4 (W) |
| Energy diagrams, activation energy, catalysts | TF 3, TF 8 (8–9) | 7.2 | 7.2 |
| Enthalpy, calorimetry, bond enthalpies, Hess | – ("Reaktionsenergie", Brennwert) | 5.2 | 5.2 |
| Entropy, Gibbs | – | – | **5.2 Additum** |
| Rate, collision theory, rate law | – | 7.2 (simplified rate law) | 7.2 + conc–time diagrams |
| Maxwell–Boltzmann | – | – | **7.2 Additum** |
| Equilibrium, Le Chatelier, Kc | reversibility only (TF 3, 4, 12) | 7.1, 7.3, 7.5 | same |
| Ksp | – | – | 7.4 |
| pH, indicators, neutralisation | TF 6 (9) | 15 | 15 |
| pKS, weak-acid pH, buffers (H-H) | – (pKS explicitly excluded) | pKS, buffers qualitative | weak acids, salts, H-H |
| Titration | TF 9 (10) | 1.2 | 1.2 + curves, redox titration |
| Oxidation numbers, redox balancing | – | 4.1 | 4.1 |
| Galvanic cells, E°, Nernst | TF 12 (10, qualitative) | 4.2 | 4.2 + Nernst |
| Electrolysis, Faraday | – | 4.3 | 4.3 + Faraday |
| Polymers | TF 7 (9, no mechanisms) | 13 (radical polymerisation mechanism) | 13 |
| Carbon cycle, climate | TF 11 (10) | 17.1 | 17.1 |

---

## 4. Nomenclature conventions and notation

### 4.1 Verified from RP documents

- **Class names are systematic:** ***Alkanole***, ***Alkanale (Aldehyde)***, ***Alkanone (Ketone)***, ***Alkansäuren*** / *Carbonsäuren*, *Carbonsäurealkylester*, *Carbonsäurederivate*, *Halogenalkane*, *Aminosäuren* (MSS 12; not "Aminocarbonsäuren" as in Bavaria).
- **Formula types** (Integrationsphase): *Summenformel*, *Lewis-Formel*, *Skelettformel*, *Halbstrukturformel*, *Formalladungen*. Later: *Fischer-* and *Haworth-Projektion* (11.1), *Sägebock-* / *Newman-Projektion* (LK 8.1), *Kekulé-* / *Robinson-Formel* (8.3). Sek I talks of "vereinfachte chemische Formeln" and molecule models.
- **Isomer terms:** *Konstitutionsisomerie*, *Konfigurationsisomerie (geometrische Isomerie)* with *Prioritätsregeln*, **"E/Z-Nomenklatur"** (named in 10 Lipide), *Konfigurationsisomerie (optische Isomerie)*, *Enantiomere*, **R/S "gemäß Cahn-Ingold-Prelog-Konvention"** (LK), *Konformationsisomerie* (LK).
- **Substance level vs particle level:**
  - Sek I is built on the change between *Stoffebene* and *Teilchenebene*, with the *Formelebene* in the MSS ("Reaktionsgleichungen auf Stoff-, Teilchen- und Formelebene").
  - MSS standard S 6: "unterscheiden konsequent zwischen Stoff- und Teilchenebene".
  - Sek I writes ***Oxonium-Kation*** and ***Hydroxid-Anion***, and distinguishes ***Säure*** from ***saure Lösung*** and ***Base/Alkalien*** from ***alkalische Lösung (Lauge)***.
  - The MSS keeps this: "Säure versus saure Lösung, Base (Alkalie) versus alkalische Lösung".
- ***Kohlenstoffdioxid*** throughout.
- **"Brønsted"** is written with ø in the MSS Lehrplan (Bavaria writes "Brönsted"). ***K*S / p*K*S** ("Säurekonstante KS (Säureexponent pKS)"), *K*B/p*K*B, *K*W/p*K*W, *K*L/p*K*L.
- **Energy vocabulary:**
  - Sek I: *Reaktionsenergie*, *Aktivierungsenergie*, *exotherm/endotherm*, *Brennwert*, *Energieträgerwechsel*.
  - MSS: *Reaktionsenthalpie Δ*r*H*, Δ*r*H°m, Δ*f*H°m, Δ*b*H°m, *freie Reaktionsenthalpie Δ*r*G*, *exergonisch/endergonisch*.
  - **Games for Sek I should not use ΔH.**
- **Bonding terms:**
  - Sek I: ***Elektronenpaarbindung***, ***EPA-Modell*** (*Elektronenpaarabstoßungsmodell*, as a V option), *Wasserstoffbrückenbindung*, *Van-der-Waals-Bindung* (V).
  - MSS: *Dipol-Dipol-Wechselwirkungen (temporäre Dipole, permanente Dipole)* (London forces are not named), *Wasserstoffbrücken*, *Ion-Dipol-Wechselwirkungen*. **VSEPR** appears in 9.2; *Molekülgeometrie* in the Integrationsphase.
- **Kinetics and equilibrium terms:** *RGT-Regel*, *Zerteilungsgrad*, *Kollisions- bzw. Stoßtheorie*, *Geschwindigkeitsgesetz*, *Mindestenergie*, *Massenwirkungsgesetz*, *Gleichgewichtskonstante Kc*, *Le Chatelier*.
- **Spelling:** *Fotolyse*, *Fotoinitiator*, *Fotometrie*, *Chromatografie* (MSS). The Sek I Lehrplan writes *Chromatographie*.
- **Tests for functional groups (named):**
  - *Fehling-Probe*, *Benedict-Reagenz*, *Tollens-Probe* (3.1)
  - "Nachweis von Mehrfachbindungen" (8.2; bromine water per the Klett synopsis)
  - *Biuret-Reaktion*, *Xanthoprotein-Reaktion* (12.2)
  - reducing vs non-reducing sugars (11.2)

### 4.2 Not found stated in RP documents **(unverified for RP)**

- **Locant position:** *Propan-2-ol* vs *2-Propanol*; *But-2-en* vs *2-Buten*. No RP document shows the convention. Current German IUPAC practice and the Bavarian ISB use "Propan-2-ol".
- **Ester names:** *Ethansäureethylester* vs *Essigsäureethylester* vs *Ethylethanoat*. The Lehrplan says only "Carbonsäurealkylester".
- **Ethen/Ethin** vs *Ethylen/Acetylen*.
- **Oxidation numbers:** whether they are written as Roman numerals above the symbol.
- **cis/trans:** whether it is still accepted next to E/Z for simple cases.

---

## 5. Kompetenzbereiche, Basiskonzepte, Operatoren

- **Kompetenzbereiche** (MSS, quoted from KMK 2020): *Sachkompetenz* (S 1–17), *Erkenntnisgewinnungskompetenz*, *Kommunikationskompetenz*, *Bewertungskompetenz*.
  - The standards are the same for GK and LK. The LK differs in the complexity of models, "umfangreichere und tiefere Mathematisierung", vocabulary and argument.
  - A footnote says the verbs in the standards "sind somit nicht gleichzusetzen mit Operatoren".
- **Basiskonzepte, MSS:**
  1. *Aufbau und Eigenschaften der Stoffe und ihrer Teilchen*
  2. *Chemische Reaktion* (Donator-Akzeptor, reversibility, equilibrium, mechanisms, control)
  3. *Energiekonzept* (energy forms, activation energy and catalysis, bond energies, reaction kinetics, enthalpy and entropy)
- **Basiskonzepte, Sek I:** TMS (*Teilchen–Materie/Stoff*), SEF (*Struktur–Eigenschaft–Funktion*), CR (*Chemische Reaktion*), E (*Energie*). Each TF lists which ones it introduces or uses.
- **Donator-Akzeptor-Prinzip** is the organising idea for proton transfer (TF 6, Baustein 15), electron transfer (TF 12, Baustein 4) and complexes (9.1).
- **Operators:** the Abitur uses the **IQB "Grundstock von Operatoren"**, as the Rundschreiben requires. See the list in [`germany-bavaria.md` §5.2](./germany-bavaria.md); it is the same IQB document.
- **Anforderungsbereiche:** I–III, weighted AFB II > AFB I > AFB III (Rundschreiben).

---

## 6. Unverified or open points

1. **Sek I hours per year in G9.** Only the 7–10 contingent (Chemie at least 6 h, science area 19 h) is sourced, from a scanned 2004 VV that KMK 2025/26 figures are consistent with. Whether chemistry starts in Kl. 7 or 8, and the per-year split, are school decisions (typically from Kl. 8).
2. **G9 year of each Sek I Themenfeld.** The order is binding. The year mapping in 2.1 is an inference: TF 9–12 are the post-Kl. 9 part; G8GTS spreads TF 1 / 2–4 / 5–7 over 7 / 8 / 9.
3. **Whether the two central Abitur tasks in Chemistry come from the IQB pool.** The Rundschreiben does not say so for Chemistry, although it does for English.
4. **MSS rules not read:** the number of Leistungsfächer, the science course obligation, and whether a GK science can be a written Abitur subject. The Rundschreiben implies written Chemistry is LK-only at Gymnasien. The MSS-Verordnung was not fetched.
5. **Integrationsphase in G8GTS.** The Lehrplan 2022 puts it in 10/1; the Richtlinien 2015 say there is none. The Richtlinien's MSS cross-references use the 1998 Lehrplan and are stale.
6. **The number of G8GTS schools** (about 20) and their Abitur exam month.
7. **The Nawi 5/6 Rahmenlehrplan** edition date (believed 2010) and its exact chemistry content.
8. **A planned revision of the Sek I Lehrplan** to the KMK MSA standards of 2024: none found. bildung.rlp.de itself was unreachable; the Wayback snapshots (April, May, Sept 2026) list only the 2014 plan.
9. **Carboxylic acids and alkenes in Sek I.** The G8GTS Richtlinien say hydrocarbons, alcohols and carboxylic acids were treated in TF 3, 5 and 6. The TF 6 text does not name carboxylic acids. The MSS Lehrplan says Sek I treats alkanes "und ggf. der Alkene".
10. **Depth of "Elektronenkonfiguration" in the Integrationsphase:** shells/energy levels vs s/p notation. Orbitals and quantum numbers are named only in LK W 8.7.
11. **Chirality in the GK:** only Fischer projections (WP 11.1) are named. D/L and "Enantiomere" are named only for the LK.
12. **Nomenclature details** (section 4.2).
13. **The 2026/27 Abitur Rundschreiben** was not found. The 2025/26 one was used.
14. **Hours are Richtwerte.** The Lehrplan says the *Stundenansätze* are "nicht verpflichtend".
15. **Klett synopsis discrepancy:** its header says "Integrationsphase: 20 Stunden insgesamt"; the Lehrplan says 25 h (GK) / 30 h (LK). The Lehrplan figure is used.

---

## 7. Sources (URLs used)

**Lehrpläne and Richtlinien (Ministerium für Bildung / Pädagogisches Landesinstitut):**
- MSS *Lehrplan Chemie, Grund- und Leistungsfach in der gymnasialen Oberstufe (Mainzer Studienstufe)*, 2022: https://cloud.schulcampus-rlp.de/edu-sharing/components/render/4fa208d9-0397-4e46-8475-6308737f0b09 (PDF: https://cloud.schulcampus-rlp.de/edu-sharing/eduservlet/download?nodeId=4fa208d9-0397-4e46-8475-6308737f0b09). Also linked as https://bildung.rlp.de/lehrplaene/?tx_rlpbase_download%5Bitem%5D=67901&type=432522
- Sek I *Lehrpläne für die naturwissenschaftlichen Fächer Biologie, Chemie, Physik, Klassenstufen 7 bis 9/10*, 2014: https://cloud.schulcampus-rlp.de/edu-sharing/components/render/c69ee67c-9c9e-49a0-9b57-f6d6e3c1e03f (PDF: …/eduservlet/download?nodeId=c69ee67c-9c9e-49a0-9b57-f6d6e3c1e03f; older URL https://static.bildung-rp.de/lehrplaene/naturwissenschaften/Biologie_Physik_Chemie_LP_SekI_neu.pdf)
- *Richtlinien G8GTS Biologie, Chemie, Physik* (2015): https://bildung.rlp.de/fileadmin/user_upload/naturwissenschaften.bildung.rlp.de/2024/G8GTS_Richtlinien_Bio_Chemie_Physik_final.pdf (read via web.archive.org)
- bildung.rlp.de Chemie "Lehrpläne/Richtlinien": https://bildung.rlp.de/chemie/vorgaben/richtlinien (Wayback 22.04.2026)
- bildung.rlp.de Naturwissenschaften "Lehrpläne/Richtlinien": https://bildung.rlp.de/naturwissenschaften/vorgaben/richtlinien (Wayback 21.05.2026)
- Superseded 1998 MSS Lehrplan Chemie (Edoweb record): https://www.edoweb-rlp.de/resource/edoweb:7007778

**Abitur:**
- *Rundschreiben zur Abiturprüfungsordnung vom 23.06.2025* (school year 2025/26), §§1, 4.3 Chemie: https://mss.rlp.de/fileadmin/mss/Downloads/Rundschreiben-AbiPrO-2025.pdf
- Ministry letter "Änderungen der Abiturprüfungsordnung" of 20.06.2022 (sciences new from the 2025 Abitur): https://bildung.rlp.de/fileadmin/user_upload/rfb.bildung.rlp.de/Physik/Epos/2022_06_20_Anschreiben_Schulleitungen_AEnderung_AbiPrO_ab_2025.pdf (read via web.archive.org)
- BM press release, first pool tasks in 2017 (Deutsch, Mathe, Englisch, Französisch only): https://bm.rlp.de/service/pressemitteilungen/detail/rheinland-pfaelzisches-abitur-erstmals-mit-aufgaben-aus-dem-zentralen-pruefungspool
- IQB *Grundstock von Operatoren*: https://www.iqb.hu-berlin.de/abitur/abitur/dokumente/naturwissenschaften/N_Grundstock_von.pdf ; IQB *Formelsammlung*: https://www.iqb.hu-berlin.de/abitur/abitur/dokumente/naturwissenschaften/N_Mathematischna.pdf

**Hours:**
- Stundentafel nicht-altsprachliches Gymnasium, VV d. MBFJ vom 26.10.2004 (GAmtsbl. 1/2005 S. 5), scan on a school site: https://www.kant-boppard.de/fileadmin/Eltern/Stundentafel%20Gymnasium%20RLP.pdf
- KMK, *Wochenpflichtstunden der Schülerinnen und Schüler im Schuljahr 2025/2026*: https://www.kmk.org/fileadmin/Dateien/pdf/Statistik/Dokumentationen/Wochenpflichtstunden_der_SchuelerInnen_2025_2026.pdf

**KMK standards:**
- Bildungsstandards Chemie AHR (18.06.2020): https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2020/2020_06_18-BildungsstandardsAHR_Chemie.pdf
- Weiterentwickelte Bildungsstandards Chemie MSA (13.06.2024): https://www.kmk.org/fileadmin/veroeffentlichungen_beschluesse/2024/2024_06_13-WeBiS_Chemie_MSA.pdf

**Secondary (cross-checks only):**
- Klett, *Lehrplansynopse Elemente Chemie Oberstufe, Lehrplan Chemie Rheinland-Pfalz* (13.02.2023): https://assets.klett.de/assets/ad83a50696b2e7d829f4e47a2eb697eb830ed99f1ca735c513e8e49486c8c90b/756900_Elemente_Chemie_Oberstufe_2023_Lehrplansynopse_RP.pdf
- Studienkreis, *Schulsystem Rheinland-Pfalz*: https://www.studienkreis.de/infothek/bundeslandinfos/schulsysteme/rheinland-pfalz/
- Teacher blog "Hinweise zum Chemie-Abitur 2025 und 2026" (Eifel-Gymnasium): https://chemiestunde.jimdofree.com/2024/12/19/hinweise-zum-chemie-abitur-2025/

---

## 8. Placements for the curriculum map

> These tables are the source of `src/core-engine/data/curriculum/countries/de-rp.ts`. The G8GTS rows (§8.3) are not modelled there; the record notes the one-year shift instead.

Assumptions for the record:

- **Country record:** `DE-RP` (not yet a `CountryCode`).
- **Years:** G9 numbering, Klasse N = Year N, years 7–13.
- **MSS placements:**
  - The Lehrplan sets the band 11–13 and does not split it, so MSS placements are **11–13, `official`**.
  - The Integrationsphase is fixed to 11/1: **11, `official`**.
- **Sek I placements:**
  - The Lehrplan sets 7–10 without years. A single-year Sek I placement is therefore **`typical`**, following the order in 2.1.
  - The band 7–10 itself is `official`.
- **Tracks:**
  - Blank = every Gymnasium pupil on the G9 main route (Sek I).
  - `ga` = MSS Grundkurs, `ea` = MSS Leistungskurs. Chemistry is chosen in the MSS, so every MSS row carries a track.
  - **"ga, ea"** in the track column means **two placements with identical values**, one per track. This is Fundamentum content.
  - An `ea`-only row with depth `extend` is LK Additum or LK-only Bausteine.
- **G8GTS (`g8`, `g8-ga`, `g8-ea`):** see 8.3.
- **Baustein status in notes:** "W" = Wahlbaustein (not every course does it), "WP" = one of the Wahlpflicht options.

### 8.1 Years

| Year | Local label | Typical age at start | Stage | Delivery |
|---|---|---|---|---|
| 7 | Klasse 7 | 12 | Sekundarstufe I (Mittelstufe) | separate (school-dependent: many G9 schools start chemistry in Kl. 8; the statewide rule is only ≥ 6 contingent hours over 7–10 **(unverified split)**; G8GTS: 1 h) |
| 8 | Klasse 8 | 13 | Sekundarstufe I | separate |
| 9 | Klasse 9 | 14 | Sekundarstufe I | separate |
| 10 | Klasse 10 | 15 | Sekundarstufe I, last year (G8GTS: MSS Einführungsphase) | separate |
| 11 | Jahrgangsstufe 11 (MSS 11/1 Einführungsphase with Integrationsphase; 11/2 Qualifikationsphase begins) | 16 | Sekundarstufe II, Mainzer Studienstufe | optional (Grundfach or Leistungsfach Chemie) |
| 12 | Jahrgangsstufe 12 (MSS, Qualifikationsphase) | 17 | Sekundarstufe II, MSS | optional |
| 13 | Jahrgangsstufe 13 (MSS, Qualifikationsphase; written Abitur in January, certificate by 31 March) | 18 | Sekundarstufe II, MSS | optional |

Outside the range: Kl. 5–6 *Naturwissenschaften* (integrated). It has a particle model, states of matter, mixtures and separation, and substance properties (Nawi TF 5 and 7).

### 8.2 Concept placements (G9)

| concept id | from | to | depth | track | status | note |
|---|---|---|---|---|---|---|
| particle-model | 7 | 8 | intro | | typical | TF 1 simple atom model (mass, size, sphere); builds on the Nawi 5/6 particle model |
| states-of-matter | 7 | 8 | intro | | typical | Review only; taught in Nawi 5/6 (TF 5 "Teilchen, Aggregatzustand") |
| physical-properties | 7 | 8 | intro | | typical | TF 2 melting temperature, conductivity, solubility, brittleness; TF 4 conductivity, density |
| physical-properties | 11 | 11 | develop | ga, ea | official | Integrationsphase "Struktur und Eigenschaften" (alkanes vs alkanols) |
| density | 8 | 8 | intro | | typical | TF 4 Fachbegriff "Dichte" |
| elements-compounds-mixtures | 7 | 8 | intro | | typical | TF 1 element, compound; TF 2 Gemisch/Reinstoff |
| mixture-types | 8 | 8 | intro | | typical | TF 2 Gemisch, Lösung |
| separation-techniques | 8 | 8 | intro | | typical | TF 2 Kochsalz from brine; V: extraction, chromatography, distillation |
| colloids | 11 | 13 | develop | ga, ea | official | W 16.1 Tenside: Tyndall effect, micelles, emulsions |
| subatomic-particles | 8 | 8 | develop | | typical | TF 2 "differenziertes Atommodell": nucleus (p, n), shell (e) |
| atomic-models-history | 7 | 8 | intro | | typical | TF 1 simple model (Dalton features deliberately omitted), TF 2 nucleus–shell |
| isotopes | 11 | 13 | extend | ea | official | W 1.3 mass spectrometry only; radioactivity is Physics |
| electron-shells | 8 | 8 | intro | | typical | TF 2 V / TF 3 "Aufenthaltsbereich für Elektronen ist in sich gegliedert" |
| electron-shells | 11 | 11 | develop | ga, ea | official | Integrationsphase: *Energiestufenmodell*, ionisation energies |
| electron-configuration | 11 | 11 | develop | ga, ea | unverified | Integrationsphase "Aufbau des PSE: Elektronenkonfiguration"; level (shells vs s/p) unclear |
| electron-configuration | 11 | 13 | extend | ea | official | W 8.7 Orbitalmodell: atomic orbitals, quantum numbers, *Kästchenschema* |
| atomic-spectra | 11 | 13 | develop | ga, ea | official | W 1.5 Spektroskopie (excitation, emission/absorption), 6.1 colour (GK W / LK WP) |
| periodic-table-structure | 7 | 8 | intro | | typical | TF 1 PSE, element symbols |
| group-chemistry | 10 | 10 | intro | | unverified | Only as a TF 9 V option ("Elementfamilien" via mineral water) |
| periodic-trends | 11 | 11 | develop | ga, ea | official | Integrationsphase: ionisation energies, electronegativity |
| periodic-law-electronic | 11 | 11 | develop | ga, ea | official | Integrationsphase "Aufbau des PSE: Elektronenkonfiguration und Atommasse" |
| ionic-bonding | 8 | 8 | develop | | typical | TF 2 ions, ionic bonding, ion lattice, octet rule |
| ionic-bonding | 11 | 11 | develop | ga, ea | official | Integrationsphase review (*Ionengruppe*, *Verhältnisformel*) |
| covalent-bonding | 8 | 8 | develop | | typical | TF 3 *Elektronenpaarbindung* (H₂, O₂, H₂O, CH₄) |
| covalent-bonding | 11 | 11 | develop | ga, ea | official | Integrationsphase single and multiple bonds |
| metallic-bonding | 8 | 8 | intro | | typical | TF 4 metal lattice with mobile electrons |
| metallic-bonding | 11 | 11 | develop | ga, ea | official | Integrationsphase *Elektronengasmodell* |
| bond-polarity | 9 | 9 | intro | | typical | TF 5 polar/unpolar, dipole; EN only as a V option |
| bond-polarity | 11 | 11 | develop | ga, ea | official | Integrationsphase EN, partial charge, dipole |
| lewis-structures | 8 | 9 | intro | | typical | TF 3 electron-pair bonds with molecule models; "Lewis" not named in Sek I |
| lewis-structures | 11 | 11 | develop | ga, ea | official | Integrationsphase "Lewis-… Formel, Formalladungen" |
| molecular-shape | 9 | 9 | intro | | typical | EPA model only as a V option (TF 3, TF 5) |
| molecular-shape | 11 | 11 | develop | ga, ea | official | Integrationsphase *Molekülgeometrie* |
| intermolecular-forces | 9 | 9 | intro | | typical | TF 5 polarity and solubility; H-bonds and Van der Waals as V |
| intermolecular-forces | 11 | 11 | develop | ga, ea | official | Integrationsphase: temporary and permanent dipoles, H-bonds, ion–dipole; boiling points |
| giant-structures | 8 | 8 | intro | | typical | TF 2 ion lattice, TF 4 metal lattice |
| hybridisation | 11 | 13 | extend | ea | official | W 8.7: sp/sp²/sp³, σ/π, MO theory, band model |
| chemical-symbols-formulas | 7 | 8 | intro | | typical | TF 1 *Elementsymbol*, *Formel* |
| ionic-formulas | 8 | 8 | intro | | typical | TF 2 V *Verhältnisformeln* |
| ionic-formulas | 11 | 11 | develop | ga, ea | official | Integrationsphase *Verhältnisformel* |
| polyatomic-ions | 9 | 9 | intro | | typical | TF 6 *Oxonium-Kation*, *Hydroxid-Anion* |
| polyatomic-ions | 11 | 13 | develop | ga, ea | official | 1.4 ion tests (carbonate, ammonium…) |
| inorganic-nomenclature | 7 | 8 | intro | | typical | TF 1 "Stoffe werden in der Chemie nach klaren Regeln benannt" (Natriumchlorid) |
| inorganic-nomenclature | 11 | 13 | extend | ea | official | 9.1 IUPAC names of complexes (LK P) |
| organic-nomenclature | 9 | 9 | intro | | typical | TF 5 names of the first ten alkanes; systematic naming explicitly omitted |
| organic-nomenclature | 11 | 11 | develop | ga, ea | official | Integrationsphase "IUPAC-Nomenklatur" |
| organic-nomenclature | 11 | 13 | develop | ga, ea | official | 8.1, 8.2 (priority rules), 3.1–3.3 (aldehydes, ketones, acids, esters) |
| organic-nomenclature | 11 | 13 | extend | ea | official | 8.2 R/S (CIP) |
| physical-chemical-change | 7 | 8 | intro | | typical | TF 1 signs of a chemical reaction |
| conservation-of-mass | 7 | 8 | intro | | typical | TF 1, explained by conserved atoms |
| writing-equations | 7 | 8 | intro | | typical | TF 1 *Edukt/Produkt*; TF 3 *Reaktionsgleichung* |
| balancing-equations | 8 | 8 | develop | | typical | TF 3, TF 4 equations (coefficients as a V competence) |
| balancing-equations | 11 | 11 | develop | ga, ea | official | Integrationsphase "Reaktionsgleichungen auf Stoff-, Teilchen- und Formelebene" |
| reaction-types | 8 | 8 | intro | | typical | TF 3 analysis/synthesis, combustion; TF 6 neutralisation |
| combustion | 8 | 8 | develop | | typical | TF 3 combustion, fire triangle, fuels |
| combustion | 11 | 13 | develop | ga, ea | official | 8.1 complete and incomplete combustion of alkanes |
| ionic-equations | 9 | 9 | intro | | typical | TF 6 H₃O⁺ + OH⁻ → 2 H₂O |
| relative-formula-mass | 11 | 11 | develop | ga, ea | official | Integrationsphase molar mass; not in the Sek I Lehrplan |
| mole-concept | 11 | 11 | develop | ga, ea | official | Integrationsphase *Stoffmenge*; **not in the Sek I Lehrplan** |
| reacting-masses | 11 | 11 | develop | ga, ea | official | Integrationsphase "chemisches Rechnen", used through later Bausteine |
| yield-and-atom-economy | 9 | 10 | intro | | typical | TF 8 *Ausbeute* |
| yield-and-atom-economy | 11 | 13 | develop | ga, ea | official | 7.5 optimising yield (Haber–Bosch etc.) |
| dissolving-solubility | 8 | 9 | intro | | typical | TF 2 solubility of salts; TF 5 solvents |
| mass-concentration | 10 | 10 | intro | | typical | TF 9 *Konzentration*, *Grenzwert* |
| mass-concentration | 11 | 11 | develop | ga, ea | official | Integrationsphase *Massenkonzentration* |
| molar-concentration | 11 | 11 | develop | ga, ea | official | Integrationsphase *Stoffmengenkonzentration* |
| electrolytic-dissociation | 8 | 8 | intro | | typical | TF 2 conductivity of salt solutions and melts |
| molar-gas-volume | 11 | 11 | develop | ga, ea | official | Integrationsphase *molares Volumen* |
| acids-bases-indicators | 9 | 9 | develop | | typical | TF 6 indicators, pH scale |
| neutralisation | 9 | 9 | develop | | typical | TF 6 neutralisation on the model and formula level |
| neutralisation | 11 | 13 | develop | ga, ea | official | 1.2 / 15.5 neutralisation, neutral point, titration |
| reactions-of-acids | 9 | 9 | intro | | typical | TF 6 reactions with limestone and base metals |
| acid-base-theories | 9 | 9 | intro | | typical | TF 6 *Protonenübertragung*, *Donator-Akzeptor-Prinzip* |
| acid-base-theories | 11 | 13 | develop | ga, ea | official | 15.1 Brønsted, conjugate pairs, *Ampholyt* |
| acid-base-theories | 11 | 13 | extend | ea | official | 9.1 Lewis acids and bases (complexes) |
| ph-calculations | 9 | 9 | intro | | typical | TF 6 V: pH steps as factor 10 |
| ph-calculations | 11 | 13 | develop | ga, ea | official | 15.1, 15.2 *K*W, pH/pOH, strong acids and bases |
| strong-weak-acids | 11 | 13 | develop | ga, ea | official | 15.2 acid strength via *K*S/p*K*S |
| acid-dissociation-constants | 11 | 13 | develop | ga | official | 15.2 *K*S, p*K*S, *K*B, p*K*B (no weak-acid pH calculation); Sek I explicitly excludes p*K*S |
| acid-dissociation-constants | 11 | 13 | extend | ea | official | 15.2 pH of weak acids and bases; 15.3 indicator equation |
| buffers | 11 | 13 | intro | ga | official | 15.4 definition, qualitative action only |
| buffers | 11 | 13 | extend | ea | official | 15.4 Henderson–Hasselbalch, buffer range and capacity |
| salt-hydrolysis | 11 | 13 | extend | ea | official | 15.2 pH of salt solutions |
| redox-oxygen | 8 | 8 | intro | | typical | TF 4 metal oxides, their formation and decomposition; rust (G option) |
| reactivity-series | 8 | 10 | intro | | typical | TF 4 V noble/base metals; TF 12 *Redoxreihe* |
| oxidation-states | 11 | 13 | develop | ga, ea | official | 4.1 *Oxidationszahlen*; not in the Sek I Lehrplan |
| redox-electron-transfer | 10 | 10 | develop | | typical | TF 12 oxidation/reduction as electron transfer, donor–acceptor (TF 4 V first) |
| redox-electron-transfer | 11 | 13 | develop | ga, ea | official | 4.1 redox couples |
| balancing-redox | 11 | 13 | develop | ga, ea | official | 4.1 in acidic and alkaline solution; organic redox via 3.1, 3.2 |
| balancing-redox | 11 | 13 | extend | ea | official | 4.1 comproportionation and disproportionation |
| electrolysis | 11 | 13 | develop | ga, ea | official | 4.3 electrolysis cells, electrolytic extraction |
| electrolysis | 11 | 13 | extend | ea | official | 4.3 Faraday's laws, decomposition voltage, overpotential |
| electrochemical-cells | 10 | 10 | intro | | typical | TF 12 galvanic element, battery, accumulator |
| electrochemical-cells | 11 | 13 | develop | ga, ea | official | 4.2 galvanic cells; 4.4 primary and secondary cells, fuel cell |
| electrode-potentials | 11 | 13 | develop | ga, ea | official | 4.2 standard hydrogen half-cell, standard potentials, *Spannungsreihe* |
| electrode-potentials | 11 | 13 | extend | ea | official | 4.2 concentration cell, Nernst incl. pH dependence |
| corrosion | 8 | 8 | intro | | typical | TF 4 G option: rusting |
| corrosion | 11 | 13 | develop | ga, ea | official | 4.5 acid and oxygen corrosion, active and passive protection |
| exo-endothermic | 8 | 8 | develop | | typical | TF 3 *exotherm/endotherm*, *Reaktionsenergie* (no ΔH) |
| exo-endothermic | 11 | 13 | develop | ga, ea | official | 5.2 Δ*r*H, enthalpy diagrams |
| reaction-profiles | 8 | 8 | intro | | typical | TF 3 energy diagrams with activation energy; TF 8 catalysts lower Ea |
| reaction-profiles | 11 | 13 | develop | ga, ea | official | 7.2 catalysis; 5.2 enthalpy diagrams |
| bond-energies | 11 | 13 | develop | ga, ea | official | 5.2 estimating Δ*r*H°m from bond enthalpies |
| enthalpy-calorimetry | 8 | 8 | intro | | typical | TF 3 *Brennwert* tables |
| enthalpy-calorimetry | 11 | 13 | develop | ga, ea | official | 5.2 Δ*r*H, calorimetry |
| hess-law | 11 | 13 | develop | ga, ea | official | 5.2 "Satz von HESS, Enthalpiezyklus", Δ*f*H°m |
| entropy-gibbs | 11 | 13 | extend | ea | official | 5.2 Additum: 2nd law, Δ*r*S°m, Δ*r*G, Gibbs–Helmholtz, Δ*f*G°m. **Not in the GK**; ΔG°–K only optional |
| rate-factors | 9 | 10 | intro | | typical | TF 8 G option: particle size, pre-heating, catalyst |
| rate-factors | 11 | 13 | develop | ga, ea | official | 7.2 temperature (RGT-Regel), concentration, pressure, *Zerteilungsgrad*, catalyst |
| collision-theory | 11 | 13 | develop | ga, ea | official | 7.2 "vereinfachte Betrachtung der Kollisions- bzw. Stoßtheorie" |
| catalysts | 8 | 10 | intro | | typical | TF 3 activation energy; TF 8 "Katalysator" (Fachbegriff) |
| catalysts | 11 | 13 | develop | ga, ea | official | 7.2 homogeneous and heterogeneous catalysis |
| measuring-rate | 11 | 13 | develop | ga | official | 7.2 rate as change of concentration per time |
| measuring-rate | 11 | 13 | extend | ea | official | 7.2 interpreting concentration–time diagrams; tangent and secant rates only optional |
| rate-laws | 11 | 13 | develop | ga, ea | official | 7.2 simplified *Geschwindigkeitsgesetz*; Kc = k_hin/k_rück for elementary reactions (7.3). Order, *Zeitgesetze*, Arrhenius only optional |
| maxwell-boltzmann | 11 | 13 | extend | ea | official | 7.2 Additum "Mindestenergie, Energieverteilungskurven nach BOLTZMANN" |
| reversible-reactions | 8 | 10 | intro | | typical | TF 3, TF 4 "prinzipiell umkehrbar"; TF 12 accumulator reactions reversible |
| reversible-reactions | 11 | 13 | develop | ga, ea | official | 7.1 dynamic equilibrium; kinetic interpretation (7.2) |
| le-chatelier | 11 | 13 | develop | ga, ea | official | 7.1 qualitative; 7.3 mathematical interpretation; 7.5 applied |
| equilibrium-constant | 11 | 13 | develop | ga, ea | official | 7.3 Kc derived from rate constants; simple c_Gl/Kc calculations. Kp and c₀-based calculations only optional |
| solubility-product | 11 | 13 | extend | ea | official | 7.4 *K*L, p*K*L (LK P) |
| organic-intro | 8 | 9 | intro | | typical | TF 3 methane; TF 5 *Kohlenstoffverbindungen*, C–C electron-pair bonds |
| hydrocarbons | 8 | 9 | intro | | typical | TF 3 methane and hydrogen as fuels; TF 5 alkanes as solvents; no alkenes as a class |
| hydrocarbons | 11 | 13 | develop | ga, ea | official | 8.1 alkanes, 8.2 alkenes **and alkynes** |
| crude-oil-fuels | 8 | 10 | intro | | typical | TF 3 fuels; TF 11 fossil energy carriers |
| crude-oil-fuels | 11 | 13 | develop | ga, ea | official | W 8.5: refining, octane and cetane numbers |
| homologous-series | 9 | 9 | intro | | typical | TF 5 first ten alkanes, property trends with molecule size |
| homologous-series | 11 | 13 | develop | ga, ea | official | 8.1, 8.2, 3.1, 3.2 homologous series |
| functional-groups | 9 | 9 | intro | | typical | TF 5 *funktionelle Gruppe*, *Alkanole* |
| functional-groups | 11 | 13 | develop | ga, ea | official | 3.1–3.3 aldehyde, keto, carboxy, ester groups; halogenoalkanes |
| oxygen-organics | 9 | 9 | intro | | typical | TF 5 alkanols (ethanol) as solvents; carboxylic acids in TF 6 per the G8GTS Richtlinien **(unverified)** |
| oxygen-organics | 11 | 13 | develop | ga, ea | official | 3.1 oxidation of alkanols, 3.2 alkanoic acids, 3.3 esterification |
| oxygen-organics | 11 | 13 | extend | ea | official | 3.3 addition–elimination mechanism, acidic and alkaline ester hydrolysis |
| nitrogen-organics | 11 | 13 | extend | ea | official | W 8.4 basicity of aniline; amides only optional |
| aromatic-compounds | 11 | 13 | develop | ga | official | W 8.3 Aromaten I (Kekulé, mesomerism, Hückel, one SEAr) |
| aromatic-compounds | 11 | 13 | develop | ea | official | 8.3 compulsory for the LK |
| aromatic-compounds | 11 | 13 | extend | ea | official | W 8.4 directing effects, I/M effects, phenol acidity |
| isomerism | 11 | 11 | develop | ga, ea | official | Integrationsphase *Konstitutionsisomerie*; Sek I explicitly skips isomers |
| isomerism | 11 | 13 | extend | ea | official | 8.1 *Konformationsisomerie*, sawhorse/Newman |
| geometric-isomerism | 11 | 13 | develop | ga, ea | official | 8.2 "Konfigurationsisomerie (geometrische Isomerie)", priority rules (E/Z); applied again in WP 10 Lipide |
| optical-isomerism | 11 | 13 | extend | ea | official | 8.2 chiral halogenoalkanes, enantiomers, R/S (CIP) |
| optical-isomerism | 11 | 13 | intro | ga | unverified | Only Fischer projections of monosaccharides (WP 11.1); chirality not named for the GK |
| organic-reaction-types | 11 | 13 | develop | ga, ea | official | Substitution, addition, oxidation, condensation, hydrolysis, polymerisation (8.1, 8.2, 3.x, 13.1) |
| organic-reaction-types | 11 | 13 | extend | ea | official | Elimination (8.2) |
| reaction-mechanisms | 11 | 13 | develop | ga | official | Radical substitution, electrophilic addition (halogens), radical polymerisation; SEAr only if W 8.3 is taken |
| reaction-mechanisms | 11 | 13 | extend | ea | official | + Markovnikov, hydration, elimination, acyl addition–elimination, SEAr; SN at halogenoalkanes (W 8.6); azo coupling, nucleophilic addition (WP) |
| polymers-intro | 9 | 9 | develop | | typical | TF 7 monomer, polymer, macromolecule, thermoplastics, elastomers, thermosets |
| polymers-intro | 11 | 13 | develop | ga, ea | official | 13.2 structure and properties, cross-linking |
| addition-polymerisation | 9 | 9 | intro | | typical | TF 7 PE/PP from monomers with a multiple bond; "keine Reaktionsmechanismen" |
| addition-polymerisation | 11 | 13 | develop | ga, ea | official | 13.1 mechanism of radical polymerisation |
| condensation-polymerisation | 9 | 9 | intro | | typical | TF 7 monomers "mit mehreren funktionellen Gruppen" |
| condensation-polymerisation | 11 | 13 | develop | ga, ea | official | 13.1 polycondensation (polyesters, polyamides) |
| condensation-polymerisation | 11 | 13 | extend | ea | official | 13.1 optional LK Additum: polyester and polyamide mechanisms |
| plastics-and-recycling | 9 | 9 | intro | | typical | TF 7 life-cycle assessment, paper vs plastic bag |
| plastics-and-recycling | 11 | 13 | develop | ga, ea | official | 13.4 recycling types, bioplastics, micro- and nanoplastics |
| materials | 9 | 9 | intro | | typical | TF 7 composites, high-tech materials |
| materials | 11 | 13 | develop | ga | official | W 14 nanomaterials |
| materials | 11 | 13 | develop | ea | official | 14.1–14.3 compulsory for the LK |
| carbohydrates | 9 | 9 | intro | | typical | TF 7 V option: starch and cellulose compared with plastics |
| carbohydrates | 11 | 13 | develop | ga, ea | official | WP 11: Fischer and Haworth projections, glycosidic bond, reducing sugars |
| carbohydrates | 11 | 13 | extend | ea | official | WP 11: nucleophilic addition (hemiacetal), acetal formation |
| lipids | 11 | 13 | develop | ga, ea | official | WP 10 fats, fatty acids, key numbers; W 16 soaps and tensides |
| lipids | 11 | 13 | extend | ea | official | 3.3 saponification and transesterification mechanism |
| amino-acids-proteins | 11 | 13 | develop | ga, ea | official | WP 12 amino acids, peptide bond, structure levels, denaturation |
| amino-acids-proteins | 11 | 13 | extend | ea | official | WP 12 zwitterion, isoelectric point, peptide-bond mesomerism |
| gas-tests | 8 | 8 | intro | | typical | TF 3 G option: tests for CO₂, O₂, H₂, water |
| ion-tests | 10 | 10 | intro | | typical | TF 9 ion analysis in water |
| ion-tests | 11 | 13 | develop | ga, ea | official | 1.4 chloride, bromide, carbonate, ammonium; flame colour |
| functional-group-tests | 11 | 13 | develop | ga, ea | official | 3.1 Fehling, Benedict, Tollens; 8.2 test for multiple bonds; 1.4; WP 12.2 Biuret, Xanthoprotein; WP 11.2 reducing sugars |
| chromatography | 10 | 10 | intro | | typical | TF 9 *Chromatographie* (Fachbegriff); TF 2 V option |
| chromatography | 11 | 13 | develop | ea | official | 1.1 (LK P): phases, Rf, retention time, two methods |
| titration | 10 | 10 | intro | | typical | TF 9 *Maßanalyse* |
| titration | 11 | 13 | develop | ga, ea | official | 1.2 acid–base titration of monoprotic acids |
| titration | 11 | 13 | extend | ea | official | 1.2 polyprotic acids, titration-curve calculations, pH electrode, redox titration |
| spectrophotometry | 10 | 10 | intro | | typical | TF 9 *Kolorimetrie* |
| spectrophotometry | 11 | 13 | develop | ga, ea | official | W 1.5 UV/VIS photometry, calibration line |
| spectrophotometry | 11 | 13 | extend | ea | official | W 1.5 Lambert–Beer |
| ir-nmr-ms | 11 | 13 | extend | ea | official | W 1.3 mass spectrometry only; IR only an optional *Vertiefung* |
| air-oxygen-hydrogen | 8 | 8 | intro | | typical | TF 3 hydrogen as an energy carrier, oxygen in combustion |
| water-chemistry | 9 | 10 | intro | | typical | TF 5 water as a solvent; TF 9 water analysis |
| metals-chemistry | 8 | 8 | intro | | typical | TF 4 metals, ores, extraction |
| transition-metals | 11 | 13 | extend | ea | official | 9.1 complexes (LK P); W 9.2 chelates, stability constants |
| atmosphere-climate | 10 | 10 | develop | | typical | TF 11 carbon cycle, greenhouse effect, modelling |
| atmosphere-climate | 11 | 13 | develop | ga, ea | official | 17.1 greenhouse gases, climate change, ocean acidification |
| pollution | 9 | 10 | intro | | typical | TF 6 acids and alkalis in the environment; TF 10 hazardous substances |
| pollution | 11 | 13 | develop | ga, ea | official | 17.1 one more issue (ozone hole, smog, microplastics); W 17.2 environmental analysis |
| resources-sustainability | 8 | 9 | intro | | typical | TF 4 metal recycling; TF 7 life-cycle assessment |
| resources-sustainability | 11 | 13 | develop | ga, ea | official | 13.4, 17.1, 4.4 |
| fuels-energy | 8 | 8 | develop | | typical | TF 3 *Heizen und Antreiben*; TF 11, TF 12 (10) |
| fuels-energy | 11 | 13 | develop | ga, ea | official | 5.1 energy carriers; 17.1 alternative fuels; W 8.5 |
| industrial-processes | 9 | 10 | intro | | typical | TF 8 *Vom Reagenzglas zum Reaktor* |
| industrial-processes | 11 | 13 | develop | ga, ea | official | 7.5 Haber–Bosch, contact or Ostwald process |
| metal-extraction | 8 | 8 | develop | | typical | TF 4 ore to metal (blast furnace, copper) |
| metal-extraction | 11 | 13 | develop | ga, ea | official | 4.3 electrolytic extraction (Al, Zn, Cl₂) |
| chemical-safety | 7 | 8 | intro | | typical | TF 1 researching hazards, labelling, disposal |
| chemical-safety | 10 | 10 | develop | | typical | TF 10 *Gefährliche Stoffe*: LD50, AGW, BGW |
| lab-safety | 7 | 8 | intro | | typical | TF 1 hazard labels; safe handling of acids (TF 6) |
| measurement-technique | 10 | 10 | intro | | typical | TF 9 *Messgenauigkeit*, *Nachweisgrenze* |
| preparing-solutions | 11 | 13 | develop | ga, ea | typical | 1.2 *Maßlösung (Titerlösung)*; Integrationsphase concentrations |
| units-and-conversions | 11 | 11 | develop | ga, ea | official | Integrationsphase *chemisches Rechnen*, quantity equations |
| significant-figures-uncertainty | 10 | 10 | intro | | typical | TF 9 measurement accuracy |
| graphs-and-data | 10 | 10 | intro | | typical | TF 9 switching between measurements, diagrams and tables; TF 11 modelled vs measured data |
| graphs-and-data | 11 | 13 | develop | ga, ea | official | 7.2 rate data; 1.2 titration curves; 1.5 calibration line |
| chemical-calculations | 11 | 13 | develop | ga | official | Kc, pH of strong acids, ΔH, Hess |
| chemical-calculations | 11 | 13 | extend | ea | official | + weak-acid pH, H-H, Nernst, Faraday, ΔG, *K*L |
| particle-diagrams | 7 | 8 | intro | | typical | TF 1, TF 2 particle-level explanations |
| macro-micro-symbolic | 7 | 10 | develop | | official | The Sek I Lehrplan's organising line: "Wechsel zwischen Stoff- und Teilchenebene" |
| macro-micro-symbolic | 11 | 13 | develop | ga, ea | official | Standard S 6: "unterscheiden konsequent zwischen Stoff- und Teilchenebene" |
| molecular-models | 8 | 8 | intro | | typical | TF 2 NaCl lattice models; TF 3 molecule models |
| structural-formulas | 9 | 9 | intro | | typical | TF 7 "vereinfachte chemische Formeln" (V: structural formulas in TF 5) |
| structural-formulas | 11 | 11 | develop | ga, ea | official | Integrationsphase molecular, Lewis, skeletal and condensed formulas |
| structural-formulas | 11 | 13 | extend | ea | official | 8.1 Newman/sawhorse; WP 11.1 Fischer and Haworth (also GK WP) |
| reference-tables | 11 | 13 | develop | ga, ea | typical | IQB formula collection allowed in the Abitur |
| scientific-method | 7 | 10 | develop | | official | Sek I competences: hypothesis-led experiments, planning investigations |
| evaluating-experiments | 11 | 13 | develop | ga, ea | official | *Erkenntnisgewinnungskompetenz* standards |
| scientific-communication | 7 | 10 | develop | | official | Sek I competences: recording, presenting, switching representations |
| nature-of-science | 7 | 8 | intro | | typical | TF 1 V option: the model concept |
| nature-of-science | 11 | 13 | develop | ga, ea | official | 8.3 Kekulé, Robinson; W 6.4 history of dyes |
| socio-scientific-issues | 10 | 10 | develop | | typical | TF 10–12 benefit/risk analysis, sustainability judgements |
| socio-scientific-issues | 11 | 13 | develop | ga, ea | official | *Bewertungskompetenz*; 13.4, 14.3, 17.1 |

- **Not placed** (not in the RP chemistry documents for Years 7–13):
  - heat-and-temperature; periodic-table-history; lattice-energy
  - limiting-reagent; empirical-formula; solubility-rules
  - gas-pressure, gas-laws, kinetic-molecular-theory (Physics / Nawi); ideal-gas-equation (only an optional *Vertiefung*: Kp)
  - reaction-pathways (multi-step synthesis; only "Synthese" in W 2.3)
  - alloys; food-molecules; nucleic-acids (only optional examples); photosynthesis-respiration (Biologie)
  - radioactivity, nuclear-equations, half-life, fission-fusion (Physics)
  - non-metals-chemistry; inorganic-compound-classes; water-treatment
  - preparing-substances; organic-synthesis-techniques
- **`stereoisomerism`** is replaced by `geometric-isomerism` and `optical-isomerism` above.

### 8.3 G8GTS (`g8`, `g8-ga`, `g8-ea`)

- **Rule for the MSS:** every `ga` / `ea` row above applies to G8GTS **one year earlier**: 11 → 10, 11–13 → 10–12. Use track `g8-ga` / `g8-ea`.
- **Integrationsphase in G8GTS:** its year (10/1) is `official` per the 2022 Lehrplan but conflicts with the 2015 Richtlinien, so mark the Integrationsphase rows `unverified` for G8GTS.
- **Sek I rows that differ** (G8GTS Kl. 7–9 at 1/2/2 h, TF 9, 11 and 12 moved into Kl. 10):

| concept id | from | to | depth | track | status | note |
|---|---|---|---|---|---|---|
| particle-model | 7 | 7 | intro | g8 | official | TF 1 in Kl. 7 (G8GTS Richtlinien) |
| chemical-symbols-formulas | 7 | 7 | intro | g8 | official | TF 1 |
| conservation-of-mass | 7 | 7 | intro | g8 | official | TF 1 |
| chemical-safety | 7 | 7 | intro | g8 | official | TF 10 elements folded into TF 1 |
| ionic-bonding | 8 | 8 | develop | g8 | official | TF 2 |
| separation-techniques | 8 | 8 | intro | g8 | official | TF 2 |
| covalent-bonding | 8 | 8 | develop | g8 | official | TF 3 |
| exo-endothermic | 8 | 8 | develop | g8 | official | TF 3 (energy diagrams moved here from Biologie) |
| reaction-profiles | 8 | 8 | intro | g8 | official | TF 3 + TF 8 elements: "Um die Aktivierungsenergie herabzusetzen, werden … Katalysatoren eingesetzt" |
| catalysts | 8 | 8 | intro | g8 | official | TF 3 + TF 8 elements |
| metallic-bonding | 8 | 8 | intro | g8 | official | TF 4 |
| metal-extraction | 8 | 8 | develop | g8 | official | TF 4 + TF 8 (blast furnace or copper) |
| functional-groups | 9 | 9 | intro | g8 | official | TF 5 |
| oxygen-organics | 9 | 9 | intro | g8 | typical | TF 5 alkanols; TF 6 carboxylic acids (Richtlinien) |
| acids-bases-indicators | 9 | 9 | develop | g8 | official | TF 6 |
| polymers-intro | 9 | 9 | develop | g8 | official | TF 7 |
| mole-concept | 10 | 10 | develop | g8 | official | TF 9 "Molbegriff und Stöchiometrie gemäß der Integrationsphase" (Einführungsphase, GK and LK) |
| titration | 10 | 10 | intro | g8 | official | TF 9 in the Einführungsphase |
| atmosphere-climate | 10 | 10 | develop | g8 | official | TF 11 in the Einführungsphase |
| le-chatelier | 10 | 10 | intro | g8-ga | official | TF 11 + "Chemisches Gleichgewicht/Le Chatelier" (GK hint) |
| equilibrium-constant | 10 | 10 | intro | g8-ea | official | TF 11 + "Chemisches Gleichgewicht und MWG" (LK hint) |
| electrochemical-cells | 10 | 10 | intro | g8 | official | TF 12 tied to the MSS redox Bausteine |

### 8.4 Areas covered

- **`coveredAreas`:** matter, mixtures, atomic-structure, periodic-table, bonding, nomenclature, reactions, stoichiometry, solutions, gases (molar volume only), acids-bases, redox, energetics, kinetics, equilibrium, organic, polymers-materials, biochemistry, analytical, descriptive (partial), applied, skills-practical, skills-quantitative, skills-models, skills-inquiry.
- **Not covered:** **nuclear** (radioactivity is in the RP Physics Lehrplan, not chemistry).
- **Gases:** only molar volume. Gas laws and kinetic theory are Physics or Nawi.
- **Descriptive:** there is no systematic element-by-element chemistry.
