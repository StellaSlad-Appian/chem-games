# Baden-Württemberg Gymnasium chemistry curriculum (Bildungsplan 2016, V2 in force, V3.0 for G9): all years, with depth on organic chemistry, energetics, kinetics and equilibrium

**Purpose:** the Baden-Württemberg (BW) counterpart to the Bavarian report
([`germany-bavaria.md`](./germany-bavaria.md)). It verifies and extends §2.3 of
[`germany-sek2-overview.md`](../germany-sek2-overview.md) and ends with the placements for the
curriculum-map record (§8).
**Research date:** 25 Sept 2026 (desk research by an agent, from primary sources).
**Review status:** not yet checked by a teacher who teaches in Baden-Württemberg. Stella knows teachers there who can review it.

Primary sources: bildungsplaene-bw.de (the plan texts, V2 and V3.0, and the implementation tables), km-bw.de (G9 Eckpunkte, the Anhörung letter, the Facherlass for the Abitur 2027, the Oberstufe Leitfaden), schule-bw.de (the official 2017 Beispielcurricula). Full URL list in §7. Anything not confirmed from a primary source is marked **(unverified)**. Standards are cited by section and number, e.g. *V2 3.2.2.1 (10)*.

## What this means for chem-games (summary)

- **Two plans, one year apart.** In 2026/27 every chemistry class (Kl. 8–12) is taught to the
  **Bildungsplan 2016, V2 (25.03.2022)**. The **G9 plan, "V3.0" (08.04.2026), is already published**
  and starts in Kl. 8 in **2027/28**, rising one year at a time. It reaches Kl. 11 in 2030/31, the
  Kursstufe (now Kl. 12/13) in 2031/32, and the first G9 Abitur is in **2033**. Tag games with the
  plan version, not only a year.
- **The big move is organic chemistry.** In V2, all basic organic chemistry (naming, functional
  groups, radical substitution, oxidation of alcohols, esters) sits in the **Klassen 8/9/10 band**,
  in practice **Kl. 10**. V3.0 takes it all out of 8–10 and makes **Kl. 11 an organic-chemistry year
  for everyone**. It also adds two things V2 never names: *Isomerie (Strukturisomerie,
  cis-trans-Isomerie)* and naming *Halogenkohlenwasserstoffe*.
- **The Kursstufe is barely touched by G9.** V3.0's Basisfach and Leistungsfach units are word for word V2 apart from
  two small edits. They are only renamed "Klassen 12/13". Games for the upper school can target V2
  now and stay valid.
- **Basisfach (3 h) vs Leistungsfach (5 h) is a real split**:
  - **Entropy and Gibbs–Helmholtz, K_L, weak-acid pH, buffers and titration curves are Leistungsfach
    only.** So are the **aromatics and all the named mechanisms** except electrophilic addition
    (SE, the SN/SE/SR comparison, the esterification mechanism, radical polymerisation), plus
    Nernst and Faraday.
  - The Basisfach still gets **calorimetry and Hess (with Bildungsenthalpien), rate with RGT rule and
    Stoßtheorie, Kc, Le Chatelier, KS/pKS, and chirality with Fischer projections**.
- **Kinetics is thin, and it lives inside the equilibrium unit.** Rate depends on concentration and temperature
  (RGT rule, collision theory), the catalyst lowers Ea, and the Leistungsfach adds "Reaktionsrate".
  **No Maxwell–Boltzmann, no rate law, no Arrhenius**, and no rate-from-graph standard.
- **Vocabulary differs from Bavaria.** BW writes *cis-trans* (V3.0), not E/Z; *Ethansäureethylester*;
  *Benzen/Benzol*; *Duromere*; *Glycerin*; *L-α-Aminosäuren*; *Halbäquivalenzpunkt*; and
  *Wechselwirkungen zwischen temporären/permanenten Dipolen* rather than Van-der-Waals/London.
  Sek I says *Reaktionsenergie*; *Enthalpie* starts in the Kursstufe.
- **Entropy is defined as microstates** ("Maß für die Anzahl von Realisierungsmöglichkeiten"), not as
  disorder.

---

## 0. Timeline: what applies in 2026/27, and the G8 → G9 transition

**Verified from the implementation table (bildungsplaene-bw.de, "Implementierungskonzept überarbeiteter Bildungspläne", Gymnasium / Chemie):**

| School year | Kl. 8 | Kl. 9 | Kl. 10 | Kl. 11 | Kl. 12 | Kl. 13 |
|---|---|---|---|---|---|---|
| 2026/27 | V2 | V2 | V2 | V2 | V2 | – |
| 2027/28 | **V3.0** | V2 | V2 | V2 | V2 | – |
| 2028/29 | V3.0 | V3.0 | V2 | V2 | V2 | – |
| 2029/30 | V3.0 | V3.0 | V3.0 | V2 | V2 | – |
| 2030/31 | V3.0 | V3.0 | V3.0 | V3.0 | V2 | – |
| 2031/32 | V3.0 | V3.0 | V3.0 | V3.0 | V3.0 | – |
| 2032/33 | V3.0 | V3.0 | V3.0 | V3.0 | V3.0 | V3.0 |

How the cohorts fall out (my reading of the table, consistent with the KM texts):

- **G9 neu** is the standard form from 2025/26, "aufwachsend beginnend mit Klasse 5 und 6" (KM Eckpunkte letter, 17.10.2024; KM Gymnasium page). The first G9 cohort was in Kl. 6 in 2025/26. It meets chemistry (V3.0) in Kl. 8 in 2027/28, has the new compulsory Kl. 11 in 2030/31, the Kursstufe as Kl. 12/13 in 2031/32 and 2032/33, and sits the **first G9 Abitur in 2033**.
- **The last regular G8 cohort** was in Kl. 7 in 2025/26. It is in Kl. 8 now (2026/27, V2) and reaches Kursstufe J1 = Kl. 11 in 2029/30 and J2 = Kl. 12 in 2030/31, so it sits the **Abitur in 2031**. Every chemistry student in 2026/27 is therefore G8 on V2, except at the model schools below.
- **2032:** there is no regular Abitur cohort. Statistik BW expects only about 19,000 Hochschulreife holders, less than half a normal year. They come from the G9 model schools and the berufliche Gymnasien (secondary: Statistisches Landesamt press release; the gap itself follows from the table).
- **G9-Modellschulen (44 schools, Schulversuch since 2012/13 and 2013/14):** their Schulversuch cohorts have the Kursstufe in Kl. 12/13. The Schulversuch "läuft … unter Einbeziehung der Kursstufe 2031/2032 aus" (KM page). So **Kl. 13 exists in 2026/27 only at these schools**. Which chemistry plan they use in Kl. 8–11 is **(unverified)**.
- **G8-Züge:** schools may apply to run an eight-year stream alongside G9 (Eckpunkte letter). "Nach Klasse 10 bzw. Klasse 11 besuchen G8- und G9-Schüler eine gemeinsame Kursstufe" (KM). Which plan version a G8-Zug follows in Kl. 8–10 is **(unverified)**; the implementation table has only one row per Klassenstufe.
- **How V3.0 came about:** KM letter of 23.10.2025. The Chemie plan (Gymnasium "einschließlich Kursstufe") was revised to the new KMK Sek I standards and to G9 ("die Standards … von den bisherigen Klassen 5 bis 10 auf die neuen Klassen 5 bis 11 verteilt"). Anhörung ran 07.11.–19.12.2025. The letter planned "Inkraftsetzung … zum 1. August 2026". The published implementation table instead starts Chemie V3.0 in Kl. 8 in **2027/28** (Biologie V3.0 already runs in Kl. 5–7 in 2026/27). I take the table as authoritative.
- **Abitur 2027 is explicitly on V2:** the Facherlass says teaching and exam rest on "Bildungsplan 2016 (V2 vom 25.03.2022)".

**Answering the brief's questions directly:**
- Is there a new Bildungsplan for G9? Yes. It is Chemie V3.0 (08.04.2026), a revision of BP2016, not a new plan family. Its bands are 8/9/10, 11, 12/13 (Basisfach), 12/13 (Leistungsfach).
- When does the Kursstufe move to Kl. 12/13? In 2031/32 (J1 = Kl. 12), with the first J2 = Kl. 13 in 2032/33.
- What changes for chemistry? See §2.4.

**Corrections to the earlier overview (germany-sek2-overview.md §2.3 and the table on line 123):**
1. The G9 plan is no longer unverified. V3.0 exists, and the Kursstufe content does *not* move. It is only renumbered.
2. V2 Sek I has **no isomerism standard at all**. Isomerism is taught in practice with the alkanes (Beispielcurriculum 1, Kl. 10), and becomes a standard only in V3.0 Kl. 11 (as *cis-trans*).
3. The catalyst standard reads "den Einfluss von **Katalysatoren** auf die Aktivierungsenergie beschreiben" (plural; V2 3.2.2.3 (6)).
4. The Basisfach Naturstoffe unit includes **nucleic acids** (assigning them to their substance class and naming their functions). The Leistungsfach Naturstoffe unit does not mention them.
5. Everything else in §2.3 of the overview checked out against the plan text (quotes now verified from the raw HTML, not a paraphrasing fetch).

---

## 1. Structure

### 1.1 Hours, Kl. 5–11

| | G8 (in force for chemistry in 2026/27) | G9 neu (Stundentafel, Klassen 5–11) |
|---|---|---|
| Kl. 5/6 | BNT (Biologie, Naturphänomene und Technik), integrated; the chemistry basics start here | BNT abolished; Biologie 2/1 h |
| Kl. 7 | no chemistry (Physik, Biologie) | no chemistry (Physik 2, Biologie 2) |
| Kl. 8 | Chemie starts. **6 Kontingentstunden over Kl. 8–10**, usually 2/2/2 | **1 h** |
| Kl. 9 | (as above) | 2 h |
| Kl. 10 | (as above); last Sek I year | 2 h |
| Kl. 11 | Kursstufe J1 (see 1.2) | **2 h, compulsory for all**: the organic-chemistry year (V3.0 §3.2) |
| Profile, Kl. 8– | Profilfach 4 h in 8, 9 and 10 (12 total), e.g. NwT | "Profile" 3 h in each of 8, 9, 10 and 11 (12 total) |

- G9 figures: the Stundentafel in the KM Eckpunkte annex (17.10.2024), confirmed by the current KM page "Bildungsplan 2016, Fächer und Kontingentstundentafel" (Chemie 1/2/2/2 in Kl. 8–11, 7 in total).
- G8 per-year Chemie hours: from a school's published Kontingentstundentafel (Gymnasium Weikersheim), a secondary source. The bildungsplaene-bw.de Kontingentstundentafel gives only "Naturwissenschaften 25" and "Profile 12" for Kl. 5–10. The G8 figure "Chemie 6 over 8–10" is therefore **(unverified from a primary source)**.
- V2 3.2.0: "Das Fach Chemie startet in Klasse 8" and builds on BNT.
- **Profilfächer:** the naturwissenschaftliche Profil offers **NwT** (Naturwissenschaft und Technik) or **IMP** (Informatik, Mathematik, Physik; no chemistry). The NwT plan is still the unrevised BP2016 version. Its chemistry-flavoured standards are 3.2.3.1 *Eigenschaften von Stoffen*, 3.2.3.4 *Stoffströme und Verfahren* (e.g. "ein Produkt realisieren … Sonnencreme, Bioethanol, Zuckerherstellung") and 3.2.2.2 *Energieversorgungssysteme* (incl. "Anlage mit Brennstoffzelle, elektrochemischer Energiespeicher"). Chemistry itself has the same content and hours in every profile.

### 1.2 Kursstufe (G8: Kl. 11/12 = J1/J2; G9: Kl. 12/13)

Source: KM Leitfaden für die gymnasiale Oberstufe (Abitur 2026 edition); AGVO.

- **Leistungsfächer:** three, each **5 h** for four half-years. Two of the three must come from Deutsch, Mathematik, a foreign language or a Naturwissenschaft.
- **Basisfächer:** the natural sciences (and NwT) are **3 h**.
- **Science requirement:** a student must take **at least one of Biologie, Chemie or Physik through all four half-years**. They must also take either a second one of these, or NwT, or a second foreign language. **Chemistry can therefore be dropped after Kl. 10 (G8)**, and after Kl. 11 in G9.
- NwT exists as a Kursstufe Basisfach, and as a Leistungsfach only in a Schulversuch.
- The two Chemie courses have separate plans:
  - **Basisfach:** 5 units. 3.3.1 *Chemische Energetik*, 3.3.2 *Chemische Gleichgewichte* (includes kinetics and acid–base), 3.3.3 *Naturstoffe*, 3.3.4 *Kunststoffe*, 3.3.5 *Elektrische Energie und Chemie*.
  - **Leistungsfach:** 8 units. 3.4.1 *Chemische Energetik*, 3.4.2 *Chemisches Gleichgewicht*, 3.4.3 *Säure-Base-Gleichgewichte*, 3.4.4 *Naturstoffe*, 3.4.5 *Aromaten und Reaktionsmechanismen*, 3.4.6 *Kunststoffe*, 3.4.7 *Elektrochemie*, 3.4.8 *Chemie in Wissenschaft, Forschung und Anwendung*.
- The plan does not split the units between J1 and J2. Their order is set by each school **(unverified: no statewide order found)**.

### 1.3 Abitur (Facherlass Abitur 2027, KM, Stand 09.09.2025)

- **Five examination subjects:** three written (the three Leistungsfächer, with tasks set centrally, "landeseinheitlich") and two oral (normally Basisfächer; one can be replaced by a besondere Lernleistung).
- **Chemie Leistungsfach, written:** **300 min including selection time**. The teacher receives four tasks (I–IV); the student picks **three**.
  - Aids: the **IQB "mathematisch-naturwissenschaftliche Formelsammlung"**, a spelling dictionary, and a scientific calculator (memory cleared).
  - **Unit 3.4.8 ("Chemie in Wissenschaft, Forschung und Anwendung") is excluded from the written exam.**
  - The tasks rest on the KMK Bildungsstandards AHR Chemie (2020). Whether BW draws its Chemie tasks from the IQB joint pool is **not stated in the Facherlass (unverified)**.
- **Operators:** the Klausuren and the exam use the IQB *Grundstock von Operatoren* (Facherlass 27.1.2, 27.3).
- **Klausuren:**
  - Leistungsfach: at least 2 per half-year in the first three half-years, then 1.
  - Basisfach: at least 1 per half-year.
  - The weight sits on AFB II, and AFB I must weigh more than AFB III.
- **Oral exam (Basisfach, or extra in the Leistungsfach):** about 20 min preparation, then a 10-min talk (Part A) and a 10-min discussion (Part B). The two parts must have different Themenbereiche. Experiments are allowed.
  - Basisfach Themenbereiche: Energetik, Gleichgewichte, Naturstoffe, Kunststoffe, Elektrische Energie und Chemie.
  - Leistungsfach: all eight units.

---

## 2. Content by band

Every standard is prefixed by "Die Schülerinnen und Schüler können …". I paraphrase them in English here; the quoted German is verbatim from the plan HTML.

### 2.1 Klassen 8/9/10, V2 (in force; one band, no year split)

**Typical order.** The official **Beispielcurricula (Landesinstitut für Schulentwicklung, May 2017; both examples)** order the band like this:
- **Kl. 8:** substances, the particle model, mixtures, the chemical reaction, mass laws, air, redox with oxygen, fire-fighting (example 1 also puts Stoffmenge/molare Masse here).
- **Kl. 9:** atomic structure and the periodic table, metallic, ionic and covalent bonding, water, acid–base reactions.
- **Kl. 10:** organic chemistry (hydrocarbons, alcohols and their oxidation products, alkanoic acids, esters) plus stoichiometry and concentration.

These curricula were written for V1 (2016). V2 changed Sek I only slightly. The split is `typical`, not official.

**3.2.1.1 Stoffe und ihre Eigenschaften**
- (1) Investigate and describe the properties of substances by experiment: colour, smell, deformability, density, magnetism, conductivity, melting and boiling point, solubility.
- (2) Name the characteristic combinations of properties of listed substances: Luft, N₂, O₂, CO₂, H₂O, H₂, Cl₂, Fe, Cu, Ag, Mg, Na, NaCl, NaOH, MgO, Salzsäure.
- (3) Gefahrenpiktogramme.
- (4) Plan and carry out an experiment to separate a mixture.
- (5) Follow one substance from its industrial production from raw materials to its use. Examples: Kochsalz, Eisen, Kupfer, Benzin.
- (6) Apply a classification of substances: Element, Verbindung, Metall, Nichtmetall, Salz, flüchtiger/molekularer Stoff, Reinstoff, homogenes/heterogenes Gemisch, Lösung, Legierung, Suspension, Emulsion, Rauch, Nebel.
- (7) Properties that depend on particle size (**Nanopartikel**, ratio of surface to volume).
- (8) Aqueous solutions: conductivity; acidic, alkaline and neutral on the pH scale.
- (9) Everyday acidic and alkaline solutions.
- (10) The composition of air and the global effects of rising CO₂.
- **(11)–(15), organic:**
  - (11) Describe named organic substances by their typical properties: "Methan, Heptan, Ethen, Ethanol, Propanal, Propanon, Ethansäure, Ethansäureethylester".
  - (12) Explain their uses from their properties.
  - (13) The dangers and uses of ethanol.
  - (14) Trends in properties within the "homologe Reihe der Alkane und Alkanole".
  - (15) Compare the boiling point and water solubility of Alkane, Alkanole, Alkansäuren and Ester.

**3.2.1.2 Stoffe und ihre Teilchen**
- (1)–(3) Atoms, molecules and *Ionengruppen* as *Stoffteilchen*. Aggregatzustände, Lösungsvorgänge, diffusion and Brownian motion explained with the particle model.
- (4) Compare the sizes of particles (atoms, molecules, macromolecules), nanoparticles and everyday objects.
- (5) Atomic models for atoms and ions: "Proton, Elektron, Neutron, Kern-Hülle-Modell, Schalenmodell/Energiestufenmodell, Außenelektron, Ionenbildung, Ionisierungsenergie, Edelgaskonfiguration".
- (6) Rutherford's scattering experiment.
- (7) Atomic structure and position in the periodic table (Hauptgruppe, Periode, "Vorhersagen von Mendelejew").
- (8) The particles behind acidity and alkalinity: Oxonium- and Hydroxid-Ionen.
- **(9)** "das Aufbauprinzip von Polymeren an einem Beispiel erläutern".
- **(10)** Order organic compounds "mithilfe von Strukturelementen und funktionellen Gruppen (Einfachbindungen und Mehrfachbindungen zwischen Kohlenstoff-Atomen, Hydroxygruppe, Aldehydgruppe, Ketogruppe, Carboxygruppe und Estergruppe)".
- **(11)** "die Nomenklaturregeln nach IUPAC nutzen, um organische Moleküle zu benennen (Alkane, Alkanole, Alkanale, Alkanone, Carbonsäuren)".
- No isomerism standard (see §0, correction 2).

**3.2.1.3 Bindungs- und Wechselwirkungsmodelle**
- (1) Ionic bonding: Ionengitter, brittleness, high melting point, conductivity.
- (2) Metallic bonding with the *Elektronengasmodell*.
- (3) The electron-pair bond and the Edelgasregel: bonding and non-bonding pairs, **Lewis-Schreibweise**, single and multiple bonds.
- (4) Polar vs non-polar bonds; electronegativity.
- (5) Molecular shape with the ***Elektronenpaarabstoßungsmodell***.
- (6) Dipoles: H₂, HCl, CO₂, H₂O, NH₃.
- (7) Assign bond types from properties.
- (8)–(11) **Intermolecular forces:** "Wechselwirkungen zwischen temporären Dipolen, … permanenten Dipolen, Wasserstoffbrücken". Explain boiling point and solubility.
- (10) Water's anomalies.
- (12) Dissolving salts: Hydratation, ion–dipole interaction.

**3.2.2.1 Qualitative Aspekte chemischer Reaktionen**
- (1)–(3) The signs of a reaction; reactions involving O₂, S, H₂, C and metals; a reaction as the rearrangement of atoms or ions by breaking and making bonds.
- (4) **Reversibility**, e.g. *Synthese und Analyse*.
- (5) The **Donator-Akzeptor-Prinzip** for redox (electron transfer) and acid–base (proton transfer, neutralisation).
- (6) **Tests**: O₂, CO₂, H₂, H₂O, Oxonium/Hydroxid-Ionen, Bromid/Chlorid-Ionen, "**Mehrfachbindungen zwischen Kohlenstoff-Atomen, Aldehydgruppe**". The tests are not named (Bromwasser is used for C=C in Beispielcurriculum 1; the aldehyde test is **(unverified)**, presumably Fehling or Tollens).
- (7) The *Zerteilungsgrad* (degree of subdivision) as a way to control a reaction.
- (8) Indicators: a plant dye, universal indicator, Thymolphthalein.
- **(9)** Organic reaction types: "Substitution an einem Alkan, Addition an ein Alken, Kondensation am Beispiel der Veresterung".
- **(10)** "den **Mechanismus der radikalischen Substitution** am Beispiel der Reaktion von Alkanen mit Halogenen beschreiben". This is a mechanism in Sek I, earlier than in any other Land checked.
- **(11)** Oxidation "(Alkanol über Alkanal zur Alkansäure und Alkanol zu Alkanon, Oxidationszahlen)".
- (12) A carbon cycle in living nature, and human interference with it.

**3.2.2.2 Quantitative Aspekte**
- (1)–(2) Conservation of mass and of atoms; an experiment to find a mass ratio (*Verhältnisformel*).
- (3)–(5) Equations; *Verhältnisformeln* and *Molekülformeln* from the Edelgasregel; what a formula tells you.
- (6) An acid–base titration (neutralisation).
- (7) Calculations with correct units: "Atommasse, Teilchenzahl, Masse, Dichte, Stoffmenge, molare Masse, molares Volumen, Massenanteil, Stoffmengenkonzentration".

**3.2.2.3 Energetische Aspekte.** This band holds the first energetics and kinetics seeds.
- (1) Energy stored in substances is converted into light, thermal energy and sound.
- (2) Exotherm/endotherm.
- (3) Compare the energetic states of reactants and products (energy diagrams).
- (4) Electrolysis of a metal-salt solution as the principle of an electrochemical energy store.
- (5) "die Zufuhr von Energie als Voraussetzung zum Start chemischer Reaktionen erklären (**Aktivierungsenergie**) und **mit der Energiezufuhr bei endothermen Reaktionen vergleichen**". This is an explicit anti-misconception standard.
- (6) "den Einfluss von Katalysatoren auf die Aktivierungsenergie beschreiben".
- (7) (Brandbekämpfung, fire-fighting; the V2 page's text did not extract cleanly. V3.0 (7) reads "Modellexperimente zur Brandbekämpfung durchführen und Maßnahmen zum Brandschutz begründen".)
- (8) Compare "die Kohlenstoffdioxidbilanz und die **Reaktionsenergie** bei der Verbrennung verschiedener Brennstoffe" (Wasserstoff, Methan, Benzin).

### 2.2 Kursstufe, Basisfach (3 h). Identical in V2 (Kl. 11/12) and V3.0 (Kl. 12/13)

- **3.3.1 Chemische Energetik**
  - (1) Exotherm, endotherm, **Brennwert, Heizwert**.
  - (2) "eine **kalorimetrische Messung** planen, durchführen und auswerten (Reaktionsenthalpie)".
  - (3) "den Satz von der Erhaltung der Energie (1. Hauptsatz der Thermodynamik) bei der Berechnung von Reaktionsenthalpien und **Bildungsenthalpien** anwenden (**Satz von Hess**)".
  - (4) Apply energetics to Naturstoffe (Stoffwechsel), Kunststoffe (thermische Verwertung) or electrochemistry (Brennstoffzelle).
  - **No entropy, no Gibbs.**
- **3.3.2 Chemische Gleichgewichte.** This unit also holds the kinetics and acid–base content.
  - (1) Reversibility is the precondition for equilibrium.
  - (2) "die Reaktionsgeschwindigkeit und ihre Abhängigkeit von der Konzentration und der Temperatur beschreiben und auf der Teilchenebene erklären (**RGT-Regel, Stoßtheorie**)".
  - (3) "den Einfluss eines Katalysators auf die Reaktionsgeschwindigkeit erläutern (Katalyse)".
  - (4) The **Ester-Gleichgewicht** (ester equilibrium).
  - (5) Evaluate a **model experiment** for reaching equilibrium.
  - (6) "die Lage homogener Gleichgewichte mit dem Massenwirkungsgesetz **beschreiben** (Gleichgewichtskonstante Kc)". The Basisfach only *describes*; the Leistungsfach *calculates* (3.4.2 (7)).
  - (7) Le Chatelier, investigated experimentally.
  - (8)–(9) Haber–Bosch: conditions and yield; the history.
  - (10)–(15) Acid–base: Brønsted (Donator-Akzeptor), acid–base tests (carbonate, ammonium, carboxy group, oxonium, hydroxide), "**die Säurekonstante KS aus dem Massenwirkungsgesetz ableiten**", classify acids by **pKS**, the pH definition and autoprotolysis, **pH of strong monoprotic acids, strong bases and hydroxide solutions**.
- **3.3.3 Naturstoffe**
  - (1) The structure of fats: saturated and unsaturated fatty acids, Glycerin, Ester.
  - (2) Test for unsaturated fatty-acid residues "(elektrophile Addition)". This is the **only mechanism named in the Basisfach**.
  - (3) Monosaccharides and amino acids: "**Chiralität, Fischer-Projektionsformeln und Haworth-Projektionsformeln**, Carbonylgruppe und Aminogruppe".
  - (4) Linking monomers into disaccharide/dipeptide and macromolecules.
  - (5) Tests: GOD-Test, Benedict-Probe, Biuret-Reaktion.
  - (6)–(7) Fette, Kohlenhydrate, Proteine and **Nukleinsäuren**: classify them and describe their functions.
- **3.3.4 Kunststoffe**
  - (1) Thermoplaste, Duromere, Elastomere and the matching molecular structures.
  - (2) Principles of **Polymerisation and Polykondensation**. No mechanism.
  - (3) Make a plastic.
  - (4)–(6) Evaluation, trends, recycling: Werkstoff-, Rohstoffrecycling, energetische Verwertung, Kompostierung.
- **3.3.5 Elektrische Energie und Chemie**
  - (1) Electrolysis as a forced redox reaction.
  - (2)–(3) The Daniell cell; electrode reactions.
  - (4) "Zellspannungen mithilfe von Standardpotenzialen rechnerisch ermitteln".
  - (5)–(6) A battery, an accumulator, the fuel cell.
  - (7) Corrosion and corrosion protection.

### 2.3 Kursstufe, Leistungsfach (5 h). Identical in V2 and V3.0 apart from 3.4.7 (3), noted below

- **3.4.1 Chemische Energetik**
  - (1) **offene, geschlossene, isolierte Systeme**.
  - (2)–(4) As in the Basisfach: calorimetry and Hess with Bildungsenthalpien.
  - (5) "die **Entropie als Maß für die Anzahl von Realisierungsmöglichkeiten** eines Zustands beschreiben".
  - (6) Entropy changes in reactions (**2. Hauptsatz**).
  - (7) "Berechnungen mithilfe der **Gibbs-Helmholtz-Gleichung** durchführen … (freie Reaktionsenthalpie, **exergonische und endergonische** Reaktionen, **Einfluss der Temperatur**)".
  - (8) "Grenzen der energetischen Betrachtungsweise (**metastabiler Zustand**, **homogene und heterogene Katalyse**, unvollständig ablaufende Reaktionen)".
- **3.4.2 Chemisches Gleichgewicht**
  - (2) Rate with "RGT-Regel, Stoßtheorie, **Reaktionsrate**".
  - (3) "die Veresterung als umkehrbare Reaktion erläutern (**Reaktionsmechanismus, Carbokation, nucleophiler Angriff**)".
  - (4) Equilibrium as the equalising of the forward and back *Reaktionsraten*.
  - (5) Measure equilibrium concentrations experimentally (Estergleichgewicht).
  - (6) Carry out a model experiment.
  - (7) "**Berechnungen** zur Lage von homogenen Gleichgewichten … (Kc, **Gleichgewichtskonzentration**)".
  - (8) The MWG for solubility equilibria: heterogeneous equilibrium, **Löslichkeitsprodukt KL**.
  - (9) Le Chatelier: concentration, pressure, temperature.
  - (10)–(11) Haber–Bosch.
- **3.4.3 Säure-Base-Gleichgewichte**
  - (1)–(2) Brønsted; conjugate pairs; water as an amphoteric particle (HCl, HNO₃, H₂SO₄, H₂CO₃, H₃PO₄, NH₃, O²⁻, CH₃COOH).
  - (3) Tests for ammonium and carbonate.
  - (4)–(5) KS from the MWG; **pKS and pKB**.
  - (6)–(8) The pH definition, autoprotolysis, pH of strong acids and bases.
  - (9) "**im Näherungsverfahren pH-Werte für Lösungen schwacher Säuren und Basen** rechnerisch ermitteln".
  - (10)–(12) Titrations, including HCl and dilute acetic acid with NaOH, the **Äquivalenzpunkt and Halbäquivalenzpunkt**, and polyprotic acids.
  - (13) Conductometric titration.
  - (14) Indicators as acid–base equilibria.
  - (15) **Thin-layer chromatography** of universal indicator (Rf, stationary and mobile phase).
  - (16) **Buffers, Henderson–Hasselbalch**.
- **3.4.4 Naturstoffe**
  - (1) Chirality from the asymmetrically substituted C atom.
  - (2) **Fischer projection, D and L forms**.
  - (3) Aldose vs ketose.
  - (4) Ring closure as **Halbacetalbildung (nucleophiler Angriff)**; Fischer ↔ Haworth; α/β.
  - (5) Reducing sugars: **Benedict- or Tollens-Probe**.
  - (6) GOD-Test.
  - (7)–(9) Di-, oligo- and polysaccharides (Acetal, glycosidic link, starch, cellulose).
  - (10) Carbohydrates as renewable raw materials.
  - (11)–(13) Fats: hydrophobic/lipophilic, consistency, addition of halogens, fats vs carbohydrates as energy stores.
  - (14)–(16) L-α-Aminosäuren; forming and hydrolysing the peptide bond; Ninhydrin and Biuret.
  - (17) The **koordinative Bindung** in these tests.
  - (18)–(19) Primary to quaternary structure; denaturation.
- **3.4.5 Aromaten und Reaktionsmechanismen**
  - (1)–(2) Benzen/Benzol and its health risks (Expositions-Risiko-Beziehung).
  - (3) Kekulé, the delocalised ring system, **Mesomeriestabilisierung**, "Substitution statt Addition".
  - (4) "die Mechanismen der **elektrophilen Addition** an Alkene und der **elektrophilen Substitution** an Benzen/Benzol (Erstsubstitution, **Arenium-Ion**) beschreiben".
  - (5) "Substitutionsreaktionen (**SE, SN, SR**) anhand der strukturellen Voraussetzungen des Eduktmoleküls und des angreifenden Teilchens (Elektrophil, Nucleophil, Radikal) vergleichen".
- **3.4.6 Kunststoffe**
  - (1) Structure–property relations, including crystalline and amorphous regions.
  - (2) **Polymerisation, Polykondensation, Polyaddition** with formulas.
  - (3) Named polymers: PE, PP, PVC, PS, PET, PLA, polyamides, polyurethanes.
  - (4) "den Reaktionsmechanismus der **radikalischen Polymerisation** beschreiben (Radikalbildung, Kettenstart, Kettenwachstum, Kettenabbruch)".
  - (5)–(9) Synthesis practicals, plasticisers, processing, recycling, renewable feedstocks.
- **3.4.7 Elektrochemie**
  - (1)–(2) Redox pairs; metals in metal-salt solutions.
  - (3) Oxidation numbers for redox equations. V3.0 adds "sowie zur Nomenklatur von Salzen".
  - (4) **Iodometrie** (redox titration).
  - (5)–(7) Galvanic and electrolytic cells, Zersetzungsspannung, **Faraday-Gesetz**.
  - (8) Cell voltage from equilibria at the double layers.
  - (9)–(10) The standard hydrogen half-cell; standard potentials.
  - (11) **Nernst-Gleichung**.
  - (12) Corrosion (oxygen and acid corrosion, sacrificial anode).
  - (13) Overpotential (*Überspannung*).
  - (14)–(15) Batteries and accumulators (lead-acid), fuel cells.
- **3.4.8 Chemie in Wissenschaft, Forschung und Anwendung.** Not examined in the written Abitur.
  - (1) The **orbital model** of the atom, applied to bonding in simple molecules.
  - (2)–(3) Nanoparticles, the lotus effect, nanomaterials.
  - (4) One further class of substances, e.g. Farbstoffe, Waschmittel, Pharmazeutika, Komplexverbindungen, Silikone.

### 2.4 What V3.0 (G9) changes

**Klassen 8/9/10 (V3.0 §3.1):**
- **New unit 3.1.1 *Denk- und Arbeitsweisen der Chemie*:** safe use of equipment, "unter anderem Gasbrenner", Gefahrenpiktogramme, the scientific method, protocols, explaining observations with models.
- **All organic content is removed**: V2 3.2.1.1 (11)–(15), 3.2.1.2 (9)–(11), and 3.2.2.1 (9)–(11); the CO₂ balance of fuels also leaves.
- The **nanoparticle standards** (V2 3.2.1.1 (7), 3.2.1.2 (4)) are dropped. So is the ethanol dangers standard.
- **Added or changed:**
  - "**Lewis-Schreibweise**" moves to the *atom* model (3.1.2.2 (4)). Molecules now use "**Valenzstrichformel**" (3.1.2.3 (3)).
  - "Partialladung" added to bond polarity; CH₄ and CCl₄ added to the dipole examples.
  - "Lösevorgänge von Salzen auch als chemische Reaktionen".
  - "Mendelejew und Meyer"; "Gruppe" instead of "Hauptgruppe".
  - Rate control by "**Zerteilungsgrad und die Temperatur**".
  - Energy forms now "Strahlungsenergie, thermische Energie, chemische Energie, elektrische Energie".
  - Calculations "auch mithilfe einer Formelsammlung"; *molares Volumen* removed from the list.
  - Titration "mit einem geeigneten Indikator (zum Beispiel Bromthymolblau, Phenolphthalein)".
  - Wording shifts from *Molekülformel* and *Lösungsvorgang* to *Summenformel* and *Lösevorgang*.

**New Klasse 11 (V3.0 §3.2).** The plan's note says "Die inhaltsbezogenen Kompetenzen der Klasse 11 widmen sich der systematischen Betrachtung grundlegender Aspekte der **organischen Chemie**". Taught to everyone, 2 h.
- 3.2.2.1:
  - (1) Obtaining organic substances (fossil fuels, ethanol, acetic acid).
  - (2)–(3) The V2 substance lists.
  - (4) Homologous series.
  - (5) Comparing bp and solubility.
- 3.2.2.2:
  - (1) The polymer principle: "Polyethen oder Polyester".
  - (2) Functional groups, adding "**Aminogruppe in Aminosäuren**".
  - (3) "**Isomerie erklären und auf organische Verbindungen anwenden (Strukturisomerie, cis-trans-Isomerie)**".
  - (4) IUPAC for "Alkane, Alkanole, Alkanale, Alkanone, Carbonsäuren, **Halogenkohlenwasserstoffe, einfache Moleküle mit verschiedenen funktionellen Gruppen**".
- 3.2.2.3: intermolecular forces applied to organic molecules.
- 3.2.3.1:
  - (1) Tests for C=C and the aldehyde group.
  - (2) Organic reaction types.
  - (3) **Radical substitution mechanism**.
  - (4) "die **schrittweise** Oxidation … (Alkan, Alkanol, Alkanal beziehungsweise Alkanon, Alkansäure, Oxidationszahlen)".
- 3.2.3.2:
  - (1) Titration of a carboxylic acid.
  - (2) "eine **Summenformel mithilfe des molaren Volumens experimentell ermitteln** (Methan oder Ethanol)".
- 3.2.3.3: the CO₂ balance and Reaktionsenergie of fuels (H₂, CH₄, petrol).

**Kursstufe (V3.0 §3.3/3.4):**
- Renamed "Klassen 12/13". Standards unchanged except LF 3.4.7 (3), which adds salt nomenclature, and minor verb changes.
- The prozessbezogene Kompetenzen gain a fourth area, **2.1 Sachkompetenz**, alongside Erkenntnisgewinnung, Kommunikation and Bewertung. This brings them into line with the KMK 2020/2024 standards; V2 had only the last three.

---

## 3. Where each topic sits: summary for game design

"V2" = in force 2026/27 (G8). "V3.0" = G9, from the years shown in §0. BF = Basisfach, LF = Leistungsfach.

| Topic | V2 Sek I (8/9/10; typical year) | V3.0 | Kursstufe BF | Kursstufe LF |
|---|---|---|---|---|
| Alkanes, alkenes, homologous series, bp/solubility trends | 8–10 (Kl. 10) | Kl. 11 | – | – |
| Functional groups (OH, CHO, C=O, COOH, COOR) | 8–10 (Kl. 10) | Kl. 11 (+ NH₂ in amino acids) | carbonyl/amino groups in Naturstoffe | same |
| IUPAC nomenclature | Alkane, Alkanole, Alkanale, Alkanone, Carbonsäuren (Kl. 10) | + Halogenkohlenwasserstoffe, simple multifunctional (Kl. 11) | – | polymer names |
| Structural isomerism | not a standard; taught with alkanes (typical, Kl. 10) | Kl. 11, official | – | – |
| cis/trans (E/Z) | not in plan | Kl. 11 "cis-trans-Isomerie" | – | – |
| Chirality, Fischer, D/L | – | – | Chiralität, Fischer and Haworth | + asymmetric C, D/L, Halbacetal |
| Organic reaction types | 8–10 (substitution, addition, esterification) | Kl. 11 | – | SE/SN/SR comparison |
| Mechanisms | **SR (Sek I!)** | SR (Kl. 11) | electrophilic addition (unsaturated-fat test) only | + SE (Arenium-Ion), esterification mechanism, radical polymerisation |
| Oxidation of alcohols, oxidation numbers | 8–10 (Kl. 10) | Kl. 11 | – | oxidation numbers in electrochemistry |
| Tests for functional groups | C=C, aldehyde (tests not named) | same, Kl. 11 | unsaturated fat, GOD, Benedict, Biuret | + Benedict/Tollens, Ninhydrin |
| Aromatics | – | – | – | 3.4.5 |
| Polymers | principle, one example | Kl. 11 (PE or polyester) | polymerisation/polycondensation principles | + polyaddition, radical mechanism |
| Exo/endo, energy diagram, Ea vs endothermic, catalyst lowers Ea | 8–10 (Kl. 8) | 8–10 | exo/endo, Brennwert | same |
| Calorimetry, ΔrH, Hess, Bildungsenthalpien | – ("Reaktionsenergie" only) | – | yes | yes |
| Entropy (microstates), 2nd law, Gibbs–Helmholtz | – | – | **no** | yes (with T dependence, metastability) |
| Rate factors | Zerteilungsgrad | Zerteilungsgrad + Temperatur | c, T; catalyst | same + "Reaktionsrate" |
| Collision theory, RGT rule | – | – | yes | yes |
| Maxwell–Boltzmann, rate law, Arrhenius | – | – | – | – |
| Reversibility | Synthese/Analyse | same | dynamic equilibrium, ester equilibrium, model experiment | + equality of rates |
| MWG, Kc | – | – | describe | calculate, incl. equilibrium concentrations |
| Le Chatelier, Haber–Bosch | – | – | yes | yes |
| KL (solubility product) | – | – | – | yes |
| Brønsted, KS/pKS, pH | proton transfer; pH scale qualitative | same | KS from MWG, pKS, pH of strong acids and bases | + pKB, weak acids, titration curves, buffers/HH |
| Electrochemistry | electrolysis as energy storage | same | Daniell, E° calculation, batteries, fuel cell, corrosion | + SHE, Nernst, Faraday, Iodometrie, overpotential |

---

## 4. Nomenclature, notation and wording (from the plan texts)

### 4.1 Verified from the plan
- **Substances named with systematic names, trivial names alongside:**
  - Systematic: *Methan, Heptan, Ethen, Ethanol, Propanal, Propanon, Ethansäure, **Ethansäureethylester***.
  - Paired forms: "*Propanon/Aceton*", "*Ethansäure/Essigsäure*".
  - Esters are named as "*…säure…ester*". Neither *Ethylethanoat* nor *Essigsäureethylester* appears.
- **Family names:** *Alkane, Alkanole, Alkanale, Alkanone, Alkansäuren/Carbonsäuren, Ester, Halogenkohlenwasserstoffe* (V3.0). BW uses *Alkanole* where Bavaria says *Alkohole*.
- **Functional groups:** *Hydroxygruppe, Aldehydgruppe, Ketogruppe, Carboxygruppe, Estergruppe, Aminogruppe*; "*Mehrfachbindungen zwischen Kohlenstoff-Atomen*"; *Carbonylgruppe* (Kursstufe).
- **Isomerism:** V3.0 says "*Strukturisomerie, cis-trans-Isomerie*". **E/Z does not appear in V2 or V3.0**; this is the opposite of Bavaria. For fatty acids the Kursstufe says only "*gesättigte und ungesättigte Fettsäuren*".
- **Stereochemistry:** "*asymmetrisch substituiertes Kohlenstoff-Atom*", "*Chiralität*", "*Fischer-Projektion*", "*D-Form und L-Form*", "*Haworth-Projektionsformeln*", "*α-Form, β-Form*", "*L-α-Aminosäuren*". BW uses **Aminosäure**, not the Bavarian *Aminocarbonsäure*.
- **Formula vocabulary:**
  - V2: *Verhältnisformel, Molekülformel, Strukturformel, räumliche Darstellung*, *Lewis-Schreibweise*.
  - V3.0: *Atomsymbol, Verhältnisformel, **Summenformel**, Strukturformel, räumliche Darstellung*; *Valenzstrichformel* for molecules, *Lewis-Schreibweise* for atoms.
- **Bonding:** *Elektronenpaarbindung, Edelgasregel, Elektronegativität, Partialladung* (V3.0), ***Elektronenpaarabstoßungsmodell*** (not "VSEPR"), *Elektronengasmodell*, *Ionengitter*, *Hydratation*.
  - **Intermolecular forces are written as "Wechselwirkungen zwischen temporären Dipolen / permanenten Dipolen, Wasserstoffbrücken"**. The plan never says *Van-der-Waals* or *London*. A game should accept those terms but lead with the plan's wording.
  - The Kursstufe uses *koordinative Bindung*, *delokalisiertes Elektronenringsystem*, *Mesomeriestabilisierung* and *Orbitalmodell*. **Hybridisation is not named.**
- **Particles:** *Oxonium-Ionen, Hydroxid-Ionen, Ionengruppen* (for polyatomic ions), *Stoffteilchen* (V2), *Kohlenstoff-Atome*, *Wasser-Molekül*.
  - The plan keeps *Stoff- und Teilchenebene* apart, as a stated didactic principle (V3.0 1.4: "Denken auf zwei Ebenen – der Stoff- und der Teilchenebene").
- **Energetics:** Sek I uses *Reaktionsenergie*, *exotherm/endotherm*, *Aktivierungsenergie*. The Kursstufe uses *Reaktionsenthalpie, Bildungsenthalpie, Satz von Hess, 1./2. Hauptsatz, Entropie, freie Reaktionsenthalpie, exergonisch/endergonisch, Gibbs-Helmholtz-Gleichung, metastabiler Zustand, Brennwert/Heizwert*.
- **Kinetics and equilibrium:** *Reaktionsgeschwindigkeit*, *Reaktionsrate* (LF, at particle level), *RGT-Regel, Stoßtheorie, Zerteilungsgrad, Katalyse*; *Massenwirkungsgesetz, Gleichgewichtskonstante Kc, Gleichgewichtskonzentration, Löslichkeitsprodukt KL*, *Prinzip von Le Chatelier*.
- **Acid–base:** ***Brønsted*** (with ø, unlike Bavaria's "Brönsted"), *Säurekonstante KS, pKS, pKB, Autoprotolyse, Äquivalenzpunkt, **Halbäquivalenzpunkt*** (Bavaria: *Halbtitrationspunkt*), *Henderson-Hasselbalch-Gleichung*, *konduktometrisch*.
- **Mechanisms:** "***nucleophil***" is spelled with *c* (*nucleophiler Angriff*, *Nucleophil*). Also *Carbokation, Arenium-Ion, Radikal, Elektrophil*, and the abbreviations *SE, SN, SR*.
- **Polymers:** *Thermoplaste, **Duromere**, Elastomere*; *Polyethen, Polypropen, Polyvinylchlorid, Polystyrol, Polyethylenterephthalat, Polymilchsäure, Polyamide, Polyurethane*; *Polymerisation, Polykondensation, Polyaddition*.
- **Other:** *Benzen/Benzol* (both). *Kohlenstoffdioxid* (not *Kohlendioxid*). *Glycerin* (not *Propan-1,2,3-triol*). *Salzsäure, Natronlauge, Ammoniak-Lösung*. *Stoffmengenkonzentration*, *Massenanteil*.

### 4.2 Not stated in the plan **(unverified for BW)**
- **Locant style:** whether it is *Propan-2-ol* or *2-Propanol*. The plan gives no multi-locant example. Modern BW textbooks follow current IUPAC (*Propan-2-ol*) **(unverified)**.
- **Notation for oxidation numbers:** Roman numerals over the symbol, as in the other Länder **(unverified)**.
- **ΔrH° / ΔrG° symbols:** the Formelsammlung is the IQB one (Facherlass), so its symbols apply in the Abitur **(not read)**.

---

## 5. Kompetenzbereiche, Basiskonzepte, Operatoren

- **Prozessbezogene Kompetenzen:**
  - V2: 2.1 *Erkenntnisgewinnung*, 2.2 *Kommunikation*, 2.3 *Bewertung*.
  - V3.0: 2.1 ***Sachkompetenz*** (17 standards, e.g. "(13) Reaktionstypen bestimmen und ausgewählte Reaktionsmechanismen beschreiben", "(15) die Umkehrbarkeit … bei Betrachtung dynamischer Gleichgewichte anwenden", "(17) mathematische Verfahren … anwenden"), 2.2 *Erkenntnisgewinnung* (19), 2.3 *Kommunikation* (12), 2.4 *Bewertung* (14).
- **Inhaltsbezogene Kompetenzen:**
  - Sek I is organised by the KMK Basiskonzepte as two areas, "*Stoff – Teilchen – Struktur – Eigenschaften*" and "*Chemische Reaktion*". V3.0 adds "*Denk- und Arbeitsweisen der Chemie*".
  - The Kursstufe is organised by subject topics (§1.2).
  - V3.0 1.4: the Kursstufe deepens the concepts from up to Kl. 11 "und [erweitert sie] durch das Konzept des chemischen Gleichgewichts". Equilibrium is therefore defined as Kursstufe content.
- **Basisfach vs Leistungsfach (V3.0 1.4):**
  - Basisfach: "Schwerpunkt … Weiterentwicklung chemischen Überblickswissens".
  - Leistungsfach: "anspruchsvollere experimentelle Zugänge, höhere Abstraktionsniveaus der … Modelle und verstärkte Mathematisierung".
- **Operators:**
  - The plan (V3.0 §4) has its own list with AFB assignments: *ableiten* II–III, *abschätzen* II, *analysieren* II–III, *angeben/nennen* I–II, *anwenden* II, *aufstellen/formulieren* II–III, *Hypothesen aufstellen* II–III, *auswerten* II–III, *begründen*, *berechnen*, *beschreiben*, *beurteilen*, *bewerten*, *diskutieren*, *erklären*, *erläutern*, *herleiten*, *interpretieren/deuten* II–III, *darstellen* I–II, *durchführen* I, *ermitteln* II, *nutzen* I, *ordnen/zuordnen* I–II, *planen* II–III, *protokollieren* I–II, *skizzieren* I–III, *untersuchen* II, *vergleichen* I–II, *zeichnen* I–II.
  - The plan itself warns that these "handlungsleitende Verben" differ from the exam operators. **Exams use the IQB *Grundstock von Operatoren*** (Facherlass 27.3); see the Bavarian report §5.2 for that list.
  - The V2 operator page was not fetched; I assume it is identical **(unverified)**.
- **AFB weighting:** the weight sits on AFB II, and AFB I must outweigh AFB III (Facherlass).

---

## 6. Unverified or open points

1. **G8 Chemie hours per year** (2/2/2 of 6 Kontingentstunden). Taken from a school's Stundentafel; the primary Kontingentstundentafel gives only group totals.
2. **Year order inside the Kl. 8/9/10 band.** It comes from the 2017 Beispielcurricula, which were written for V1. Schools set their own order. Every Sek I placement split below the band is `typical`.
3. **Kursstufe unit order (J1 vs J2).** Not fixed by the plan; not researched.
4. **Which plan the G9-Modellschulen and G8-Züge follow** in Kl. 8–11 during the transition.
5. **The Letter vs the table on V3.0's start:** the KM letter (Oct 2025) planned V3.0 "zum 1. August 2026". The published implementation table starts Chemie V3.0 in Kl. 8 in 2027/28. I followed the table. A KM confirmation letter was not found.
6. **Whether BW Chemie Abitur tasks come from the IQB pool.** The Facherlass says the tasks are "landeseinheitlich" and based on the KMK standards, but does not mention the pool.
7. **Names of the Sek I tests** for C=C and the aldehyde group (Bromwasser is used in Beispielcurriculum 1; Fehling/Tollens/Schiff for aldehydes is not stated in V2).
8. **Isomerism in V2 Sek I:** not a standard. That it is taught at all in Kl. 10 rests on Beispielcurriculum 1 ("Isomerie" in the Kohlenwasserstoffe unit). Whether cis/trans or E/Z is taught before V3.0 is unknown.
9. **Hybridisation / sp³** in LF 3.4.8 (1): the plan says only "Orbitalmodell … auf die chemische Bindung in einfachen Molekülen anwenden". 3.4.8 is also not examined in writing.
10. **Rate as Δc/Δt and rate from graphs:** implied by "Reaktionsgeschwindigkeit … beschreiben", but not stated.
11. **V2 standards with garbled extraction** (LF 3.4.1 (1), 3.4.2 (9), 3.4.6 (6), 3.4.7 (14), Sek I 3.2.2.3 (7)): read from V3.0, which I assume is unchanged there.
12. **The content of BNT (Kl. 5/6)** for the current G8 cohorts, and the chemistry in Physik/Biologie V3.0 for G9 Kl. 5–7: not researched.

---

## 7. Sources (URLs used)

**Bildungsplan (bildungsplaene-bw.de, ZSL):**
- Chemie V2 (Überarbeitete Fassung vom 25.03.2022), start page: https://www.bildungsplaene-bw.de/,Lde/BP2016BW_ALLG_GYM_CH.V2
  - Klassen 8/9/10: https://www.bildungsplaene-bw.de/,Lde/BP2016BW_ALLG_GYM_CH.V2_IK_8-9-10_00 (Hinweis), …_IK_8-9-10_01_01, …_01_02, …_01_03, …_02_01, …_02_02, …_02_03
  - Basisfach: https://www.bildungsplaene-bw.de/,Lde/BP2016BW_ALLG_GYM_CH.V2_IK_11-12-BF_01 … _BF_05
  - Leistungsfach: https://www.bildungsplaene-bw.de/,Lde/BP2016BW_ALLG_GYM_CH.V2_IK_11-12-LF_01 … _LF_08
- Chemie V3.0 (Überarbeitete Fassung vom 08. April 2026), whole plan on one page: https://www.bildungsplaene-bw.de/,Lde/DE_BW_BILDUNGSPLAENE_GEN2X_BPBW_ALLG_GYM_CH(V3.0)
- Bildungsplan des Gymnasiums, index of all subject versions: https://www.bildungsplaene-bw.de/30823695
- Implementierungskonzept überarbeiteter Bildungspläne (implementation tables): https://bildungsplaene-bw.de/25863460
- Anhörungsfassungen (currently only Informatik und Medienbildung): https://www.bildungsplaene-bw.de/,Lde/ANHOERUNG
- NwT Profilfach: https://www.bildungsplaene-bw.de/,Lde/BP2016BW_ALLG_GYM_NWT (…_IK_8-9-10_02_02, …_03_01, …_03_04)
- Kontingentstundentafel (G8 totals): https://www.bildungsplaene-bw.de/,Lde/4559770

**Kultusministerium (km-bw.de):**
- Anlage zu den weiteren Eckpunkten von „G9 neu“ (17.10.2024), incl. Stundentafel G9 (copy hosted by a school): https://www.jkgweil.de/fileadmin/user_upload/Informationen/241017_Anlage_G9_neu.pdf
- Informationsschreiben Bildungsplanarbeiten Biologie, Chemie, Physik und Geographie (23.10.2025): https://km.baden-wuerttemberg.de/fileadmin/redaktion/m-km/intern/PDF/Dateien/Allgemeine_Infos/Bildungsreform/Informationsschreiben_Anh%C3%B6rung_Bildungsplanarbeiten.pdf
- Bildungspläne 2016 in Überarbeitung: https://km.baden-wuerttemberg.de/de/schule/allgemeine-informationen-1/bildungsplaene/bildungsplaene-2016-in-ueberarbeitung
- Bildungsplan 2016, Fächer und Kontingentstundentafel (G9 Stundentafel): https://km.baden-wuerttemberg.de/de/schule/gymnasium/bildungsplan-2016-faecher-und-kontingentstundentafel
- Allgemeine Informationen zum Gymnasium: https://km.baden-wuerttemberg.de/de/schule/gymnasium/allgemeine-informationen-zum-gymnasium
- G9-Modellschulen: https://km.baden-wuerttemberg.de/de/schule/gymnasium/g9-modellschulen
- Facherlass für die Abiturprüfung 2027 (Stand 09.09.2025), §27 Chemie: https://km.baden-wuerttemberg.de/fileadmin/redaktion/m-km/intern/PDF/Dateien/Gymnasium/Dokumente_Abitur/Abitur_2027/Facherlass_2027_Stand_09.09.2025.pdf
- Leitfaden für die gymnasiale Oberstufe, Abitur 2026: https://km.baden-wuerttemberg.de/fileadmin/redaktion/m-km/intern/PDF/Publikationen/Gymnasium/2023_Leitfaden_fuer_die_gymnasiale_Oberstufe_Abitur_2026.pdf

**Landesbildungsserver (schule-bw.de):**
- Beispielcurriculum Chemie Kl. 8–10, Beispiel 1 and 2 (May 2017): https://www.schule-bw.de/service-und-tools/bildungsplaene/allgemein-bildende-schulen/bildungsplan-2016/beispielcurricula/gymnasium/BP2016BW_ALLG_GYM_CH_BC_8-10_BSP_1.pdf and …_BSP_2.pdf

**KMK / IQB:** KMK Bildungsstandards AHR Chemie (2020): https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2020/2020_06_18-BildungsstandardsAHR_Chemie.pdf ; IQB operators: https://www.iqb.hu-berlin.de/abitur/dokumente/naturwissenschaften

**Secondary (cross-checks only):**
- Gymnasium Weikersheim, Kontingentstundentafel (G8 Chemie 2/2/2): https://gymwkh.de/kontingentstundentafel/
- Statistisches Landesamt BW, Schülervorausberechnung (about 19,000 Hochschulreife holders in 2032): https://www.statistik-bw.de/presse/pressemitteilungen/pressemitteilung/schuelervorausberechnung-bis-2038-werden-weitgehend-stabile-schulabgaengerzahlen-erwartet/
- Cornelsen BW Chemie page ("G9 Baden-Württemberg ab 2027"): https://www.cornelsen.de/lehrplaene/baden-wuerttemberg/gymnasium/chemie

---

## 8. Placements for the curriculum map

> These tables are the source of `src/core-engine/data/curriculum/countries/de-bw.ts`.

**Scope of the record:**
- It describes **2026/27**: G8, Bildungsplan 2016 **V2**.
- The G9 plan (V3.0) enters as `planned` placements, in §8.3, only where it moves content.
- For the Kursstufe, a single `change.upcoming` entry suffices: V3.0 moves it from Kl. 11/12 to Kl. 12/13 with identical content. There is no need to duplicate every Kursstufe placement.

**Conventions:**
- A placement spanning the whole 8–10 band is `official`. A split inside it (from the 2017 Beispielcurricula) is `typical`.
- Kursstufe placements span 11–12 and are `official`, because the plan does not split J1/J2.
- `ga` = Basisfach and `ea` = Leistungsfach. Where both courses teach a concept, both rows are given.

**Tracks:**
- `ga`: Kursstufe Chemie as a Basisfach (grundlegendes Niveau, 3 h). G8: Kl. 11–12 (J1/J2); G9: Kl. 12–13.
- `ea`: Kursstufe Chemie as a Leistungsfach (erhöhtes Niveau, 5 h, written Abitur). Same years.
- `nwt`: the Profilfach Naturwissenschaft und Technik (naturwissenschaftliches Profil). G8: Kl. 8–10, 4 h; G9: Kl. 8–11, 3 h. Only the few chemistry-related standards are placed.

### 8.1 Years (2026/27)

| year | local label | typical age at start | stage | delivery | note |
|---|---|---|---|---|---|
| 7 | Klasse 7 | 12 | Sekundarstufe I | none | No chemistry in G8 or G9 (Physik and Biologie only). |
| 8 | Klasse 8 | 13 | Sekundarstufe I | separate | Chemie starts; G8 6 Kontingentstunden over Kl. 8–10, usually 2 h (unverified); G9 from 2027/28: 1 h. |
| 9 | Klasse 9 | 14 | Sekundarstufe I | separate | Usually 2 h (G9: 2 h). |
| 10 | Klasse 10 | 15 | Sekundarstufe I | separate | Last G8 Sek I year; typically the organic-chemistry year (V2). G9: 2 h. |
| 11 | Klasse 11 / J1 (Jahrgangsstufe 1) | 16 | Kursstufe (G8) | optional | Basisfach 3 h or Leistungsfach 5 h; chemistry can be dropped. From 2030/31 (G9) Kl. 11 is a compulsory Sek I year with 2 h of organic chemistry for all. |
| 12 | Klasse 12 / J2 (Jahrgangsstufe 2) | 17 | Kursstufe (G8) | optional | Abitur year for G8; from 2031/32 G9 J1. |
| 13 | Klasse 13 | 18 | Kursstufe (G9) | no-such-year | Exists in 2026/27 only at the 44 G9-Modellschulen (Schulversuch, ends 2031/32). It becomes the general G9 Abitur year (J2) in 2032/33. |

### 8.2 Placements, main record (V2, in force 2026/27)

| concept id | from | to | depth | track | status | note |
|---|---|---|---|---|---|---|
| particle-model | 8 | 8 | develop | | typical | Stoffteilchenmodell; diffusion, Brownian motion (V2 3.2.1.2 (3)); builds on BNT Kl. 5/6 |
| states-of-matter | 8 | 8 | develop | | typical | Aggregatzustände with the particle model |
| physical-properties | 8 | 8 | develop | | typical | Stoffeigenschaften: mp, bp, conductivity, solubility (3.2.1.1 (1)) |
| density | 8 | 8 | develop | | typical | Property (3.2.1.1 (1)) and calculation (3.2.2.2 (7)) |
| elements-compounds-mixtures | 8 | 8 | develop | | typical | Ordnungsprinzip: Element, Verbindung, Reinstoff, Gemisch (3.2.1.1 (6)) |
| mixture-types | 8 | 8 | develop | | typical | homogen/heterogen, Lösung, Legierung, Suspension, Emulsion, Rauch, Nebel |
| colloids | 8 | 8 | intro | | typical | Suspension, Emulsion, Rauch, Nebel as classes only |
| separation-techniques | 8 | 8 | develop | | typical | Plan and carry out a separation (3.2.1.1 (4)) |
| subatomic-particles | 9 | 9 | develop | | typical | Proton, Elektron, Neutron; Massenzahl (3.2.1.2 (5), (7)) |
| atomic-models-history | 9 | 9 | develop | | typical | Rutherford experiment; Kern-Hülle and Schalen/Energiestufenmodell |
| atomic-models-history | 11 | 12 | extend | ea | official | Orbital model (LF 3.4.8 (1)); not in the written Abitur |
| isotopes | 9 | 9 | intro | | unverified | Neutronenanzahl/Massenzahl are named; "Isotop" is not |
| electron-shells | 9 | 9 | develop | | typical | Schalenmodell/Energiestufenmodell, Außenelektronen, Edelgaskonfiguration |
| electron-configuration | 11 | 12 | extend | ea | official | "energetischer Zustand der Elektronen … Orbitalmodell" (3.4.8 (1)); s/p/d not named |
| periodic-table-structure | 9 | 9 | develop | | typical | Hauptgruppe, Periode, Ordnungszahl (3.2.1.2 (7)) |
| periodic-table-history | 9 | 9 | intro | | typical | "Vorhersagen von Mendelejew" |
| periodic-law-electronic | 9 | 9 | develop | | typical | Atombau ↔ Stellung im PSE |
| group-chemistry | 9 | 9 | intro | | typical | Alkali metals and halogens in the Beispielcurricula; no group named in the standards |
| periodic-trends | 9 | 9 | intro | | typical | Ionisierungsenergie, Elektronegativität |
| ionic-bonding | 9 | 9 | develop | | typical | Ionenbindung, Ionengitter, properties of salts |
| covalent-bonding | 9 | 9 | develop | | typical | Elektronenpaarbindung, Edelgasregel, multiple bonds |
| metallic-bonding | 9 | 9 | develop | | typical | Elektronengasmodell |
| bond-polarity | 9 | 9 | develop | | typical | Elektronegativität, polar/unpolar; dipole molecules |
| lewis-structures | 9 | 9 | develop | | typical | "Lewis-Schreibweise" (V2 3.2.1.3 (3)); V3.0 says Valenzstrichformel |
| molecular-shape | 9 | 9 | develop | | typical | Elektronenpaarabstoßungsmodell |
| intermolecular-forces | 9 | 10 | develop | | typical | Water in Kl. 9; organic bp/solubility in Kl. 10; "Wechselwirkungen zwischen temporären/permanenten Dipolen, Wasserstoffbrücken" |
| giant-structures | 9 | 9 | develop | | typical | Ionengitter; assigning Stoffteilchen and bond type to substances; no network solids or allotropes named |
| hybridisation | 11 | 12 | extend | ea | unverified | Orbital model applied to bonding (3.4.8 (1)); sp/sp²/sp³ not named |
| chemical-symbols-formulas | 8 | 8 | develop | | typical | Formelschreibweise; information content of a formula |
| ionic-formulas | 9 | 9 | develop | | typical | Verhältnisformeln via Edelgasregel (3.2.2.2 (4)) |
| polyatomic-ions | 9 | 9 | intro | | typical | "Ionengruppen" |
| inorganic-nomenclature | 8 | 10 | intro | | unverified | Salt names are used but no naming standard exists in V2 (V3.0 LF adds salt nomenclature) |
| organic-nomenclature | 10 | 10 | develop | | typical | IUPAC for Alkane, Alkanole, Alkanale, Alkanone, Carbonsäuren (V2 3.2.1.2 (11)) |
| physical-chemical-change | 8 | 8 | develop | | typical | Merkmale chemischer Reaktionen; bonds broken and made |
| conservation-of-mass | 8 | 8 | develop | | typical | Mass and atom-number conservation |
| writing-equations | 8 | 8 | develop | | typical | Reaktionsgleichungen in Formelschreibweise |
| balancing-equations | 8 | 8 | develop | | typical | |
| reaction-types | 8 | 10 | develop | | official | Synthese/Analyse, redox and acid–base via Donator-Akzeptor |
| combustion | 8 | 8 | develop | | typical | Reactions with O₂; fire-fighting |
| relative-formula-mass | 8 | 8 | develop | | typical | Atommasse, molare Masse |
| mole-concept | 8 | 10 | develop | | official | Stoffmenge, Teilchenzahl, molare Masse (3.2.2.2 (7)); Kl. 8 in Beispielcurriculum 1, Kl. 9–10 in 2 |
| reacting-masses | 10 | 10 | develop | | typical | Stoichiometry of alkane combustion (Beispielcurricula) |
| empirical-formula | 8 | 8 | intro | | typical | Massenverhältnis → Verhältnisformel (3.2.2.2 (2)) |
| dissolving-solubility | 8 | 9 | develop | | typical | Löslichkeit; Lösungsvorgang of salts (Hydratation) |
| electrolytic-dissociation | 9 | 9 | develop | | typical | Conductivity of salt solutions; ions in solution |
| mass-concentration | 8 | 10 | develop | | official | Massenanteil |
| molar-concentration | 9 | 10 | develop | | typical | Stoffmengenkonzentration |
| molar-gas-volume | 8 | 10 | develop | | official | Molares Volumen (3.2.2.2 (7)); Avogadro in the Beispielcurricula |
| acids-bases-indicators | 8 | 9 | develop | | typical | pH-Skala qualitative; plant dye, universal indicator, Thymolphthalein |
| neutralisation | 9 | 9 | develop | | typical | Protonenübergang, Neutralisation |
| acid-base-theories | 9 | 9 | develop | | typical | Donator-Akzeptor-Prinzip (proton transfer) |
| acid-base-theories | 11 | 12 | develop | ga | official | Brønsted (3.3.2 (10)) |
| acid-base-theories | 11 | 12 | extend | ea | official | Brønsted, conjugate pairs, water as an amphoteric particle |
| ph-calculations | 11 | 12 | develop | ga | official | pH definition, autoprotolysis, strong monoprotic acids and bases |
| ph-calculations | 11 | 12 | extend | ea | official | + Näherungsverfahren for weak acids and bases |
| strong-weak-acids | 11 | 12 | develop | ga | official | Classify by pKS |
| strong-weak-acids | 11 | 12 | extend | ea | official | pKS and pKB |
| acid-dissociation-constants | 11 | 12 | develop | ga | official | "KS aus dem MWG ableiten", pKS |
| acid-dissociation-constants | 11 | 12 | extend | ea | official | KS, pKS, pKB; weak-acid pH |
| buffers | 11 | 12 | extend | ea | official | Henderson–Hasselbalch |
| redox-oxygen | 8 | 8 | develop | | typical | Oxidation/reduction with oxygen (Beispielcurricula Kl. 8) |
| redox-electron-transfer | 9 | 9 | develop | | typical | Donator-Akzeptor, Elektronenübergang |
| redox-electron-transfer | 11 | 12 | develop | ga | official | Electrolysis and galvanic cells as redox |
| redox-electron-transfer | 11 | 12 | extend | ea | official | Redoxpaare; Reduktions-/Oxidationsvermögen |
| reactivity-series | 11 | 12 | develop | ea | official | Metals in metal-salt solutions (3.4.7 (2)) |
| oxidation-states | 10 | 10 | develop | | typical | Oxidationszahlen in the oxidation of alkanols (3.2.2.1 (11)) |
| oxidation-states | 11 | 12 | extend | ea | official | Identify and balance redox reactions (3.4.7 (3)) |
| balancing-redox | 11 | 12 | extend | ea | official | Redox equations via oxidation numbers |
| electrolysis | 9 | 9 | intro | | typical | Electrolysis of a metal-salt solution as energy storage (3.2.2.3 (4)) |
| electrolysis | 11 | 12 | develop | ga | official | Forced redox reaction |
| electrolysis | 11 | 12 | extend | ea | official | Zersetzungsspannung, Faraday-Gesetz, Überspannung |
| electrochemical-cells | 11 | 12 | develop | ga | official | Daniell cell; battery, accumulator, fuel cell |
| electrochemical-cells | 11 | 12 | extend | ea | official | + measured cell voltages, lead-acid accumulator, double layer |
| electrode-potentials | 11 | 12 | develop | ga | official | Cell voltage from standard potentials |
| electrode-potentials | 11 | 12 | extend | ea | official | Standard hydrogen half-cell, predictions, Nernst equation |
| corrosion | 11 | 12 | develop | ga | official | Corrosion and protection |
| corrosion | 11 | 12 | extend | ea | official | Oxygen and acid corrosion, sacrificial anode |
| exo-endothermic | 8 | 8 | develop | | typical | exotherm/endotherm; "Reaktionsenergie" |
| exo-endothermic | 11 | 12 | develop | ga | official | + Brennwert, Heizwert |
| exo-endothermic | 11 | 12 | develop | ea | official | + Brennwert, Heizwert |
| reaction-profiles | 8 | 10 | develop | | official | Energy states of reactants and products; Ea contrasted with endothermic energy demand; catalyst lowers Ea |
| enthalpy-calorimetry | 11 | 12 | develop | ga | official | Calorimetry, Reaktionsenthalpie |
| enthalpy-calorimetry | 11 | 12 | develop | ea | official | + open/closed/isolated systems |
| hess-law | 11 | 12 | develop | ga | official | 1. Hauptsatz, Reaktions- and Bildungsenthalpien |
| hess-law | 11 | 12 | develop | ea | official | Same standard |
| entropy-gibbs | 11 | 12 | extend | ea | official | Entropy as microstates; 2nd law; Gibbs–Helmholtz calculations incl. T; metastability; Basisfach has none |
| rate-factors | 8 | 10 | intro | | official | Zerteilungsgrad only (V2 3.2.2.1 (7)) |
| rate-factors | 11 | 12 | develop | ga | official | Concentration, temperature, catalyst |
| rate-factors | 11 | 12 | develop | ea | official | Same, plus "Reaktionsrate" |
| collision-theory | 11 | 12 | develop | ga | official | Stoßtheorie, RGT-Regel |
| collision-theory | 11 | 12 | develop | ea | official | Stoßtheorie, RGT-Regel, Reaktionsrate |
| catalysts | 8 | 10 | intro | | official | Catalysts lower the activation energy |
| catalysts | 11 | 12 | develop | ga | official | Catalyst and rate; Haber–Bosch |
| catalysts | 11 | 12 | extend | ea | official | Homogeneous and heterogeneous catalysis (3.4.1 (8)) |
| measuring-rate | 11 | 12 | develop | ga | unverified | "Reaktionsgeschwindigkeit … beschreiben"; Δc/Δt and graphs not stated |
| measuring-rate | 11 | 12 | develop | ea | unverified | As for ga |
| reversible-reactions | 8 | 10 | intro | | official | Umkehrbarkeit: Synthese und Analyse |
| reversible-reactions | 11 | 12 | develop | ga | official | Dynamic equilibrium, ester equilibrium, model experiment |
| reversible-reactions | 11 | 12 | extend | ea | official | Equilibrium as equal forward and back Reaktionsraten |
| le-chatelier | 11 | 12 | develop | ga | official | Experimental; Haber–Bosch conditions |
| le-chatelier | 11 | 12 | develop | ea | official | Concentration, pressure, temperature; Haber–Bosch |
| equilibrium-constant | 11 | 12 | develop | ga | official | MWG, Kc — "beschreiben" |
| equilibrium-constant | 11 | 12 | extend | ea | official | Calculations incl. equilibrium concentrations; measured Estergleichgewicht |
| solubility-product | 11 | 12 | extend | ea | official | KL, heterogeneous equilibrium |
| organic-intro | 10 | 10 | develop | | typical | Methan, Heptan, Ethen, Ethanol, Propanal, Propanon, Ethansäure, Ethansäureethylester |
| hydrocarbons | 10 | 10 | develop | | typical | Alkanes and alkenes; substitution and addition; alkynes not named |
| crude-oil-fuels | 10 | 10 | intro | | typical | Benzin; Erdöl, fractional distillation and cracking in the Beispielcurricula |
| homologous-series | 10 | 10 | develop | | typical | "homologe Reihe der Alkane und Alkanole" |
| functional-groups | 10 | 10 | develop | | typical | Hydroxy, Aldehyd, Keto, Carboxy, Ester; C=C |
| functional-groups | 11 | 12 | develop | ga | official | Carbonyl and amino groups in Naturstoffe |
| functional-groups | 11 | 12 | develop | ea | official | Carbonyl, amino, ester groups in Naturstoffe and Kunststoffe |
| oxygen-organics | 10 | 10 | develop | | typical | Alkanole, Alkanale, Alkanone, Alkansäuren, Ester; esterification; oxidation series |
| oxygen-organics | 11 | 12 | develop | ga | official | Ester equilibrium; fats as esters |
| oxygen-organics | 11 | 12 | extend | ea | official | Esterification as a reversible reaction with mechanism; Halbacetal/Acetal |
| nitrogen-organics | 11 | 12 | intro | ga | official | Only the amino group of amino acids and the peptide bond |
| nitrogen-organics | 11 | 12 | intro | ea | official | L-α-amino acids, peptide bond formation and hydrolysis; no amines as a class |
| aromatic-compounds | 11 | 12 | extend | ea | official | Benzene: Kekulé, delocalisation, Mesomeriestabilisierung, SE |
| isomerism | 10 | 10 | develop | | typical | Not a V2 standard; taught with alkanes (Beispielcurriculum 1) |
| optical-isomerism | 11 | 12 | develop | ga | official | Chiralität, Fischer and Haworth projections (3.3.3 (3)) |
| optical-isomerism | 11 | 12 | extend | ea | official | Asymmetric C atom, Fischer projection, D/L |
| organic-reaction-types | 10 | 10 | develop | | typical | Substitution, addition, condensation (esterification), oxidation |
| organic-reaction-types | 11 | 12 | extend | ea | official | Compare SE, SN, SR; polymerisation, polycondensation, polyaddition |
| reaction-mechanisms | 10 | 10 | develop | | typical | Radical substitution, alkane + halogen (V2 3.2.2.1 (10)) |
| reaction-mechanisms | 11 | 12 | intro | ga | official | Electrophilic addition, only to explain the unsaturated-fat test |
| reaction-mechanisms | 11 | 12 | extend | ea | official | EA, SE (Arenium-Ion), esterification (Carbokation, nucleophiler Angriff), radical polymerisation; SN named only in the comparison |
| polymers-intro | 10 | 10 | intro | | typical | "Aufbauprinzip von Polymeren an einem Beispiel" |
| polymers-intro | 11 | 12 | develop | ga | official | Thermoplaste, Duromere, Elastomere and their structures |
| polymers-intro | 11 | 12 | extend | ea | official | + degree of cross-linking, crystalline and amorphous regions, processing |
| addition-polymerisation | 11 | 12 | develop | ga | official | Principle of Polymerisation |
| addition-polymerisation | 11 | 12 | extend | ea | official | Radical polymerisation mechanism; PE, PP, PVC, PS |
| condensation-polymerisation | 11 | 12 | develop | ga | official | Principle of Polykondensation |
| condensation-polymerisation | 11 | 12 | extend | ea | official | Polyester, polyamide, PLA; plus Polyaddition (polyurethane) |
| plastics-and-recycling | 11 | 12 | develop | ga | official | Werkstoff-/Rohstoffrecycling, energetische Verwertung, Kompostierung |
| plastics-and-recycling | 11 | 12 | develop | ea | official | Same, plus renewable feedstocks |
| alloys | 8 | 8 | intro | | typical | "Legierung" as a class of mixture |
| materials | 8 | 9 | intro | | typical | Nanoparticles; surface-to-volume ratio (V2 3.2.1.1 (7), 3.2.1.2 (4)) |
| materials | 11 | 12 | extend | ea | official | Nanomaterials, lotus effect (3.4.8 (2)–(3)) |
| materials | 8 | 10 | develop | nwt | official | NwT 3.2.3.1: properties and suitability of materials |
| food-molecules | 11 | 12 | develop | ga | official | Fats, carbohydrates, proteins: tests and functions |
| food-molecules | 11 | 12 | extend | ea | official | Fats vs carbohydrates as energy stores |
| carbohydrates | 11 | 12 | develop | ga | official | Monosaccharides, Fischer/Haworth, disaccharides |
| carbohydrates | 11 | 12 | extend | ea | official | Aldose/ketose, Halbacetal, α/β, glycosidic bond, starch, cellulose, reducing sugars |
| lipids | 11 | 12 | develop | ga | official | Fat structure; saturated and unsaturated fatty acids; soaps not named |
| lipids | 11 | 12 | develop | ea | official | + hydrophobic/lipophilic, consistency, addition of halogens |
| amino-acids-proteins | 11 | 12 | develop | ga | official | Amino acids, dipeptide, Biuret |
| amino-acids-proteins | 11 | 12 | extend | ea | official | Primary to quaternary structure, denaturation, Ninhydrin |
| nucleic-acids | 11 | 12 | intro | ga | official | Classify and name functions only; not in the Leistungsfach |
| photosynthesis-respiration | 10 | 10 | intro | | typical | Carbon cycle in living nature (3.2.2.1 (12)) |
| gas-tests | 8 | 8 | develop | | typical | O₂, CO₂, H₂, water |
| ion-tests | 8 | 10 | develop | | official | Oxonium, hydroxide, bromide, chloride |
| ion-tests | 11 | 12 | develop | ga | official | Carbonate, ammonium, oxonium, hydroxide via acid–base |
| ion-tests | 11 | 12 | develop | ea | official | Ammonium, carbonate |
| functional-group-tests | 10 | 10 | develop | | typical | C=C and aldehyde group; test names not given (Bromwasser in Beispielcurriculum 1) |
| functional-group-tests | 11 | 12 | develop | ga | official | Unsaturated fatty acids, GOD, Benedict, Biuret |
| functional-group-tests | 11 | 12 | extend | ea | official | Benedict or Tollens (reducing sugars), Ninhydrin, Biuret, GOD |
| chromatography | 11 | 12 | extend | ea | official | TLC of universal indicator, Rf |
| titration | 9 | 10 | develop | | typical | Acid–base titration (neutralisation) |
| titration | 11 | 12 | extend | ea | official | Curves, equivalence and half-equivalence points, polyprotic acids, conductometry, iodometry |
| air-oxygen-hydrogen | 8 | 8 | develop | | typical | Composition of air; properties of O₂ and H₂ |
| water-chemistry | 9 | 9 | develop | | typical | Density anomaly, high boiling point, hydrogen bonds |
| inorganic-compound-classes | 8 | 9 | intro | | typical | Metall, Nichtmetall, Salz; acidic and alkaline solutions |
| non-metals-chemistry | 8 | 8 | intro | | typical | N₂, O₂, H₂, Cl₂, S, C in reactions |
| metals-chemistry | 8 | 8 | intro | | typical | Fe, Cu, Ag, Mg, Na |
| transition-metals | 11 | 12 | extend | ea | official | Koordinative Bindung in tests; Komplexverbindungen optional (3.4.8 (4)) |
| atmosphere-climate | 8 | 10 | develop | | official | Air and global CO₂ effects; carbon cycle |
| chemical-safety | 8 | 8 | develop | | typical | Gefahrenpiktogramme; ethanol dangers |
| chemical-safety | 11 | 12 | develop | ea | official | Exposure–risk relation (aromatics) |
| resources-sustainability | 8 | 8 | intro | | typical | From raw material to product |
| resources-sustainability | 11 | 12 | develop | ga | official | Plastics evaluation and recycling |
| resources-sustainability | 11 | 12 | develop | ea | official | Renewable feedstocks (carbohydrates, plastics) |
| resources-sustainability | 8 | 10 | develop | nwt | official | NwT 3.2.3.4 Stoffströme und Stoffkreisläufe |
| fuels-energy | 10 | 10 | develop | | typical | CO₂ balance and Reaktionsenergie of H₂, CH₄, petrol |
| fuels-energy | 11 | 12 | develop | ga | official | Brennwert, Heizwert, fuel cell, alternative energy carriers |
| fuels-energy | 11 | 12 | develop | ea | official | Brennwert, Heizwert, fuel cells, batteries |
| fuels-energy | 8 | 10 | develop | nwt | official | NwT 3.2.2.2 Energieversorgungssysteme |
| industrial-processes | 8 | 8 | intro | | typical | Industrial production (Kochsalz, Eisen, Kupfer, Benzin) |
| industrial-processes | 11 | 12 | develop | ga | official | Haber–Bosch |
| industrial-processes | 11 | 12 | develop | ea | official | Haber–Bosch |
| industrial-processes | 8 | 10 | develop | nwt | official | NwT 3.2.3.4: a chemical-technical process, e.g. bioethanol |
| metal-extraction | 8 | 8 | intro | | typical | Eisen or Kupfer as an example of production |
| lab-safety | 8 | 8 | develop | | typical | Gefahrenpiktogramme; safe experimenting |
| units-and-conversions | 8 | 10 | develop | | official | "Größen und Einheiten korrekt nutzen" |
| chemical-calculations | 11 | 12 | develop | ga | official | Hess, pH, E°cell |
| chemical-calculations | 11 | 12 | extend | ea | official | Gibbs–Helmholtz, Kc and equilibrium concentrations, KL, weak-acid pH, HH, Nernst |
| graphs-and-data | 8 | 10 | develop | | official | Process standard: tables and diagrams |
| particle-diagrams | 8 | 8 | develop | | typical | Particle-model drawings |
| macro-micro-symbolic | 8 | 10 | develop | | official | Stoff- vs Teilchenebene (stated principle) |
| molecular-models | 9 | 9 | develop | | typical | EPA model; spatial representation |
| structural-formulas | 10 | 10 | develop | | typical | Structural formulas of organic molecules |
| structural-formulas | 11 | 12 | develop | ga | official | Fischer and Haworth |
| structural-formulas | 11 | 12 | extend | ea | official | Fischer ↔ Haworth; polymer repeat units |
| reference-tables | 8 | 10 | develop | | official | Periodic table as an information source |
| scientific-method | 8 | 10 | develop | | official | Process standards: Erkenntnisgewinnung |
| evaluating-experiments | 8 | 10 | develop | | official | Process standards |
| scientific-communication | 8 | 10 | develop | | official | Process standards: Kommunikation, protocols |
| nature-of-science | 9 | 9 | develop | | typical | Rutherford, Mendelejew; models |
| nature-of-science | 11 | 12 | extend | ea | official | History of science (3.4.8) |
| socio-scientific-issues | 8 | 10 | develop | | official | Process standards: Bewertung |

**Not placed (absent from the V2 plan):**
- heat-and-temperature, gas-pressure, gas-laws, ideal-gas-equation, kinetic-molecular-theory (these are in Physik)
- atomic-spectra, lattice-energy, bond-energies, ionic-equations, limiting-reagent, yield-and-atom-economy, solubility-rules
- reactions-of-acids (no standard), salt-hydrolysis
- rate-laws, maxwell-boltzmann
- geometric-isomerism (in V3.0 only, see §8.3)
- reaction-pathways, spectrophotometry, ir-nmr-ms, pollution, water-treatment
- measurement-technique, preparing-solutions, preparing-substances, organic-synthesis-techniques, significant-figures-uncertainty
- all of nuclear

**coveredAreas:**
- All areas **except `nuclear`**: radioactivity is not in the Chemie plan (it belongs to Physik).
- `gases` is covered, but only molar volume appears: the gas laws are Physik. Recommend listing `gases` as covered so that absences read as "not taught in Chemie".
- If you prefer to limit the claim to what was swept exhaustively, use `['organic', 'energetics', 'kinetics', 'equilibrium', 'acids-bases', 'redox', 'polymers-materials', 'biochemistry', 'bonding', 'nomenclature']`. The other areas were placed from the full standard lists too, so all but nuclear is defensible.

**outsideRange suggestions:**
- "Kl. 5/6: G8 cohorts had chemistry basics in the integrated BNT (not researched). G9 cohorts (from 2025/26) have Biologie instead."
- "Kl. 13 exists in 2026/27 only at the 44 G9-Modellschulen."

**change suggestions:**
- **stability:** `moderate`, because the G9 transition runs until 2033.
- **lastMajorRevision:** 2016, Bildungsplan 2016 (with V2 in 2022).
- **upcoming:**
  - `{ when: '2027-08', what: 'Chemie V3.0 (G9) starts in Kl. 8, then rises one year at a time', status: 'adopted' }`
  - `{ when: '2030-08', what: 'Compulsory Kl. 11 with organic chemistry for all (V3.0)', status: 'adopted' }`
  - `{ when: '2031-08', what: 'Kursstufe moves to Kl. 12/13 with unchanged content; no regular Abitur 2032', status: 'adopted' }`
  - `{ when: '2033', what: 'First G9 Abitur', status: 'adopted' }`
- **recheckBy:** `2027-09-30`.

### 8.3 Planned placements (V3.0 / G9; status `planned`)

Only the rows that differ from §8.2. Kl. 11 is compulsory for all G9 students, so the track is blank. The Kursstufe rows of §8.2 apply unchanged, one year later (12–13), from 2031/32.

| concept id | from | to | depth | track | status | note |
|---|---|---|---|---|---|---|
| organic-intro | 11 | 11 | develop | | planned | V3.0 3.2.2.1 (1)–(3); from 2030/31 |
| hydrocarbons | 11 | 11 | develop | | planned | Alkanes, alkenes; SR and addition |
| crude-oil-fuels | 11 | 11 | intro | | planned | "Gewinnung organischer Stoffe (… fossile Brennstoffe …)" |
| homologous-series | 11 | 11 | develop | | planned | Alkanes and alkanols |
| functional-groups | 11 | 11 | develop | | planned | + "Aminogruppe in Aminosäuren" |
| oxygen-organics | 11 | 11 | develop | | planned | Stepwise oxidation alkane → alkanol → alkanal/alkanone → alkanoic acid; esterification |
| nitrogen-organics | 11 | 11 | intro | | planned | Amino group in amino acids only |
| isomerism | 11 | 11 | develop | | planned | "Strukturisomerie" (now official in V3.0) |
| geometric-isomerism | 11 | 11 | develop | | planned | "cis-trans-Isomerie"; E/Z not used |
| organic-nomenclature | 11 | 11 | develop | | planned | + Halogenkohlenwasserstoffe, simple multifunctional molecules |
| organic-reaction-types | 11 | 11 | develop | | planned | Substitution, addition, condensation (esterification) |
| reaction-mechanisms | 11 | 11 | develop | | planned | Radical substitution |
| oxidation-states | 11 | 11 | develop | | planned | In the oxidation series; no longer in the 8–10 band |
| functional-group-tests | 11 | 11 | develop | | planned | C=C and aldehyde group |
| intermolecular-forces | 11 | 11 | develop | | planned | Applied to organic molecules (3.2.2.3) |
| polymers-intro | 11 | 11 | intro | | planned | "Polyethen oder Polyester" |
| fuels-energy | 11 | 11 | develop | | planned | CO₂ balance and Reaktionsenergie of fuels |
| empirical-formula | 11 | 11 | develop | | planned | "Summenformel mithilfe des molaren Volumens experimentell ermitteln" |
| molar-gas-volume | 11 | 11 | develop | | planned | Removed from the 8–10 list; used experimentally in Kl. 11 |
| titration | 11 | 11 | develop | | planned | Titration of a carboxylic acid |
| structural-formulas | 11 | 11 | develop | | planned | Structural formulas in the oxidation series |
| rate-factors | 8 | 10 | intro | | planned | Zerteilungsgrad **and temperature** (V3.0 3.1.3.1 (8)); from 2027/28 |
| lab-safety | 8 | 10 | develop | | planned | New unit 3.1.1: Gasbrenner, Gefahrenpiktogramme |
| inorganic-nomenclature | 12 | 13 | extend | ea | planned | LF 3.4.7 (3) adds "Nomenklatur von Salzen" |

V3.0 also **removes** the Sek I nanoparticle standards (`materials` 8–9) and the ethanol-dangers standard (`chemical-safety` note). In the V3.0 world the V2 Kl. 10 organic rows of §8.2 disappear. They are replaced by the Kl. 11 rows above.
