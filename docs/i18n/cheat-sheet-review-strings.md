# Cheat sheet translations to review

**For:** a native speaker of German, French, Spanish, Italian or Russian, ideally
one who teaches or studied chemistry. You only need your own language's section.

**What this is:** every piece of cheat-sheet text that was written or changed during
the cheat sheet review of 24–25 September 2026. That covers the whole review: the example cards, the science fixes on all 15
sheets, the owner's decisions (helium, tritium, the molar-volume row), and all 19
diagrams (their labels, in a table at the top of each language, and their
descriptions for screen readers). New short sections were added to *States of
Matter*, *Acids & Bases* and *Naming Inorganic Compounds* to hold diagrams.

The text was written by an AI agent and has **not been checked by a native
speaker**. The agent was told to localise rather than translate: write each
language the way a chemistry teacher in that country would write for their own
students, aged about 14–18, in the informal register (du / tu / tú / tu / ты).

## How to review

For each item you will see:

- the **English** it corresponds to;
- the **new** text in your language;
- the **text before**, where there was an earlier version in the same place. Long
  paragraphs often changed by only one sentence, so comparing the two is the
  quickest way to find the change.

Tick **OK**, or write what is wrong in **Comment**. The things that matter most:

1. **Is the chemistry right** in your language, and is it what a student in your
   country would be taught? (Terms, names of compounds, how group numbers are
   written.)
2. **Does it read naturally** to a teenager, or does it sound translated?
3. **Numbers and typography:** decimal commas, spaces before units and %, quotation
   marks, and in French the spaces before : ; ! ?

The **glossary table** at the top of each language is the list of word choices the
text follows. If a choice is wrong, say so there: fixing the glossary fixes it for
every later step too.

## Choices that were made on purpose (please check these)

These are places where the text deliberately **differs** from the English, not
mistakes.

**All five languages**
- The English "VCE data book" (an Australian exam booklet) is not mentioned. The
  functional-groups sheet points to "an IR table" instead.
- The phenol mistake's "outside VCE scope" was dropped.

**German**
- Group numbers: the site numbers groups 1–18, but German schools also use the
  main groups I–VIII (Hauptgruppen). The bonding sheet gives the 1–18 rule and
  names the "VII. Hauptgruppe" once, as a bridge to the textbook. Three places
  that said "Hauptgruppe 17/16" (mixing the two systems) were corrected.
- "gültige Ziffern" replaces "signifikante Stellen".
- "Schulversuch" for "school lab experiment"; "höchstens in winzigen Spuren" for
  "not in any useful amount".

**French**
- On the ionic-formulas sheet, the English mistake "writing the anion first" was
  removed, because in English the cation is said first. In French the name
  starts with the anion (*chlorure de sodium*), so the point was moved into
  takeaway 2 instead.
- Numbered groups are always *groupe* ("groupe 17"), never *colonne*: the owner's
  decision of 25 September 2026. *Colonne* stays only where a sentence explains that
  a group is a column. This changed the ion-charge rule, the Roman-numeral sentence,
  the Lewis sheet and its table heading ("Électrons de valence par groupe").

**Diagram labels (all five languages)**
- The scale note under the atom diagram says the nucleus is 1/100 000 of the atom's
  **width** (diameter), in the wording each country's textbooks use under a schematic
  drawing: *Nicht maßstabsgetreu*, *Échelle non respectée*, *No está a escala*, *Non in
  scala*, *Масштаб не соблюдён*.
- *Heavier, but first* / *lighter, but second* is phrased the way each language talks
  about a place in the table (*steht aber vorn*, *placé avant*, *va antes*, *viene
  prima*, *стоит первым*).
- **Russian:** the scale note says *в 100 000 раз меньше атома по диаметру* (a ratio,
  as Russian textbooks write it). *Атомный номер* is used, not *порядковый номер*,
  to match the section heading; the glossary rates this medium. Please check.
- *Undecayed nuclei* on the half-life graph uses the quantity each country's physics
  books plot (*noch nicht zerfallene Kerne*, *noyaux non désintégrés*, *núcleos sin
  desintegrar*, *nuclei non ancora decaduti*, *нераспавшиеся ядра*). The time axis
  in German and Russian uses the "quantity in unit" form (*Zeit in Halbwertszeiten*).
- Percent signs: *12,5 %* with a no-break space in de, fr, es and ru; *12,5%* with no
  space in Italian (Italian textbook practice). Please check es and it.
- The hydrogen isotopes also show the traditional names (*Protium, Deuterium,
  Tritium*…). Russian treats протий, дейтерий, тритий as the main names.
- **German:** *2, 8, 1* is kept, although some German textbooks write shells as
  letters (K2 L8 M1). Please check.

**Diagrams added last (please check)**
- **Italian:** the bonding diagram says *elettroni delocalizzati* (the glossary's
  term), while the Italian prose on the same sheet says *elettroni liberi*. One of the
  two should be chosen.
- **German molar volume:** the stoichiometry table gives the Abitur values (24,5 L/mol
  at 25 °C and 1013 hPa; 22,4 L/mol at 0 °C), not the Australian 24,8.
- **Naming flowchart:** each language's example names follow its own naming rules
  (German *Salzsäure*, Russian *оксид серы(IV)*, anion first in fr/es/it/ru).

**Spanish**
- "4.5 billion years" is *4500 millones de años*: Spanish *billón* means 10¹².
- Same anion-first point as French.
- The "teacher may call these shells" sentence avoids a gendered word for teacher:
  "Puede que en clase oigas llamarlos capas".

**Italian**
- Same anion-first point as French.
- "Chi ti insegna" avoids a gendered word for teacher.

**Russian**
- Same anion-first point as French.
- The bonding sheet names the short-table group once ("в короткой таблице это VII
  группа"), since Russian schools still teach from the short table.

## Removed (nothing to review)

These English sentences were deleted in every language, so they no longer appear:
the "extension / the curriculum names neither" remarks on the two atom sheets, the
relative-atomic-mass takeaway and both mistakes on the isotopes sheet, the
"anion first" mistake on the ionic-formulas sheet (see above), and two repeated
mistakes on the formula-mass sheet.

---

## German (de): 96 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-de.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 Jahre*. A no-break space groups from five digits on (*65 000*), which is how the sheets already write it. DIN 5008 allows either for four digits; unseparated matches the isotopes prose. |
| universal indicator | **Universalindikator** | One word, as on the bottle in a German school lab. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| pH scale | **pH-Skala** | Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| the pH scale's everyday examples (diagram labels) | **Magensäure** (1), **Essig** (3), **reines Wasser** (7), **Natron** (8), **Backofenreiniger** (13) | The words the sheet's own pH table uses, each at the same pH band as the English. *Natron*, not *Backpulver*: see *baking soda* below. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| particle (the particle model) | **Teilchen** (*Teilchenmodell*) | The school word; *Partikel* is the register of dust and physics papers. Added 2026-09-25 for the States of Matter diagrams. The new section is headed *Die Aggregatzustände im Teilchenmodell*, because *Teilchenmodell* is what German teaching calls this picture. |
| melting / boiling (a heating curve's plateaus) | **Schmelzen / Sieden** | Nominalised verbs, as the sheet's table of phase changes already has them. *Sieden*, not *Kochen*, which is the kitchen word. Added 2026-09-25 for the States of Matter diagrams. |
| heating curve | **Erwärmungskurve** | Matches the sheet's section heading. Added 2026-09-25 for the States of Matter diagrams. |
| energy added (a graph's axis) | **zugeführte Energie** | The German physics phrasing, as in *zugeführte Wärme*. *Hinzugefügte Energie* is a calque. Added 2026-09-25 for the States of Matter diagrams. |
| VSEPR shapes: linear, trigonal planar, tetrahedral, trigonal pyramidal, bent | **linear, trigonal-planar, tetraedrisch, trigonal-pyramidal, gewinkelt** | Added 2026-09-25 with the Lewis sheet's shape diagram (`lewis-structures/02-vsepr-shapes`). The terms German school books print, and the ones the sheet's VSEPR paragraph already used, so the drawing and the prose above it agree. *V-förmig* for bent is also seen and is not used. The compounds keep their hyphen (*trigonal-planar*); the diagram never breaks a line at it. Angles take the decimal comma and no space before the degree sign: *109,5°*, *104,5°*. |
| bond angle | **Bindungswinkel** | Added 2026-09-25. |
| wedge / hashed wedge (a bond towards / away from the viewer) | **Keil / gestrichelter Keil** | Added 2026-09-25, for alt text. The drawing convention is the *Keilstrichformel*. |
| lone-pair lobe (in a VSEPR drawing) | **Keule** | Added 2026-09-25, for alt text: *das freie Elektronenpaar ist als Keule gezeichnet*. The word German uses for an orbital's lobe. |
| electron shell (the curriculum's word) | **Schale** / **Elektronenschale** | VC2S10U07 says "electron shells", so the sheet names *Schale* once as the word the reader's teacher will use and keeps *Energiestufe* as its own term. Do not swap one for the other halfway through a sheet. Since 2026-09-25 the sentence credits the word to the teacher alone (*Deine Lehrkraft sagt dazu vielleicht Schalen*); it no longer mentions the Lehrplan. |
| valence electrons from the group number | **die letzte Ziffer der Gruppennummer** (*Cl steht in Gruppe 17: 7 Valenzelektronen*), einmal ergänzt um *das ist die Nummer der Hauptgruppe (VII. Hauptgruppe)* | Added 2026-09-25. The site numbers the groups 1–18, so the old sentence *die Hauptgruppennummer sagt dir, wie viele Valenzelektronen …* was only true in the I–VIII Hauptgruppen system German textbooks also use. The bonding and Lewis sheets now state the 1–18 rule and name the Hauptgruppe once, on the bonding sheet, as the bridge to the textbook. **Never write *Hauptgruppe 17*:** it mixes the two systems. The Lewis table's column is *Gruppe* for the same reason. |
| beta decay | **Betazerfall** | Added 2026-09-25, for how reactors make neptunium and plutonium. Formed like *Betateilchen*; *β-Zerfall* is the same word in symbols and is fine in a formula context. |
| shielding gamma ("reduces, never stops") | **abschwächen**: *Blei oder dicker Beton schwächen sie stark ab* | Added 2026-09-24. Gamma radiation is attenuated, not stopped, and German physics and chemistry books say *abschwächen* for exactly that (*Abschwächung von Gammastrahlung*). Alpha and beta keep *aufhalten*. |
| electron cloud (diagram label) | **Elektronenwolke** | Added 2026-09-25 with the redrawn atom diagrams. The textbook word for the probability picture of the Atomhülle. |
| not to scale (diagram caveat) | **nicht maßstabsgetreu**, and the ratio as **1/100 000 des Atomdurchmessers** | Added 2026-09-25 with the redrawn atom diagrams. Says *Durchmesser* on purpose: "1/100 000 des Atoms" is ambiguous, and by volume the ratio is about 10⁻¹⁵. *100 000-mal kleiner* was rejected: common in class, but it does not say what is being compared. |
| heavier, but first / lighter, but second (06) | **schwerer, steht aber vorn** / **leichter, steht aber dahinter** | Added 2026-09-25 with the redrawn atom diagrams. *steht vorn* is how a German teacher talks about a place in the Periodensystem; a literal *aber zuerst / aber an zweiter Stelle* reads like a race. |
| the counting-model caveat (05) | **Eine Art, Elektronen zu zählen – kein Bild eines Atoms.** | Added 2026-09-25 with the redrawn atom diagrams. A no-break space sits before the dash, so a wrapped line never starts with it. |
| electron arrangement written out | **2, 8, 1** | Added 2026-09-25 with the redrawn atom diagrams. The comma list is kept in a decimal-comma locale: every item is a whole number and a space follows each comma, so it cannot be read as a decimal. **Rated medium**: some German textbooks write the shells as K2 L8 M1; the sheet does not use shell letters anywhere. |
| a cell of the periodic table (alt text) | **Feld** (*das Tellur-Feld*) | Added 2026-09-25 with the redrawn atom diagrams. |
| hydrogen-1, -2, -3 (03) | **Wasserstoff-1**, **Wasserstoff-2**, **Wasserstoff-3** | Added 2026-09-25 with the redrawn isotope diagrams. The mass-number form the sheet already uses for *Kohlenstoff-14*. |
| protium / deuterium / tritium (03) | **Protium** / **Deuterium** / **Tritium** | Added 2026-09-25 with the redrawn isotope diagrams. Printed under the mass-number name, because German textbooks name hydrogen's isotopes this way (*schwerer Wasserstoff* is Deuterium). |
| stable / radioactive, of one isotope (03) | **stabil** / **radioaktiv** | Added 2026-09-25 with the redrawn isotope diagrams. Predicative, so uninflected. |
| undecayed nuclei (07, vertical axis) | **noch nicht zerfallene Kerne** | Added 2026-09-25 with the redrawn isotope diagrams. The quantity German physics plots in the decay law (*Anzahl der noch nicht zerfallenen Kerne N(t)*). Replaces "how much is left", which suggests the sample itself disappears. *Unzerfallene Kerne* is shorter and also used; *noch nicht* says they will. |
| time in half-lives (07, horizontal axis) | **Zeit in Halbwertszeiten** | Added 2026-09-25 with the redrawn isotope diagrams. Localised, not translated: a German axis is labelled *Größe in Einheit*, as in *Zeit t in Halbwertszeiten*, rather than with the bare unit. |
| cross-over method (charges → subscripts) | **Kreuzregel** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). The name German textbooks give the method, and the one the sheet already used. |
| ionic / molecular (the kind of compound, as a label) | **Ionenverbindung / molekularer Stoff** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Nouns, as the German summary of *Naming Inorganic Compounds* already names the three systems (*Ionenverbindungen, molekulare Stoffe, Säuren*). *Molekülverbindung* is also taught; *molekularer Stoff* is the sheet's word and fits the flowchart box. *Salz* was considered for the ionic box: right at this level, but the summary names the system *Ionenverbindungen*, and the box has to match the prose round it. |
| significant figures | **gültige Ziffern** | Added 2026-09-25. The phrase German physics and chemistry lessons use for the rounding rule (*so viele gültige Ziffern wie die ungenaueste Angabe*). *Signifikante Stellen*, which the stoichiometry sheet used before, is understood but reads like a translation. |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet. The IR sentence on the functional-groups sheet now points to *eine IR-Tabelle*, and the polyatomic-ion table is headed *Die wichtigsten mehratomigen Ionen*. The *Tafelwerk* is the German equivalent for most data, but it was not named for IR ranges because not every Tafelwerk prints them. |
| molar gas volume (V_m), reference conditions | **V_m = 24,5 L/mol bei 25 °C und 1013 hPa (bei 0 °C: 22,4 L/mol)**, table cell says **das Volumen eines Gases** (no "bei SLC") | Added 2026-09-25. English "SLC" (standard laboratory conditions, 25 °C / 100 kPa) is the Australian VCE convention and has no German equivalent, so it is dropped rather than translated. German Abitur formula sheets (NRW 2024, Baden-Württemberg 2025, "Festgelegte Bedingungen", p = 101 325 Pa) instead give **two** reference points: V_m = 22,414 L/mol at 273,15 K (0 °C) and 24,466 L/mol at 298,15 K (25 °C), rounded here to 22,4 and 24,5. `cheat-sheets.test.ts` carries a narrow, commented exception for exactly this cell, because the German number now legitimately differs from the English 24,8 L/mol at 100 kPa. |
| a two-pan balance (the relative-mass picture) | **Balkenwaage**, its pans **Waagschalen**; level is **im Gleichgewicht** | *Die Waage steht gerade* is how the sheet's prose says it. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| mole ratio | **Stoffmengenverhältnis** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Already the sheet's word; on the mole map it reads *Stoffmengenverhältnis (Koeffizienten)*. |
| number of particles (N) | **Teilchenzahl** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Pairs with *Teilchen* above. |
| moles of reactant / product (mole-map boxes) | **Stoffmenge des Edukts / des Produkts** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). German says *Stoffmenge*, not "Mol von …", which is a calque. |
| primary / secondary / tertiary alcohol | **primärer / sekundärer / tertiärer Alkohol** | Added 2026-09-25 with the reaction-map diagram. The adjective is declined (*primärer Alkohol*, *primäre Alkohole*), not the English "primary" left as is. |
| catalyst | **Katalysator** | Added 2026-09-25. Written out on the reaction map (*H₃PO₄ als Katalysator*); the textbook abbreviation *Kat.* was not used. |
| skeletal formula | **Skelettformel** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). *Strichformel* is also heard; *Skelettformel* is the textbook term. |
| methyl (group), as a diagram label | **Methylgruppe** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). The German worked example says *eine Methylgruppe*; the bare prefix *Methyl-* is only used inside a name. |

### Diagram labels

Text drawn inside the diagrams. Labels must stay short: they sit in a fixed space. Text in {braces} is filled in with a number.

#### Atoms & the Periodic Table — diagram “What an atom is made of”

| Label | English | German | OK / comment |
|---|---|---|---|
| electronCloud | electron cloud | Elektronenwolke | |
| nucleus | nucleus | Atomkern | |
| proton | proton | Proton | |
| neutron | neutron | Neutron | |
| scale | Not to scale: the nucleus is about 1/100,000 of the atom’s width. | Nicht maßstabsgetreu: Der Kern hat nur etwa 1/100 000 des Atomdurchmessers. | |

#### Atoms & the Periodic Table — diagram “Atomic number and mass number”

| Label | English | German | OK / comment |
|---|---|---|---|
| massNumber | mass number = protons + neutrons | Massenzahl = Protonen + Neutronen | |
| atomicNumber | atomic number = protons | Ordnungszahl = Protonen | |
| subtraction | {mass} − {atomic} = {neutrons} neutrons | {mass} − {atomic} = {neutrons} Neutronen | |

#### Atoms & the Periodic Table — diagram “Electrons, energy levels…” (sodium)

| Label | English | German | OK / comment |
|---|---|---|---|
| outerLevel | outer level | äußerste Stufe | |
| arrangement | {first}, {second}, {third} | {first}, {second}, {third} | |
| electrons | {count} electrons | {count} Elektronen | |
| countNote | A way to count electrons, not a picture of an atom. | Eine Art, Elektronen zu zählen – kein Bild eines Atoms. | |

#### Atoms & the Periodic Table — diagram “Ordered by atomic number”

| Label | English | German | OK / comment |
|---|---|---|---|
| atomicNumber | atomic number | Ordnungszahl | |
| relativeAtomicMass | relative atomic mass | relative Atommasse | |
| telluriumName | Tellurium | Tellur | |
| telluriumMass | 127.60 | 127,60 | |
| telluriumRank | heavier, but first | schwerer, steht aber vorn | |
| iodineName | Iodine | Iod | |
| iodineMass | 126.90 | 126,90 | |
| iodineRank | lighter, but second | leichter, steht aber dahinter | |

#### Isotopes & Radioactivity — diagram “Isotopes” (hydrogen)

| Label | English | German | OK / comment |
|---|---|---|---|
| proton | proton | Proton | |
| neutron | neutron | Neutron | |
| electron | electron | Elektron | |
| isotopeName | hydrogen-{mass} | Wasserstoff-{mass} | |
| protium | protium | Protium | |
| deuterium | deuterium | Deuterium | |
| tritium | tritium | Tritium | |
| stable | stable | stabil | |
| radioactive | radioactive | radioaktiv | |

#### Isotopes & Radioactivity — diagram “Half-life”

| Label | English | German | OK / comment |
|---|---|---|---|
| axisAmount | undecayed nuclei | noch nicht zerfallene Kerne | |
| axisTime | time, in half-lives | Zeit in Halbwertszeiten | |
| percent0 | 100% | 100 % | |
| percent1 | 50% | 50 % | |
| percent2 | 25% | 25 % | |
| percent3 | 12.5% | 12,5 % | |
| percent4 | 6.25% | 6,25 % | |

#### Diagram states-of-matter/01-particles-in-each-state

| Label | English | German | OK / comment |
|---|---|---|---|
| solid | solid | fest | |
| liquid | liquid | flüssig | |
| gas | gas | gasförmig | |

#### Diagram states-of-matter/02-heating-curve

| Label | English | German | OK / comment |
|---|---|---|---|
| axisTemperature | temperature | Temperatur | |
| axisEnergy | energy added | zugeführte Energie | |
| degrees | {t} °C | {t} °C | |
| melting | melting | Schmelzen | |
| boiling | boiling | Sieden | |
| solid | solid | fest | |
| liquid | liquid | flüssig | |
| gas | gas | gasförmig | |

#### Diagram lewis-structures/01-lewis-structures

| Label | English | German | OK / comment |
|---|---|---|---|
| lonePair | lone pair | freies Elektronenpaar | |
| sharedPair | shared pair | bindendes Elektronenpaar | |
| water | H₂O | H₂O | |
| ammonia | NH₃ | NH₃ | |
| carbonDioxide | CO₂ | CO₂ | |
| methane | CH₄ | CH₄ | |

#### Diagram lewis-structures/02-vsepr-shapes

| Label | English | German | OK / comment |
|---|---|---|---|
| carbonDioxide | CO₂ | CO₂ | |
| boronTrifluoride | BF₃ | BF₃ | |
| methane | CH₄ | CH₄ | |
| ammonia | NH₃ | NH₃ | |
| water | H₂O | H₂O | |
| linear | linear, 180° | linear, 180° | |
| trigonalPlanar | trigonal planar, 120° | trigonal-planar, 120° | |
| tetrahedral | tetrahedral, 109.5° | tetraedrisch, 109,5° | |
| trigonalPyramidal | trigonal pyramidal, 107° | trigonal-pyramidal, 107° | |
| bent | bent, 104.5° | gewinkelt, 104,5° | |

#### Diagram functional-groups/01-reaction-map

| Label | English | German | OK / comment |
|---|---|---|---|
| alkene | alkene | Alken | |
| haloalkane | haloalkane | Halogenalkan | |
| primaryAlcohol | primary alcohol | primärer Alkohol | |
| secondaryAlcohol | secondary alcohol | sekundärer Alkohol | |
| aldehyde | aldehyde | Aldehyd | |
| ketone | ketone | Keton | |
| carboxylicAcid | carboxylic acid | Carbonsäure | |
| ester | ester | Ester | |
| hydration | H2O, H3PO4 catalyst | H2O, H3PO4 als Katalysator | |
| addition | HX | HX | |
| substitution | OH− (aq) | OH− (aq) | |
| oxidation | Cr2O7 2−/H+ | Cr2O7 2−/H+ | |
| esterification | alcohol, H2SO4 catalyst | Alkohol, H2SO4 als Katalysator | |

#### Diagram relative-formula-mass/01-carbon-hydrogen-balance

| Label | English | German | OK / comment |
|---|---|---|---|
| carbonAtom | carbon atom | Kohlenstoffatom | |
| hydrogenAtoms | hydrogen atoms | Wasserstoffatome | |
| notToScale | Not to scale | Nicht maßstabsgetreu | |

#### Diagram balancing-equations/01-particle-equation

| Label | English | German | OK / comment |
|---|---|---|---|
| reactants | reactants | Edukte | |
| products | products | Produkte | |
| hydrogen | 2H2 | 2H2 | |
| oxygen | O2 | O2 | |
| water | 2H2O | 2H2O | |

#### Diagram chemical-bonds/01-bonding-models

| Label | English | German | OK / comment |
|---|---|---|---|
| ionic | ionic | Ionenbindung | |
| covalent | covalent | Atombindung | |
| metallic | metallic | Metallbindung | |
| sharedPair | shared pair | bindendes Elektronenpaar | |
| delocalised | delocalised electrons | frei bewegliche Elektronen | |

#### Diagram acids-and-bases/01-ph-scale

| Label | English | German | OK / comment |
|---|---|---|---|
| stomachAcid | stomach acid | Magensäure | |
| vinegar | vinegar | Essig | |
| pureWater | pure water | reines Wasser | |
| bakingSoda | baking soda | Natron | |
| ovenCleaner | oven cleaner | Backofenreiniger | |

#### Diagram chemical-formulas/01-cross-over

| Label | English | German | OK / comment |
|---|---|---|---|
| cation | cation | Kation | |
| anion | anion | Anion | |
| cationFormula | Al 3+ | Al 3+ | |
| anionFormula | SO4 2− | SO4 2− | |
| formula | Al2(SO4)3 | Al2(SO4)3 | |
| positive | {count} × (+{charge}) = +{total} | {count} × (+{charge}) = +{total} | |
| negative | {count} × (−{charge}) = −{total} | {count} × (−{charge}) = −{total} | |

#### Diagram naming-compounds/01-which-system

| Label | English | German | OK / comment |
|---|---|---|---|
| metalNonMetal | metal + non-metal | Metall + Nichtmetall | |
| twoNonMetals | two non-metals | zwei Nichtmetalle | |
| hydrogenInWater | H first, in water | H vorn, in Wasser | |
| ionic | ionic | Ionenverbindung | |
| molecular | molecular | molekularer Stoff | |
| acid | acid | Säure | |
| ionicExample | sodium chloride | Natriumchlorid | |
| molecularExample | sulfur dioxide | Schwefeldioxid | |
| acidExample | hydrochloric acid | Salzsäure | |

#### Diagram stoichiometry/01-mole-map

| Label | English | German | OK / comment |
|---|---|---|---|
| mass | mass | Masse | |
| particles | particles | Teilchenzahl | |
| gasVolume | gas volume | Gasvolumen | |
| solution | solution | Lösung | |
| fromMass | n = m/M | n = m/M | |
| fromParticles | n = N/NA | n = N/NA | |
| fromGasVolume | n = V/Vm | n = V/Vm | |
| fromSolution | n = cV | n = cV | |
| reactantMoles | moles of reactant | Stoffmenge des Edukts | |
| moleRatio | mole ratio (coefficients) | Stoffmengenverhältnis (Koeffizienten) | |
| productMoles | moles of product | Stoffmenge des Produkts | |

#### Diagram organic-nomenclature/01-numbered-chain

| Label | English | German | OK / comment |
|---|---|---|---|
| hydroxyl | OH | OH | |
| methyl | methyl | Methylgruppe | |
| name | {methylAt}-methylpentan-{hydroxylAt}-ol | {methylAt}-Methylpentan-{hydroxylAt}-ol | |

### Atoms & the Periodic Table

**Key takeaway 3**

English:

> Electrons sit in energy levels, and how many are in the outer level decides which group (column) an element is in.

German, new:

> Elektronen sitzen in Energiestufen. Wie viele in der äußersten sitzen, entscheidet, in welcher Gruppe (Spalte) ein Element steht.

German, before:

> Elektronen sitzen in Energiestufen. Wie viele in der äußersten sitzen, danach ist das Periodensystem geordnet.

- [ ] OK   Comment:

**Example card 1 (Cl-35): description**

English:

> 17 protons, 18 neutrons

German, new:

> 17 Protonen, 18 Neutronen

- [ ] OK   Comment:

**Example card 2 (Cl-37): description**

English:

> 17 protons, 20 neutrons

German, new:

> 17 Protonen, 20 Neutronen

- [ ] OK   Comment:

**Example card 3 (H+): description**

English:

> a hydrogen atom that has lost its one electron — a bare proton

German, new:

> ein Wasserstoffatom, das sein einziges Elektron abgegeben hat – also nur noch ein Proton

- [ ] OK   Comment:

**Diagram description (alt text) in section “What an atom is made of”**

English:

> An atom: a nucleus of three protons (filled circles) and four neutrons (hollow circles), with an electron cloud around it that is densest right next to the nucleus and thins out, with no edge, further away. Three protons and four neutrons would make it lithium-7, but the picture stands for any atom. Labels name the electron cloud, the nucleus, a proton and a neutron. A note says it is not to scale: the nucleus is about 1/100,000 of the atom’s width.

German, new:

> Ein Atom: ein Kern aus drei Protonen (gefüllte Kreise) und vier Neutronen (hohle Kreise), darum eine Elektronenwolke, die direkt am Kern am dichtesten ist und nach außen ohne Rand immer dünner wird. Mit drei Protonen und vier Neutronen wäre es Lithium-7, die Abbildung steht aber für jedes Atom. Beschriftet sind die Elektronenwolke, der Atomkern, ein Proton und ein Neutron. Ein Hinweis sagt, dass nichts maßstabsgetreu ist: Der Kern hat nur etwa 1/100 000 des Atomdurchmessers.

German, before:

> Ein Kern aus Protonen und Neutronen in der Mitte, darum eine unscharfe Wolke, die zeigt, wo Elektronen wahrscheinlich sind. Ein Hinweis sagt, dass der Kern viel zu groß gezeichnet ist, um überhaupt sichtbar zu sein.

- [ ] OK   Comment:

**Paragraph of section “Atomic number and mass number”**

English:

> The atomic number is the number of protons, and it is what makes an atom that element. Every chlorine atom has 17 protons; anything with 17 protons is chlorine. The mass number is protons plus neutrons. Neutrons can vary without changing which element it is.

German, new:

> Die Ordnungszahl ist die Zahl der Protonen, und sie macht ein Atom zu diesem Element. Jedes Chloratom hat 17 Protonen; alles mit 17 Protonen ist Chlor. Die Massenzahl ist Protonen plus Neutronen. Die Zahl der Neutronen kann sich ändern, ohne dass sich das Element ändert.

German, before:

> Die Ordnungszahl ist die Zahl der Protonen, und sie macht ein Atom zu diesem Element. Jedes Chloratom hat 17 Protonen; alles mit 17 Protonen ist Chlor. Die Massenzahl ist Protonen plus Neutronen. Die Zahl der Neutronen kann sich ändern, ohne dass sich das Element ändert. Beide Begriffe sind hier eine Erweiterung: Der Lehrplan dieser Jahrgänge nennt keinen von beiden, und ohne sie kannst du kein Feld im Periodensystem lesen.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Atomic number and mass number”**

English:

> The symbol for chlorine-35: the mass number 35 above the atomic number 17, to the left of Cl. A line joins the 35 to “mass number = protons + neutrons” and another joins the 17 to “atomic number = protons”. Underneath: 35 − 17 = 18 neutrons.

German, new:

> Das Symbol für Chlor-35: die Massenzahl 35 über der Ordnungszahl 17, links neben Cl. Eine Linie verbindet die 35 mit „Massenzahl = Protonen + Neutronen“, eine zweite die 17 mit „Ordnungszahl = Protonen“. Darunter steht 35 − 17 = 18 Neutronen.

German, before:

> Das Symbol für Chlor-35 mit der Massenzahl 35 über der Ordnungszahl 17, dazu Pfeile: 17 Protonen, und 35 minus 17 ergibt 18 Neutronen.

- [ ] OK   Comment:

**Paragraph of section “Electrons, energy levels and the shape of the table”**

English:

> Electrons occupy energy levels around the nucleus. The first holds up to 2, the next up to 8, then 8 again for the first twenty elements. Your teacher may call these shells; it means the same thing. Counting electrons this way is called the Bohr model: it is useful, and it is not a picture of a real atom. The number in the outer level sets how an atom reacts. Elements are placed in the same group when they have the same outer count, which is why a group behaves alike.

German, new:

> Elektronen besetzen Energiestufen um den Kern. Die erste fasst bis zu 2, die nächste bis zu 8, dann wieder 8 bei den ersten zwanzig Elementen. Deine Lehrkraft sagt dazu vielleicht Schalen – gemeint ist dasselbe. Elektronen so zu zählen heißt bohrsches Atommodell: nützlich, und kein Bild eines echten Atoms. Wie viele in der äußersten Stufe sitzen, bestimmt, wie ein Atom reagiert. Elemente stehen in derselben Gruppe, wenn sie außen gleich viele haben. Deshalb verhält sich eine Gruppe ähnlich.

German, before:

> Elektronen besetzen Energiestufen um den Kern. Die erste fasst bis zu 2, die nächste bis zu 8, dann wieder 8 bei den ersten zwanzig Elementen. Deine Lehrkraft und der Lehrplan sagen dazu vielleicht Schalen – gemeint ist dasselbe. Elektronen so zu zählen heißt bohrsches Atommodell: nützlich, und kein Bild eines echten Atoms. Wie viele in der äußersten Stufe sitzen, bestimmt, wie ein Atom reagiert. Elemente stehen in derselben Gruppe, wenn sie außen gleich viele haben. Deshalb verhält sich eine Gruppe ähnlich.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Electrons, energy levels and the shape of the table”**

English:

> Sodium, Na, drawn as a model for counting electrons: a disc marked Na for the nucleus, inside three bands with visible edges that hold 2, 8 and 1 electrons at irregular angles. The single electron in the outer band is circled and labelled “outer level”. Below, the arrangement 2, 8, 1 and the total, 11 electrons. A note says it is a way to count electrons, not a picture of an atom.

German, new:

> Natrium als Zählmodell: eine Scheibe mit der Aufschrift Na als Kern, darum drei Bänder mit sichtbarem Rand, in denen 2, 8 und 1 Elektronen in unregelmäßigen Winkeln sitzen. Das einzelne Elektron im äußersten Band ist eingekreist und mit „äußerste Stufe“ beschriftet. Darunter die Anordnung 2, 8, 1 und die Summe, 11 Elektronen. Ein Hinweis sagt, dass es eine Art ist, Elektronen zu zählen, und kein Bild eines Atoms.

German, before:

> Ein Natriumkern aus 11 Protonen und 12 Neutronen, darum drei weiche Bänder mit 2, 8 und 1 Elektronen, gezeichnet als Punkte in unregelmäßigen Winkeln und nicht als Punkte auf Kreisbahnen. Daneben die Anordnung 2, 8, 1 mit der äußersten Stufe zuletzt. Die Abbildung sagt selbst, dass sie eine Art ist, Elektronen zu zählen, und kein Bild eines Atoms, und dass der Kern etwa 100 000-mal zu groß gezeichnet ist.

- [ ] OK   Comment:

**Paragraph of section “Groups and periods”**

English:

> A group is a column of the table and a period is a row. Elements in one group have the same number of electrons in their outer level, so the column predicts how an element reacts. Group 1 is the alkali metals, group 17 the halogens and group 18 the noble gases. A period tells you how many energy levels are in use: an element in period 3 uses three of them. So atoms get bigger as you go down to a new row.

German, new:

> Eine Gruppe ist eine Spalte des Periodensystems, eine Periode eine Zeile. Elemente einer Gruppe haben gleich viele Elektronen in der äußersten Stufe. Die Spalte sagt dir also vorher, wie ein Element reagiert. Gruppe 1 sind die Alkalimetalle, Gruppe 17 die Halogene und Gruppe 18 die Edelgase. Die Periode sagt, wie viele Energiestufen benutzt werden: Ein Element der 3. Periode benutzt drei davon. Mit jeder neuen Zeile nach unten werden die Atome deshalb größer.

German, before:

> Eine Gruppe ist eine Spalte des Periodensystems, eine Periode eine Zeile. Elemente einer Gruppe haben gleich viele Elektronen in der äußersten Stufe. Die Spalte sagt dir also vorher, wie ein Element reagiert. Gruppe 1 sind die Alkalimetalle, Gruppe 17 die Halogene und Gruppe 18 die Edelgase. Die Periode sagt, wie viele Energiestufen benutzt werden: Ein Element der 3. Periode benutzt drei davon. Die Zeile sagt dir damit ungefähr, wie groß das Atom ist.

- [ ] OK   Comment:

**Paragraph of section “Metals and non-metals”**

English:

> Metals fill the left and the middle of the table, and non-metals sit in the top right corner. A metal conducts electricity and heat, has a shiny surface, and can be hammered into a sheet without shattering. Almost every metal is solid at room temperature; mercury is the liquid one. A non-metal is usually a poor conductor, dull, and brittle if it is solid at all. Many non-metals are gases. A few elements along the staircase between the two, such as silicon, behave partly like each. They are called metalloids.

German, new:

> Metalle füllen die linke Seite und die Mitte des Periodensystems, Nichtmetalle stehen oben rechts. Ein Metall leitet Strom und Wärme, hat eine glänzende Oberfläche und lässt sich zu einem Blech hämmern, ohne zu zerspringen. Fast jedes Metall ist bei Raumtemperatur fest; Quecksilber ist das flüssige. Ein Nichtmetall leitet meist schlecht, ist matt und zerbricht, wenn es überhaupt fest ist. Viele Nichtmetalle sind Gase. Ein paar Elemente auf der Treppe dazwischen, zum Beispiel Silicium, verhalten sich teils wie das eine und teils wie das andere. Man nennt sie Halbmetalle.

German, before:

> Metalle füllen die linke Seite und die Mitte des Periodensystems, Nichtmetalle stehen oben rechts. Ein Metall leitet Strom und Wärme, hat eine glänzende Oberfläche und lässt sich zu einem Blech hämmern, ohne zu zerspringen. Fast jedes Metall ist bei Raumtemperatur fest; Quecksilber ist das flüssige. Ein Nichtmetall leitet meist schlecht, ist matt und zerbricht, wenn es überhaupt fest ist. Viele Nichtmetalle sind Gase. Erweiterung: Ein paar Elemente auf der Treppe dazwischen, zum Beispiel Silicium, verhalten sich teils wie das eine und teils wie das andere. Man nennt sie Halbmetalle – ein Wort, das im Lehrplan nicht vorkommt.

- [ ] OK   Comment:

**Paragraph of section “Reactivity, and why a group behaves alike”**

English:

> You can test a group by reacting its elements with oxygen, water and acids, and they behave the same way as each other. Group 1 metals react with water and get more violent down the group: lithium fizzes, sodium darts about, potassium catches fire. The same metals with an acid give off hydrogen faster still, which is far too violent to try in a school lab. Group 17 elements run the other way and get less reactive down the group. Group 18 already has a full outer level, so the noble gases react with almost nothing.

German, new:

> Du kannst eine Gruppe prüfen, indem du ihre Elemente mit Sauerstoff, Wasser und Säuren reagieren lässt. Untereinander verhalten sie sich gleich. Die Metalle der Gruppe 1 reagieren mit Wasser und werden nach unten heftiger: Lithium zischt, Natrium flitzt herum, Kalium fängt Feuer. Dieselben Metalle geben mit einer Säure Wasserstoff ab, und das noch schneller – viel zu heftig für einen Schulversuch. Die Elemente der Gruppe 17 laufen andersherum und werden nach unten reaktionsträger. Gruppe 18 hat die äußerste Stufe schon voll, deshalb reagieren die Edelgase mit fast nichts.

German, before:

> Du kannst eine Gruppe prüfen, indem du ihre Elemente mit Sauerstoff, Wasser und Säuren reagieren lässt. Untereinander verhalten sie sich gleich. Die Metalle der Gruppe 1 reagieren mit Wasser und werden nach unten heftiger: Lithium zischt, Natrium flitzt herum, Kalium fängt Feuer. Dieselben Metalle geben mit einer Säure Wasserstoff ab, und das noch schneller. Die Elemente der Gruppe 17 laufen andersherum und werden nach unten reaktionsträger. Gruppe 18 hat die äußerste Stufe schon voll, deshalb reagieren die Edelgase mit fast nichts.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Ordered by atomic number, not by mass”**

English:

> Two periodic-table cells side by side, with an arrow from the first to the second for the order in the table. Tellurium: atomic number 52, relative atomic mass 127.60, labelled “heavier, but first”. Iodine: atomic number 53, relative atomic mass 126.90, labelled “lighter, but second”. In the tellurium cell the two numbers are labelled atomic number and relative atomic mass.

German, new:

> Zwei Felder des Periodensystems nebeneinander, mit einem Pfeil vom ersten zum zweiten für die Reihenfolge im Periodensystem. Tellur: Ordnungszahl 52, relative Atommasse 127,60, darunter „schwerer, steht aber vorn“. Iod: Ordnungszahl 53, relative Atommasse 126,90, darunter „leichter, steht aber dahinter“. Im Tellur-Feld sind die beiden Zahlen als Ordnungszahl und relative Atommasse beschriftet.

German, before:

> Tellur und Iod nebeneinander. Tellur hat die größere relative Atommasse, aber die kleinere Ordnungszahl, und das Periodensystem stellt es zuerst.

- [ ] OK   Comment:


### Isotopes & Radioactivity

**Example card 1 (H-3): name**

English:

> Hydrogen-3 (tritium)

German, new:

> Wasserstoff-3 (Tritium)

German, before:

> Kohlenstoff-12

- [ ] OK   Comment:

**Example card 1 (H-3): description**

English:

> radioactive: half-life about 12 years

German, new:

> radioaktiv: Halbwertszeit etwa 12 Jahre

- [ ] OK   Comment:

**Example card 2 (Rn-222): description**

English:

> decays by giving out an alpha particle

German, new:

> zerfällt und gibt dabei ein Alphateilchen ab

- [ ] OK   Comment:

**Example card 3 (I-131): description**

English:

> decays by giving out a beta particle

German, new:

> zerfällt und gibt dabei ein Betateilchen ab

- [ ] OK   Comment:

**Example card 4 (Co-60): description**

English:

> gives out beta and gamma radiation — used for its gamma

German, new:

> gibt Beta- und Gammastrahlung ab – genutzt wird die Gammastrahlung

- [ ] OK   Comment:

**Example card 5 (C-14): description**

English:

> half-life about 5730 years

German, new:

> Halbwertszeit etwa 5730 Jahre

- [ ] OK   Comment:

**Example card 6 (U-238): description**

English:

> half-life about 4.5 billion years

German, new:

> Halbwertszeit etwa 4,5 Milliarden Jahre

- [ ] OK   Comment:

**Paragraph of section “The two numbers this sheet needs”**

English:

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put. Why an element's relative atomic mass, such as chlorine's 35.5, is not a whole number is on the Relative Atomic & Formula Mass sheet.

German, new:

> Die Ordnungszahl ist die Zahl der Protonen, und sie legt fest, welches Element es ist. Die Massenzahl ist Protonen plus Neutronen. Auf diesem Spickzettel geht es überall darum, dass sich die zweite Zahl ändert und die erste bleibt. Warum die relative Atommasse eines Elements, zum Beispiel 35,5 bei Chlor, keine ganze Zahl ist, steht im Spickzettel „Relative Atom- und Formelmasse“.

German, before:

> Die Ordnungszahl ist die Zahl der Protonen, und sie legt fest, welches Element es ist. Die Massenzahl ist Protonen plus Neutronen. Auf diesem Spickzettel geht es überall darum, dass sich die zweite Zahl ändert und die erste bleibt. Beide Begriffe sind eine Erweiterung: Der Lehrplan dieser Jahrgänge nennt keinen von beiden, und ohne sie funktioniert hier nichts.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Isotopes”**

English:

> Three hydrogen atoms, one above another. Each has one proton (a filled circle) and one electron in a soft band around the nucleus. Hydrogen-1 (protium) has no neutrons, hydrogen-2 (deuterium) has one and hydrogen-3 (tritium) has two (hollow circles). Hydrogen-1 and hydrogen-2 are labelled stable, and hydrogen-3 radioactive. Labels name the electron, the proton and the neutron.

German, new:

> Drei Wasserstoffatome untereinander. Jedes hat ein Proton (gefüllter Kreis) und ein Elektron in einem unscharfen Bereich um den Kern. Wasserstoff-1 (Protium) hat kein Neutron, Wasserstoff-2 (Deuterium) eines und Wasserstoff-3 (Tritium) zwei (leere Kreise). Wasserstoff-1 und Wasserstoff-2 sind als stabil beschriftet, Wasserstoff-3 als radioaktiv. Beschriftungen benennen Elektron, Proton und Neutron.

German, before:

> Drei Wasserstoffatome nebeneinander: eines mit einem Proton, eines mit einem Proton und einem Neutron, eines mit einem Proton und zwei Neutronen. Alle drei haben ein Elektron.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

German, new:

> Manche Kerne sind instabil. Sie zerfallen von selbst, geben Strahlung ab und lassen ein stabileres Atom zurück. Radon-222 schleudert ein Alphateilchen heraus, also zwei Protonen und zwei Neutronen zusammen. Iod-131 gibt ein Betateilchen ab, also ein schnelles Elektron aus dem Kern. Cobalt-60 gibt Beta- und Gammastrahlung ab und wird wegen der Gammastrahlung eingesetzt. Sie ist Energie statt eines Teilchens. Papier hält Alpha auf, ein Blech aus Aluminium hält Beta auf. Gammastrahlung lässt sich nie ganz aufhalten: Blei oder dicker Beton schwächen sie stark ab.

German, before:

> Manche Kerne sind instabil. Sie zerfallen von selbst, geben Strahlung ab und lassen ein stabileres Atom zurück. Radon-222 schleudert ein Alphateilchen heraus, also zwei Protonen und zwei Neutronen zusammen. Iod-131 gibt ein Betateilchen ab, also ein schnelles Elektron aus dem Kern. Cobalt-60 gibt Gammastrahlung ab, und das ist Energie statt eines Teilchens. Papier hält Alpha auf, ein Blech aus Aluminium hält Beta auf, und für Gamma braucht man Blei oder dicken Beton.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Half-life”**

English:

> A decay curve of undecayed nuclei against time, in half-lives. It falls from 100 per cent to 50, 25, 12.5 and 6.25 per cent at one, two, three and four half-lives, with a dashed line down to the time axis at each point, and keeps falling after the fourth without reaching zero.

German, new:

> Eine Zerfallskurve: die noch nicht zerfallenen Kerne gegen die Zeit in Halbwertszeiten. Sie fällt von 100 Prozent auf 50, 25, 12,5 und 6,25 Prozent nach einer, zwei, drei und vier Halbwertszeiten, mit einer gestrichelten Linie hinunter zur Zeitachse an jedem Punkt, und fällt danach weiter, ohne null zu erreichen.

German, before:

> Eine Zerfallskurve, die von 100 Prozent auf 50, 25 und 12,5 Prozent nach einer, zwei und drei Halbwertszeiten fällt, mit einer gestrichelten Linie hinunter zur Achse an jeder Stelle. Nach drei Halbwertszeiten ist ein Achtel übrig. Eine Halbwertszeit sind 5730 Jahre bei Kohlenstoff-14 und etwa 4,5 Milliarden Jahre bei Uran-238.

- [ ] OK   Comment:

**Paragraph of section “Elements that had to be made”**

English:

> Elements past uranium have no stable isotopes and are not found in nature in any useful amount. The first few, such as plutonium, are made in nuclear reactors: uranium takes in neutrons, and beta decay then turns it into neptunium and plutonium. The heavier ones are built in accelerators by firing one nucleus at another, sometimes a few atoms at a time. Many last less than a second before they decay. Making them is how the bottom rows of the periodic table were filled in.

German, new:

> Elemente nach Uran haben keine stabilen Isotope und kommen in der Natur höchstens in winzigen Spuren vor. Die ersten, zum Beispiel Plutonium, entstehen in Kernreaktoren: Uran fängt dort Neutronen ein, und durch Betazerfall wird daraus erst Neptunium, dann Plutonium. Die schwereren werden in Beschleunigern gebaut, indem man einen Kern auf einen anderen schießt, manchmal wenige Atome auf einmal. Viele halten weniger als eine Sekunde durch und zerfallen dann. So wurden die unteren Zeilen des Periodensystems gefüllt.

German, before:

> Elemente nach Uran haben keine stabilen Isotope und kommen in der Natur nicht vor. Sie werden in Beschleunigern gebaut, indem man einen Kern auf einen anderen schießt, manchmal wenige Atome auf einmal. Viele halten weniger als eine Sekunde durch und zerfallen dann. Das ist eine Erweiterung: Der Lehrplan verlangt gemachte Elemente nicht. Sie stehen hier, weil so die unteren Zeilen des Periodensystems gefüllt wurden.

- [ ] OK   Comment:


### States of Matter

**Key takeaway 3**

English:

> Gases: particles move freely and are far apart — fills any container, easily compressed.

German, new:

> Gase: Die Teilchen bewegen sich frei und sind weit voneinander entfernt – sie füllen jedes Gefäß und lassen sich leicht zusammendrücken.

German, before:

> Gase: Die Teilchen bewegen sich frei und schnell – sie füllen jedes Gefäß und lassen sich leicht zusammendrücken.

- [ ] OK   Comment:

**Heading of section “Particles in each state”**

English:

> Particles in each state

German, new:

> Die Aggregatzustände im Teilchenmodell

- [ ] OK   Comment:

**Paragraph of section “Particles in each state”**

English:

> In a solid the particles touch in a regular pattern and vibrate in place. In a liquid they still touch, but they are jumbled and slide past one another; in a gas they are far apart and move freely in every direction. The particles are the same size in all three states: only their arrangement and the spaces between them change.

German, new:

> Im festen Zustand berühren sich die Teilchen in einer regelmäßigen Anordnung und schwingen an ihren Plätzen. Im flüssigen Zustand berühren sie sich noch, sind aber ungeordnet und gleiten aneinander vorbei; im gasförmigen Zustand sind sie weit voneinander entfernt und bewegen sich frei in alle Richtungen. Die Teilchen sind in allen drei Zuständen gleich groß – es ändern sich nur ihre Anordnung und die Abstände zwischen ihnen.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Particles in each state”**

English:

> Three boxes, one above another, with particles of the same size in each. Solid: particles touching in a regular block of rows and columns, resting on the floor of the box. Liquid: the same number of particles, still touching but jumbled, with small gaps, spread across the bottom of the box. Gas: five particles far apart across the whole box, each with two short marks behind it to show that it is moving.

German, new:

> Drei Kästen untereinander, in jedem gleich große Teilchen. Fest: Die Teilchen berühren sich und bilden einen regelmäßigen Block aus Reihen und Spalten, der auf dem Boden des Kastens liegt. Flüssig: gleich viele Teilchen, die sich noch berühren, aber ungeordnet und mit kleinen Lücken über den Boden des Kastens verteilt sind. Gasförmig: fünf Teilchen, weit voneinander entfernt im ganzen Kasten, jedes mit zwei kurzen Strichen dahinter, die zeigen, dass es sich bewegt.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Heating and cooling curves”**

English:

> A heating curve for water: temperature up the side and energy added along the bottom, with no numbers on the energy axis. The line climbs steeply through the solid, stays flat at 0 °C for melting, climbs less steeply through the liquid, stays flat at 100 °C for boiling, then climbs steeply again through the gas. The boiling plateau is drawn to scale, almost seven times as long as the melting plateau: about 2260 J against 334 J for each gram.

German, new:

> Eine Erwärmungskurve von Wasser: die Temperatur nach oben, die zugeführte Energie nach rechts, ohne Zahlen auf der Energieachse. Die Linie steigt beim festen Eis steil an, bleibt beim Schmelzen bei 0 °C waagerecht, steigt beim flüssigen Wasser weniger steil, bleibt beim Sieden bei 100 °C waagerecht und steigt beim gasförmigen Wasserdampf wieder steil an. Der waagerechte Abschnitt beim Sieden ist maßstabsgetreu, fast siebenmal so lang wie der beim Schmelzen: etwa 2260 J gegenüber 334 J pro Gramm.

- [ ] OK   Comment:


### Acids & Bases

**Key takeaway 2**

English:

> Base: a proton acceptor. Soluble bases (alkalis) release hydroxide ions, OH−, in water. pH > 7.

German, new:

> Base: ein Protonenakzeptor. Lösliche Basen (Laugen) geben in Wasser Hydroxid-Ionen, OH−, ab. pH > 7.

German, before:

> Base: ein Protonenakzeptor. Lösliche Basen (Laugen) geben in Wasser Hydroxid-Ionen, OH-, ab. pH > 7.

- [ ] OK   Comment:

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

German, new:

> Neutral: pH 7 bei 25 °C – reines Wasser und Lösungen von Salzen wie NaCl.

German, before:

> Neutral: pH 7 bei 25 °C – reines Wasser und die meisten Salze.

- [ ] OK   Comment:

**Key takeaway 4**

English:

> Neutralisation: acid + base → salt + water. The ionic equation is always H+ + OH− → H2O.

German, new:

> Neutralisation: Säure + Base → Salz + Wasser. Die Ionengleichung ist immer H+ + OH− → H2O.

German, before:

> Neutralisation: Säure + Base → Salz + Wasser. Die Ionengleichung ist immer H+ + OH- → H2O.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

German, new:

> Jede Stufe auf der pH-Skala bedeutet den Faktor 10 in der H+-Konzentration: Bei pH 2 ist die H+-Konzentration 100-mal so groß wie bei pH 4.

German, before:

> Jede Stufe auf der pH-Skala bedeutet den Faktor 10 in der H+-Konzentration: pH 2 ist 100-mal saurer als pH 4.

- [ ] OK   Comment:

**Heading of section “The pH scale”**

English:

> The pH scale

German, new:

> Die pH-Skala

- [ ] OK   Comment:

**Paragraph of section “The pH scale”**

English:

> pH says how acidic or alkaline a solution is. At 25 °C, below 7 is acidic, 7 is neutral and above 7 is alkaline, and most solutions you will meet lie between 0 and 14. Universal indicator turns a different colour at each pH: red at the acidic end, green at 7 and purple at the alkaline end.

German, new:

> Der pH-Wert gibt an, wie sauer oder basisch eine Lösung ist. Bei 25 °C ist eine Lösung unter pH 7 sauer, bei pH 7 neutral und über pH 7 basisch; fast alle Lösungen, die dir begegnen, liegen zwischen 0 und 14. Universalindikator färbt sich bei jedem pH-Wert anders: rot im sauren Bereich, grün bei 7 und violett im basischen Bereich.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The pH scale”**

English:

> The pH scale as a bar from 0 at the top to 14 at the bottom, each step in its universal-indicator colour with its number printed beside it: red at 0, orange at 1, yellow at 2 and 3, green from 4 to 8, blue-green at 9, blue at 10 and 11 and purple from 12 to 14. Five everyday solutions are marked at their pH: stomach acid at 1, vinegar at 3, pure water at 7, baking soda at 8 and oven cleaner at 13.

German, new:

> Die pH-Skala als Balken von 0 oben bis 14 unten, jede Stufe in ihrer Farbe des Universalindikators und mit ihrer Zahl daneben: Rot bei 0, Orange bei 1, Gelb bei 2 und 3, Grün von 4 bis 8, Blaugrün bei 9, Blau bei 10 und 11 und Violett von 12 bis 14. Fünf Stoffe aus dem Alltag sind bei ihrem pH-Wert markiert: Magensäure bei 1, Essig bei 3, reines Wasser bei 7, Natron bei 8 und Backofenreiniger bei 13.

- [ ] OK   Comment:


### Balancing Chemical Equations

**Example card 1 (H2 + O2 -> H2O): name**

English:

> Unbalanced (no states yet)

German, new:

> Nicht ausgeglichen (noch ohne Zustandssymbole)

German, before:

> Nicht ausgeglichen

- [ ] OK   Comment:

**Diagram description (alt text) in section “A method that always works”**

English:

> The reaction 2H₂ + O₂ → 2H₂O drawn as particles. On the left, the reactants: two hydrogen molecules, each two touching atoms marked H, plus one oxygen molecule, two touching atoms marked O. An arrow points to the products: two water molecules, each an O atom with two H atoms. The equation is written under the particles, and under that the atoms are counted on each side: H 4 and 4, O 2 and 2.

German, new:

> Die Reaktion 2H₂ + O₂ → 2H₂O als Teilchenbild. Links die Edukte: zwei Wasserstoffmoleküle aus je zwei sich berührenden Atomen mit H, dazu ein Sauerstoffmolekül aus zwei Atomen mit O. Ein Pfeil zeigt auf die Produkte: zwei Wassermoleküle, je ein O-Atom mit zwei H-Atomen. Unter den Teilchen steht die Gleichung und darunter die Atombilanz beider Seiten: H 4 und 4, O 2 und 2.

- [ ] OK   Comment:


### Types of Chemical Reactions

**Key takeaway 3**

English:

> Combustion: fuel + oxygen → carbon dioxide + water (for a hydrocarbon fuel, burning completely) — releases heat.

German, new:

> Verbrennung: Brennstoff + Sauerstoff → Kohlenstoffdioxid + Wasser (bei einem Kohlenwasserstoff als Brennstoff und vollständiger Verbrennung) – dabei wird Wärme frei.

German, before:

> Verbrennung: Brennstoff + Sauerstoff → Kohlenstoffdioxid + Wasser (vollständig) – dabei wird Wärme frei.

- [ ] OK   Comment:


### Chemical Bonds & Structure

**Key takeaway 1**

English:

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons; helium, in group 18, has only 2).

German, new:

> Atome gehen Bindungen ein, um eine stabile, volle Außenschale zu erreichen (Edelgaskonfiguration). Bei den Hauptgruppenelementen sagt dir die letzte Ziffer der Gruppennummer, wie viele Valenzelektronen ein Atom hat (Cl steht in Gruppe 17: 7 Valenzelektronen; Helium steht in Gruppe 18, hat aber nur 2). Das ist dieselbe Zahl wie die Nummer der Hauptgruppe (Cl: VII. Hauptgruppe).

German, before:

> Atome gehen Bindungen ein, um eine stabile, volle Außenschale zu erreichen (Edelgaskonfiguration). Bei den Hauptgruppenelementen sagt dir die Hauptgruppennummer, wie viele Valenzelektronen ein Atom hat.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Why ionic compounds conduct only when molten or dissolved”**

English:

> Three boxes, one above another. Ionic: a grid of small positive ions and large negative ions, alternating, each marked + or −. Covalent: one hydrogen molecule, two atoms marked H whose circles overlap, with two electron dots in the overlap, labelled shared pair. Metallic: a grid of positive metal ions with as many small electron dots scattered between them, labelled delocalised electrons.

German, new:

> Drei Kästen untereinander. Ionenbindung: ein Gitter aus kleinen positiven und großen negativen Ionen, abwechselnd, jedes mit + oder − markiert. Atombindung: ein Wasserstoffmolekül aus zwei Atomen mit H, deren Kreise sich überlappen, mit zwei Elektronenpunkten in der Überlappung, beschriftet als bindendes Elektronenpaar. Metallbindung: ein Gitter aus positiven Metall-Ionen mit ebenso vielen kleinen Elektronenpunkten dazwischen, beschriftet als frei bewegliche Elektronen.

- [ ] OK   Comment:


### Writing Ionic Formulas

**Diagram description (alt text) in section “Worked example: aluminium sulfate”**

English:

> Aluminium sulfate by the cross-over method. At the top, the aluminium ion Al³⁺, labelled cation, and the sulfate ion SO₄²⁻, labelled anion. Two crossing arrows carry each charge number down to become the other ion’s subscript: the 3 of Al³⁺ becomes the 3 after the bracketed sulfate, and the 2 of SO₄²⁻ becomes the 2 after Al. At the bottom, the formula Al₂(SO₄)₃, and the check: 2 × (+3) = +6 and 3 × (−2) = −6.

German, new:

> Aluminiumsulfat nach der Kreuzregel. Oben das Aluminium-Ion Al³⁺, beschriftet mit „Kation“, und das Sulfat-Ion SO₄²⁻, beschriftet mit „Anion“. Zwei sich kreuzende Pfeile tragen jede Ladungszahl nach unten, wo sie zum Index des anderen Ions wird: Die 3 von Al³⁺ wird zur 3 hinter dem eingeklammerten Sulfat, die 2 von SO₄²⁻ zur 2 hinter Al. Unten die Verhältnisformel Al₂(SO₄)₃ und die Probe: 2 × (+3) = +6 und 3 × (−2) = −6.

- [ ] OK   Comment:

**Paragraph of section “Common ion charges from the periodic table”**

English:

> Group 1 → +1, Group 2 → +2, Al → +3, Group 17 → −1, Group 16 → −2, N and P → −3. Transition metals vary — the name will tell you. For polyatomic ions use the lookup table.

German, new:

> Gruppe 1 → +1, Gruppe 2 → +2, Al → +3, Gruppe 17 → −1, Gruppe 16 → −2, N und P → −3. Bei den Nebengruppenmetallen wechselt die Ladung – der Name sagt sie dir. Für mehratomige Ionen benutzt du die Nachschlagetabelle.

German, before:

> Hauptgruppe 1 → +1, Hauptgruppe 2 → +2, Al → +3, Hauptgruppe 17 → −1, Hauptgruppe 16 → −2, N und P → −3. Bei den Nebengruppenmetallen wechselt die Ladung – der Name sagt sie dir. Für mehratomige Ionen benutzt du die Nachschlagetabelle.

- [ ] OK   Comment:


### Polyatomic Ions

**Key takeaway 2**

English:

> The only common polyatomic cation is ammonium, NH4+ (apart from hydronium, H3O+, which you meet in acids). All the rest are anions.

German, new:

> Das einzige häufige mehratomige Kation ist Ammonium, NH4+ (abgesehen vom Oxonium-Ion H3O+, das dir bei den Säuren begegnet). Alle anderen sind Anionen.

German, before:

> Das einzige häufige mehratomige Kation ist Ammonium, NH4+. Alle anderen sind Anionen.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Adding H+ to an anion makes its charge one less negative and adds "hydrogen" to the name: carbonate CO3 2− → hydrogen carbonate HCO3−.

German, new:

> Ein zusätzliches H+ am Anion macht dessen Ladung um eins weniger negativ und setzt „Hydrogen“ vor den Namen: Carbonat CO3 2− → Hydrogencarbonat HCO3−.

German, before:

> Ein zusätzliches H+ am Anion erhöht dessen Ladung um eins und setzt „Hydrogen“ vor den Namen: Carbonat CO3 2− → Hydrogencarbonat HCO3−.

- [ ] OK   Comment:

**Paragraph of section “Where they show up”**

English:

> Acids: sulfuric acid is H2SO4 because sulfate is 2−; nitric acid is HNO3 because nitrate is 1−. Precipitation: all nitrates and all ammonium salts are soluble, so they are the usual "spectator" partners. Redox: permanganate and dichromate are the classic oxidising agents.

German, new:

> Säuren: Schwefelsäure ist H2SO4, weil Sulfat 2− trägt; Salpetersäure ist HNO3, weil Nitrat 1− trägt. Fällung: Alle Nitrate und alle Ammoniumsalze sind löslich, deshalb sind sie die üblichen Zuschauer-Ionen. Redox: Permanganat und Dichromat sind die klassischen Oxidationsmittel.

German, before:

> Säuren: Schwefelsäure ist H2SO4, weil Sulfat 2− trägt; Salpetersäure ist HNO3, weil Nitrat 1− trägt. Fällung: Fast alle Nitrate und alle Ammoniumsalze sind löslich, deshalb sind sie die üblichen Zuschauer-Ionen. Redox: Permanganat und Dichromat sind die klassischen Oxidationsmittel.

- [ ] OK   Comment:

**Heading of table “Polyatomic ions (VCE data book set)”**

English:

> Polyatomic ions (VCE data book set)

German, new:

> Die wichtigsten mehratomigen Ionen

German, before:

> Mehratomige Ionen (Auswahl des VCE-Datenhefts)

- [ ] OK   Comment:

**Common mistake 3**

English:

> Confusing the charge (2−) with the number of oxygens — sulfate has 4 O and charge 2−.

German, new:

> Die Ladung (2−) mit der Anzahl der Sauerstoffatome zu verwechseln – Sulfat hat 4 O und die Ladung 2−.

German, before:

> Die Ladung (−2) mit der Anzahl der Sauerstoffatome zu verwechseln – Sulfat hat 4 O und die Ladung 2−.

- [ ] OK   Comment:


### Naming Inorganic Compounds

**Heading of section “Which naming system?”**

English:

> Which naming system?

German, new:

> Welches Benennungssystem?

- [ ] OK   Comment:

**Paragraph of section “Which naming system?”**

English:

> Look at what the compound is made of before you name it. A metal (or NH4+) with a non-metal is ionic: the cation, then the anion, with no prefixes. Two non-metals make a molecular compound, named with Greek prefixes — but if H comes first and it is dissolved in water, it is an acid, and acids have names of their own.

German, new:

> Schau zuerst, woraus die Verbindung besteht. Metall (oder NH4+) und Nichtmetall bilden eine Ionenverbindung: Kation und Anion werden zu einem Wort, ohne Zahlwörter – Natriumchlorid. Zwei Nichtmetalle bilden einen molekularen Stoff mit griechischen Zahlwörtern (Schwefeldioxid); steht aber H vorn und ist der Stoff in Wasser gelöst, ist er eine Säure, und Säuren heißen im Deutschen nach ihrem Säurerest oder tragen alte Namen wie Salzsäure.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Which naming system?”**

English:

> A flowchart for choosing a naming system. Metal + non-metal leads to ionic, for example sodium chloride. Two non-metals leads to molecular, for example sulfur dioxide. An arrow down from two non-metals leads to H first, in water, and from there to acid, for example hydrochloric acid.

German, new:

> Ein Flussdiagramm zur Wahl des Benennungssystems. Von „Metall + Nichtmetall“ führt ein Pfeil zu „Ionenverbindung“, Beispiel Natriumchlorid. Von „zwei Nichtmetalle“ führt ein Pfeil zu „molekularer Stoff“, Beispiel Schwefeldioxid. Von „zwei Nichtmetalle“ führt außerdem ein Pfeil nach unten zu „H vorn, in Wasser“ und von dort zu „Säure“, Beispiel Salzsäure.

- [ ] OK   Comment:


### Relative Atomic & Formula Mass

**Example card 1 (H2O): description**

English:

> 2 × 1 + 16 = 18

German, new:

> 2 × 1 + 16 = 18

- [ ] OK   Comment:

**Example card 2 (CO2): description**

English:

> 12 + 2 × 16 = 44

German, new:

> 12 + 2 × 16 = 44

- [ ] OK   Comment:

**Example card 3 (CaCO3): description**

English:

> 40 + 12 + 3 × 16 = 100

German, new:

> 40 + 12 + 3 × 16 = 100

- [ ] OK   Comment:

**Example card 4 (Mg(OH)2): description**

English:

> 24 + 2 × (16 + 1) = 58

German, new:

> 24 + 2 × (16 + 1) = 58

- [ ] OK   Comment:

**Example card 5 (Ca(NO3)2): description**

English:

> 40 + 2 × (14 + 3 × 16) = 164

German, new:

> 40 + 2 × (14 + 3 × 16) = 164

- [ ] OK   Comment:

**Diagram description (alt text) in section “What "relative" actually means”**

English:

> A balance with two hanging pans, level. On the left pan is one carbon atom, a circle marked C. On the right pan are twelve hydrogen atoms, smaller circles marked H, piled in rows of five, four and three. Carbon is drawn bigger than hydrogen, but nowhere near twelve times the size. Labels under the pans say 1 carbon atom and 12 hydrogen atoms, and a note says the picture is not to scale.

German, new:

> Eine Waage mit zwei hängenden Waagschalen, im Gleichgewicht. Auf der linken Schale liegt ein Kohlenstoffatom, ein Kreis mit C. Auf der rechten Schale liegen zwölf Wasserstoffatome, kleinere Kreise mit H, in Reihen zu fünf, vier und drei gestapelt. Kohlenstoff ist größer gezeichnet als Wasserstoff, aber längst nicht zwölfmal so groß. Unter den Schalen steht „1 Kohlenstoffatom“ und „12 Wasserstoffatome“, und ein Hinweis sagt, dass das Bild nicht maßstabsgetreu ist.

- [ ] OK   Comment:

**Example card 1 in section “Adding the atoms up”: description**

English:

> 14 + 3 × 1 = 17

German, new:

> 14 + 3 × 1 = 17

- [ ] OK   Comment:

**Example card 2 in section “Adding the atoms up”: description**

English:

> 12 + 4 × 1 = 16

German, new:

> 12 + 4 × 1 = 16

- [ ] OK   Comment:

**Example card 3 in section “Adding the atoms up”: description**

English:

> 2 × 1 + 32 + 4 × 16 = 98

German, new:

> 2 × 1 + 32 + 4 × 16 = 98

- [ ] OK   Comment:

**Example card 1 in section “Subscripts and brackets”: description**

English:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

German, new:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 9, column 3**

English:

> 35.5

German, new:

> 35,5

German, before:

> 35.5

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 13, column 3**

English:

> 63.5

German, new:

> 63,5

German, before:

> 63.5

- [ ] OK   Comment:

**Table “Worked examples”, row 1, column 2**

English:

> 2 × 1

German, new:

> 2 × 1

German, before:

> 2 x 1

- [ ] OK   Comment:

**Table “Worked examples”, row 2, column 2**

English:

> 2 × 16

German, new:

> 2 × 16

German, before:

> 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 3, column 2**

English:

> 2 × 1 + 16

German, new:

> 2 × 1 + 16

German, before:

> 2 x 1 + 16

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 2**

English:

> 23 + 35.5

German, new:

> 23 + 35,5

German, before:

> 23 + 35.5

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 3**

English:

> 58.5

German, new:

> 58,5

German, before:

> 58.5

- [ ] OK   Comment:

**Table “Worked examples”, row 6, column 2**

English:

> 12 + 2 × 16

German, new:

> 12 + 2 × 16

German, before:

> 12 + 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 7, column 2**

English:

> 40 + 12 + 3 × 16

German, new:

> 40 + 12 + 3 × 16

German, before:

> 40 + 12 + 3 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 8, column 2**

English:

> 2 × 1 + 32 + 4 × 16

German, new:

> 2 × 1 + 32 + 4 × 16

German, before:

> 2 x 1 + 32 + 4 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 9, column 2**

English:

> 24 + 2 × (16 + 1)

German, new:

> 24 + 2 × (16 + 1)

German, before:

> 24 + 2 x (16 + 1)

- [ ] OK   Comment:

**Table “Worked examples”, row 10, column 2**

English:

> 40 + 2 × (14 + 3 × 16)

German, new:

> 40 + 2 × (14 + 3 × 16)

German, before:

> 40 + 2 x (14 + 3 x 16)

- [ ] OK   Comment:

**Common mistake 1**

English:

> Saying an atom of carbon "weighs 12" — 12 what? Ar is a comparison and has no unit. Grams only appear once you scale up to a real amount.

German, new:

> Zu sagen, ein Kohlenstoffatom „wiegt 12“ – 12 was? Die Ar ist ein Vergleich und hat keine Einheit. Gramm kommen erst ins Spiel, wenn du auf eine echte Menge hochrechnest.

- [ ] OK   Comment:


### The Mole & Stoichiometry

**Key takeaway 1**

English:

> One mole is 6.02 × 10²³ particles (Avogadro's number, N_A). Molar mass M (g/mol) is the mass of one mole — add up the atomic masses from the periodic table.

German, new:

> Ein Mol sind 6,02 × 10²³ Teilchen (Avogadro-Konstante, N_A). Die molare Masse M (g/mol) ist die Masse eines Mols – addiere dazu die Atommassen aus dem Periodensystem.

German, before:

> Ein Mol sind 6,02 × 10^23 Teilchen (Avogadro-Konstante, N_A). Die molare Masse M (g/mol) ist die Masse eines Mols – addiere dazu die Atommassen aus dem Periodensystem.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Worked example: mass → mass”**

English:

> The mole map. Four boxes down the left, mass, particles, gas volume and solution, are each joined to a tall box, moles of reactant, by a two-way arrow carrying its formula: n = m/M, n = N/N_A, n = V/V_m and n = cV. From moles of reactant, an arrow labelled mole ratio (coefficients) leads down to moles of product.

German, new:

> Eine Übersicht der Umrechnungen über die Stoffmenge. Links untereinander vier Kästen – Masse, Teilchenzahl, Gasvolumen und Lösung –, jeder durch einen Doppelpfeil mit seiner Formel mit einem hohen Kasten „Stoffmenge des Edukts“ verbunden: n = m/M, n = N/N_A, n = V/V_m und n = cV. Von der Stoffmenge des Edukts führt ein Pfeil, beschriftet mit „Stoffmengenverhältnis (Koeffizienten)“, nach unten zur Stoffmenge des Produkts.

- [ ] OK   Comment:

**Table “The conversion formulas”, row 4, column 2**

English:

> volume of a gas at SLC

German, new:

> das Volumen eines Gases

German, before:

> das Volumen eines Gases bei SLC

- [ ] OK   Comment:

**Table “The conversion formulas”, row 4, column 3**

English:

> V_m = 24.8 L/mol at 25 °C and 100 kPa

German, new:

> V_m = 24,5 L/mol bei 25 °C und 1013 hPa (bei 0 °C: 22,4 L/mol)

German, before:

> V_m = 24,8 L/mol bei 25 °C und 100 kPa

- [ ] OK   Comment:

**Common mistake 4**

English:

> Rounding early — keep full precision until the final answer, then round to the same number of significant figures as the least precise value you were given.

German, new:

> Zu früh zu runden – rechne bis zum Schluss mit voller Genauigkeit und runde dann auf so viele gültige Ziffern, wie die ungenaueste gegebene Größe hat.

German, before:

> Zu früh zu runden – rechne bis zum Schluss mit voller Genauigkeit und gib dann drei signifikante Stellen an.

- [ ] OK   Comment:


### Lewis Structures

**Key takeaway 1**

English:

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17; helium, in group 18, has only 2). Add one electron per negative charge, remove one per positive charge.

German, new:

> Valenzelektronen = letzte Ziffer der Gruppennummer bei den Hauptgruppenelementen (H 1, C 4, N 5, O 6, Halogene 7 – Stickstoff steht in Gruppe 15, Chlor in Gruppe 17; Helium steht in Gruppe 18, hat aber nur 2). Pro negativer Ladung kommt ein Elektron dazu, pro positiver Ladung fällt eins weg.

German, before:

> Valenzelektronen = Hauptgruppennummer bei den Hauptgruppenelementen (H 1, C 4, N 5, O 6, Halogene 7). Pro negativer Ladung kommt ein Elektron dazu, pro positiver Ladung fällt eins weg.

- [ ] OK   Comment:

**Paragraph of section “Year 10 essentials”**

English:

> Every atom brings its outer electrons as dots. A dot on its own is an unpaired electron (a "loner"); two loners from two different atoms make a shared pair, which is one bond (drawn as a line). Pairs that stay on one atom are lone pairs. An atom is full at 8 dots around it (an octet) — hydrogen is full at 2 (a duet). Share twice between the same two atoms for a double bond, three times for a triple. The number of loners tells you how many bonds an atom makes: H 1, C 4, N 3, O 2, Cl 1. Sulfur behaves like oxygen and phosphorus like nitrogen because they are in the same groups. Everything below this section (formal charge, VSEPR shapes, octet exceptions) is Senior content.

German, new:

> Jedes Atom bringt seine Außenelektronen als Punkte mit. Ein Punkt, der allein steht, ist ein ungepaartes Elektron; zwei ungepaarte Elektronen aus zwei verschiedenen Atomen ergeben ein bindendes Elektronenpaar, also eine Bindung (gezeichnet als Strich). Paare, die an einem Atom bleiben, sind freie Elektronenpaare. Ein Atom ist mit 8 Punkten um sich herum voll (ein Oktett) – Wasserstoff ist schon mit 2 voll (ein Duett). Teilst du zwischen denselben zwei Atomen zweimal, wird daraus eine Doppelbindung, dreimal eine Dreifachbindung. Die Zahl der ungepaarten Elektronen sagt dir, wie viele Bindungen ein Atom eingeht: H 1, C 4, N 3, O 2, Cl 1. Schwefel verhält sich wie Sauerstoff und Phosphor wie Stickstoff, weil sie in denselben Hauptgruppen stehen. Alles unterhalb dieses Abschnitts (Formalladung, VSEPR-Formen, Ausnahmen von der Oktettregel) ist Stoff der Oberstufe.

German, before:

> Jedes Atom bringt seine Außenelektronen als Punkte mit. Ein Punkt, der allein steht, ist ein Einzelelektron (formal: ein ungepaartes Elektron); zwei Einzelelektronen aus zwei verschiedenen Atomen ergeben ein bindendes Elektronenpaar, also eine Bindung (gezeichnet als Strich). Paare, die an einem Atom bleiben, sind freie Elektronenpaare. Ein Atom ist mit 8 Punkten um sich herum voll (ein Oktett) – Wasserstoff ist schon mit 2 voll (ein Duett). Teilst du zwischen denselben zwei Atomen zweimal, wird daraus eine Doppelbindung, dreimal eine Dreifachbindung. Die Zahl der Einzelelektronen sagt dir, wie viele Bindungen ein Atom eingeht: H 1, C 4, N 3, O 2, Cl 1. Schwefel verhält sich wie Sauerstoff und Phosphor wie Stickstoff, weil sie in denselben Hauptgruppen stehen. Alles unterhalb dieses Abschnitts (Formalladung, VSEPR-Formen, Ausnahmen von der Oktettregel) ist Stoff der Oberstufe.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Year 10 essentials”**

English:

> Lewis structures of four molecules, each with its formula underneath. Water, H₂O: H–O–H with two lone pairs on the oxygen, one above it and one below. Ammonia, NH₃: nitrogen with single bonds to three hydrogens and one lone pair. Carbon dioxide, CO₂: O=C=O, two double bonds, with two lone pairs on each oxygen and none on the carbon. Methane, CH₄: carbon with single bonds to four hydrogens and no lone pairs. Bonds are lines and lone pairs are pairs of dots. Labels point to one lone pair, on the oxygen in water, and to one shared pair, a bond in ammonia.

German, new:

> Lewis-Formeln von vier Molekülen, unter jedem seine Summenformel. Wasser, H₂O: H–O–H mit zwei freien Elektronenpaaren am Sauerstoff, eines darüber und eines darunter. Ammoniak, NH₃: Stickstoff mit Einfachbindungen zu drei Wasserstoffatomen und einem freien Elektronenpaar. Kohlenstoffdioxid, CO₂: O=C=O, zwei Doppelbindungen, mit zwei freien Elektronenpaaren an jedem Sauerstoff und keinem am Kohlenstoff. Methan, CH₄: Kohlenstoff mit Einfachbindungen zu vier Wasserstoffatomen und ohne freies Elektronenpaar. Bindungen sind Striche, freie Elektronenpaare je zwei Punkte. Beschriftet sind ein freies Elektronenpaar, am Sauerstoff des Wassers, und ein bindendes Elektronenpaar, eine Bindung im Ammoniak.

- [ ] OK   Comment:

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

German, new:

> Methan – Kohlenstoff teilt alle vier ungepaarten Elektronen

German, before:

> Methan – Kohlenstoff teilt alle vier Einzelelektronen

- [ ] OK   Comment:

**Diagram description (alt text) in section “From Lewis structure to shape (VSEPR)”**

English:

> The five VSEPR shapes, each with its formula, shape and bond angle underneath, drawn in 3D: a solid wedge is a bond coming out of the page and a hashed wedge a bond going behind it. CO₂ is linear, 180°. BF₃ is trigonal planar, 120°. CH₄ is tetrahedral, 109.5°. NH₃ is trigonal pyramidal, 107°, with its lone pair drawn as a lobe on the nitrogen. H₂O is bent, 104.5°, with two lone-pair lobes on the oxygen. NH₃ and H₂O are drawn like CH₄ with one, then two, of its bonds replaced by a lone pair. A small arc marks the angle between the two bonds that lie in the page.

German, new:

> Die fünf Molekülformen nach dem VSEPR-Modell, unter jeder ihre Formel, ihre Form und ihr Bindungswinkel, räumlich gezeichnet: Ein ausgefüllter Keil ist eine Bindung, die aus der Papierebene nach vorn zeigt, ein gestrichelter Keil eine, die nach hinten zeigt. CO₂ ist linear, 180°. BF₃ ist trigonal-planar, 120°. CH₄ ist tetraedrisch, 109,5°. NH₃ ist trigonal-pyramidal, 107°, sein freies Elektronenpaar ist als Keule am Stickstoff gezeichnet. H₂O ist gewinkelt, 104,5°, mit zwei solchen Keulen am Sauerstoff. NH₃ und H₂O sind wie CH₄ gezeichnet, nur dass eine und dann zwei Bindungen durch ein freies Elektronenpaar ersetzt sind. Ein kleiner Bogen markiert den Winkel zwischen den beiden Bindungen in der Papierebene.

- [ ] OK   Comment:

**Heading of table “Valence electrons by group”**

English:

> Valence electrons by group

German, new:

> Valenzelektronen nach Gruppe

German, before:

> Valenzelektronen nach Hauptgruppe

- [ ] OK   Comment:

**Column 1 header of table “Valence electrons by group”**

English:

> Group

German, new:

> Gruppe

German, before:

> Hauptgruppe

- [ ] OK   Comment:


### Naming Organic Compounds

**Diagram description (alt text) in section “Worked example”**

English:

> The skeletal structure of 3-methylpentan-2-ol: a zigzag chain of five carbons, numbered 1 to 5 from left to right, with OH at the end of a bond up from carbon 2 and a methyl group as a short line down from carbon 3, labelled methyl. Underneath, the name 3-methylpentan-2-ol.

German, new:

> Die Skelettformel von 3-Methylpentan-2-ol: eine Zickzackkette aus fünf Kohlenstoffatomen, von links nach rechts mit 1 bis 5 nummeriert. Am Kohlenstoff 2 zeigt eine Bindung nach oben zur OH-Gruppe, am Kohlenstoff 3 ein kurzer Strich nach unten zur Methylgruppe, beschriftet mit „Methylgruppe“. Darunter der Name 3-Methylpentan-2-ol.

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 1**

English:

> Amide

German, new:

> Amid

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 2**

English:

> -amide

German, new:

> -amid

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 3**

English:

> ethanamide

German, new:

> Ethanamid

- [ ] OK   Comment:

**Common mistake 4**

English:

> Forgetting the locant for -ene, -ol or -one whenever the group could sit in more than one position (propan-1-ol vs propan-2-ol).

German, new:

> Die Nummer für -en, -ol oder -on zu vergessen, wenn die Gruppe an mehr als einer Stelle sitzen könnte (Propan-1-ol oder Propan-2-ol).

German, before:

> Bei Ketten ab 4 Kohlenstoffatomen die Nummer für -en, -ol oder -on zu vergessen.

- [ ] OK   Comment:


### Functional Groups

**Paragraph of section “The reaction pathway you must know”**

English:

> Alkene → (H₂O, H₃PO₄ catalyst) → alcohol. Alkene → (HX) → haloalkane → (OH⁻(aq)) → alcohol → (Cr₂O₇²⁻/H⁺) → aldehyde → (further oxidation) → carboxylic acid → (alcohol, H₂SO₄ catalyst) → ester. Primary alcohols oxidise twice, secondary alcohols oxidise once to ketones, tertiary alcohols do not oxidise.

German, new:

> Alken → (H₂O, H₃PO₄ als Katalysator) → Alkohol. Alken → (HX) → Halogenalkan → (OH⁻(aq)) → Alkohol → (Cr₂O₇²⁻/H⁺) → Aldehyd → (weitere Oxidation) → Carbonsäure → (Alkohol, H₂SO₄ als Katalysator) → Ester. Primäre Alkohole werden zweimal oxidiert, sekundäre einmal zum Keton, tertiäre gar nicht.

German, before:

> Alken → (H2O, Katalysator H+) → Alkohol. Alken → (HX) → Halogenalkan → (OH−) → Alkohol → (Cr2O7 2−/H+) → Aldehyd → (weitere Oxidation) → Carbonsäure → (Alkohol, Katalysator H2SO4) → Ester. Primäre Alkohole werden zweimal oxidiert, sekundäre einmal zum Keton, tertiäre gar nicht.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The reaction pathway you must know”**

English:

> A reaction map, read from the top down. Down the left: an alkene gives a primary alcohol with H₂O and an H₃PO₄ catalyst; the primary alcohol gives an aldehyde with Cr₂O₇²⁻/H⁺, the aldehyde a carboxylic acid with Cr₂O₇²⁻/H⁺, and the carboxylic acid an ester with an alcohol and an H₂SO₄ catalyst. On the right: the alkene can instead take HX to give a haloalkane, which gives the same primary alcohol with OH⁻(aq); and beside the primary alcohol, a secondary alcohol oxidises to a ketone with Cr₂O₇²⁻/H⁺.

German, new:

> Eine Reaktionsübersicht, von oben nach unten zu lesen. Links untereinander: Aus einem Alken wird mit H₂O und H₃PO₄ als Katalysator ein primärer Alkohol, daraus mit Cr₂O₇²⁻/H⁺ ein Aldehyd, daraus mit Cr₂O₇²⁻/H⁺ eine Carbonsäure und daraus mit einem Alkohol und H₂SO₄ als Katalysator ein Ester. Rechts: Das Alken kann stattdessen mit HX zu einem Halogenalkan reagieren, das mit OH⁻(aq) denselben primären Alkohol ergibt; neben dem primären Alkohol wird ein sekundärer Alkohol mit Cr₂O₇²⁻/H⁺ zum Keton oxidiert.

- [ ] OK   Comment:

**Paragraph of section “Spotting groups in a spectrum”**

English:

> IR: a broad O–H stretch around 3200–3550 cm⁻¹ means alcohol (or, very broad and overlapping C–H, carboxylic acid); a strong C=O near 1670–1750 cm⁻¹ means aldehyde, ketone, acid, ester or amide. The VCE data book lists the exact ranges — use it.

German, new:

> IR: Eine breite O–H-Bande um 3200–3550 cm⁻¹ bedeutet Alkohol (oder, sehr breit und über die C–H-Banden gelegt, Carbonsäure); eine starke C=O-Bande bei 1670–1750 cm⁻¹ bedeutet Aldehyd, Keton, Säure, Ester oder Amid. Die genauen Bereiche findest du in einer IR-Tabelle – benutz sie.

German, before:

> IR: Eine breite O–H-Bande um 3200–3550 cm⁻¹ bedeutet Alkohol (oder, sehr breit und über die C–H-Banden gelegt, Carbonsäure); eine starke C=O-Bande bei 1670–1750 cm⁻¹ bedeutet Aldehyd, Keton, Säure, Ester oder Amid. Die genauen Bereiche stehen im VCE-Datenheft – benutz es.

- [ ] OK   Comment:

**Common mistake 1**

English:

> Calling a molecule with –OH on a benzene ring an alcohol (it is a phenol) — a common trap.

German, new:

> Ein Molekül mit –OH am Benzolring Alkohol zu nennen (es ist ein Phenol) – eine häufige Falle.

German, before:

> Ein Molekül mit –OH am Benzolring Alkohol zu nennen (es ist ein Phenol) – außerhalb des VCE-Stoffs, aber eine häufige Falle.

- [ ] OK   Comment:


---

## French (fr): 97 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-fr.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 ans*, while *65 000* keeps its space. The SI brochure lets a four-digit number stand unseparated, and it is what the isotopes prose already printed. **Rated medium**: many French textbooks write *5 730 ans*; if a native reviewer prefers that, change the prose and the example card together. |
| universal indicator | **indicateur universel** | The one place *coloré* is dropped: *universel* already says which indicator. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| pH scale | **échelle de pH** | Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| the pH scale's everyday examples (diagram labels) | **suc gastrique** (1), **vinaigre** (3), **eau pure** (7), **bicarbonate** (8), **décapant four** (13) | The words the sheet's own pH table uses, each at the same pH band as the English. *Suc gastrique*, not *acide gastrique*: it is what a French SVT and chemistry textbook calls it. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| particle | **particule** | Added 2026-09-25 for the States of Matter diagrams. |
| melting / boiling (a heating curve's plateaus) | **fusion / ébullition** | As in the sheet's table of phase changes. A French textbook calls the flat stretches *paliers*. Added 2026-09-25 for the States of Matter diagrams. |
| heating curve | **courbe de chauffage** | Matches the sheet's section heading. Added 2026-09-25 for the States of Matter diagrams. |
| energy added (a graph's axis) | **énergie reçue** | French physique-chimie puts the energy on the system's side (*l’eau reçoit de l’énergie*). *Énergie ajoutée* is a calque. Added 2026-09-25 for the States of Matter diagrams. |
| the three states at particle scale | **compact et ordonné / compact et désordonné / dispersé et désordonné** | The triad French collège textbooks use for solid, liquid and gas *à l’échelle microscopique*. The new section uses it, and its heading uses *échelle microscopique*. Added 2026-09-25 for the States of Matter diagrams. |
| VSEPR shapes: linear, trigonal planar, tetrahedral, trigonal pyramidal, bent | **linéaire, triangulaire plane, tétraédrique, pyramidale à base triangulaire, coudée** | Added 2026-09-25 with the Lewis sheet's shape diagram (`lewis-structures/02-vsepr-shapes`). The adjectives agree with *géométrie* (feminine), as a lycée textbook writes them, and they are the ones the sheet's VSEPR paragraph already used. *Trigonale plane* and *pyramide trigonale* are also in circulation and are not used. Angles: *109,5°*, no space before the degree sign. |
| bond angle | **angle de liaison** | Added 2026-09-25. |
| wedge / hashed wedge (a bond towards / away from the viewer) | **triangle plein / triangle hachuré** (*représentation de Cram*) | Added 2026-09-25, for alt text. French lycée books name the convention after Cram and call the wedges triangles; *coin* is a calque. |
| lone-pair lobe (in a VSEPR drawing) | **lobe** | Added 2026-09-25, for alt text. |
| electron shell (the curriculum's word) | **couche électronique** | VC2S10U07 says "electron shells", so the sheet names *couche* once as the word the reader's teacher uses, and keeps *niveau d'énergie* as its own term. Since 2026-09-25 the sentence credits the word to the teacher alone (*Ton prof parle peut-être de couches*); it no longer mentions the programme. |
| valence electrons from the group number | **le chiffre des unités du numéro du groupe** (*Cl est dans le groupe 17 : 7 électrons de valence*) | Added 2026-09-25. With groups numbered 1–18, *numéro du groupe = électrons de valence* is only true for groups 1 and 2, so the bonding and Lewis sheets state the last-digit rule. *Chiffre des unités* is plain school French for "last digit". **Numbered, it is always *groupe*, never *colonne*** (owner's decision, 2026-09-25): *groupe 17*, *le groupe 1*, and the Lewis table is headed *Électrons de valence par groupe*. *Colonne* stays only where a sentence explains what a group is (*un groupe est une colonne*). |
| beta decay | **désintégration bêta** | Added 2026-09-25, for how reactors make neptunium and plutonium. Matches *particule bêta*, with the circumflex. |
| shielding gamma ("reduces, never stops") | **atténuer**: *le plomb ou le béton épais l'atténuent fortement* | Added 2026-09-24. *Atténuation* is the word French physique-chimie uses for gamma passing through matter; alpha and beta keep *arrêter*. |
| electron cloud (diagram label) | **nuage électronique** | Added 2026-09-25 with the redrawn atom diagrams. The standard term in French teaching. |
| not to scale (diagram caveat) | **Échelle non respectée**, and the ratio as **1/100 000 du diamètre de l’atome** | Added 2026-09-25 with the redrawn atom diagrams. *Échelle non respectée* is the caption French textbooks print under a schematic; *pas à l’échelle* is a calque. Says *diamètre*, because by volume the ratio is about 10⁻¹⁵. |
| heavier, but first / lighter, but second (06) | **plus lourd, mais placé avant** / **plus léger, mais placé après** | Added 2026-09-25 with the redrawn atom diagrams. Masculine to agree with *tellure* and *iode*, not with the reader. |
| a cell of the periodic table | **case** (*la case du tellure*) | Added 2026-09-25 with the redrawn atom diagrams. |
| hydrogen-1, -2, -3 (03) | **hydrogène 1**, **hydrogène 2**, **hydrogène 3** | Added 2026-09-25 with the redrawn isotope diagrams. A space and no hyphen, following the *carbone 14* row above. |
| protium / deuterium / tritium (03) | **protium** / **deutérium** / **tritium** | Added 2026-09-25 with the redrawn isotope diagrams. Printed under the mass-number name; French programmes name all three, and *deutérium* takes the accent. |
| stable / radioactive, of one isotope (03) | **stable** / **radioactif** | Added 2026-09-25 with the redrawn isotope diagrams. Masculine, agreeing with *hydrogène*. |
| undecayed nuclei (07, vertical axis) | **noyaux non désintégrés** | Added 2026-09-25 with the redrawn isotope diagrams. The quantity French physique-chimie plots (*nombre de noyaux non désintégrés N(t)*), and *désintégré* per the *désintégration* row above. Replaces "how much is left", which suggests the sample disappears. |
| time in half-lives (07, horizontal axis) | **temps, en demi-vies** | Added 2026-09-25 with the redrawn isotope diagrams. |
| the decay curve (07 alt text) | **courbe de décroissance radioactive** | Added 2026-09-25 with the redrawn isotope diagrams. *Décroissance*, because here the curve itself is the subject — see the *désintégration* row. |
| name order vs formula order | formula **cation first**, name **anion first**: *chlorure de sodium*, NaCl | Added 2026-09-25. The English common mistake "writing the anion first because it sounds first" was removed, since in English the cation is said first. In French the trap is real, but an overlay must keep the English list lengths, so the point lives in takeaway 2 of *Writing Ionic Formulas* instead. |
| cross-over method (charges → subscripts) | **méthode de la croix** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Already the sheet's term (*Méthode de la croix* in the takeaways). |
| significant figures | **chiffres significatifs** | Added 2026-09-25. The lycée rule is *autant de chiffres significatifs que la donnée la moins précise*, and the stoichiometry sheet now says that rather than a fixed three. |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet. The IR sentence now points to *une table de données IR*, which is what a French exercise supplies, and the polyatomic-ion table is headed *Les principaux ions polyatomiques*. |
| SLC (standard laboratory conditions) | **withheld — spell out "à 25 °C et 100 kPa"** | Added 2026-09-25. "SLC" is a VCE (Australian) abbreviation with no French equivalent, so the conversion-table cell now names the conditions instead of naming the abbreviation, keeping the English value (V_m = 24,8 L/mol). |
| a two-pan balance (the relative-mass picture) | **balance à deux plateaux**; level is **en équilibre** | Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| mole ratio | **rapport molaire** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). |
| number of particles (N) | **nombre d’entités** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). The lycée term (*entités chimiques*), and the one the conversion table already uses; *nombre de particules* is understood but is not what the programme prints. |
| moles of reactant / product (mole-map boxes) | **quantité de matière du réactif / du produit** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Built on the glossary's *quantité de matière*; "moles de réactif" is spoken but is not how a French textbook writes it. |
| primary / secondary / tertiary alcohol | **alcool primaire / secondaire / tertiaire** | Added 2026-09-25 with the reaction-map diagram. |
| catalyst | **catalyseur** | Added 2026-09-25. On the reaction map it comes before the formula: *catalyseur H₃PO₄*. |
| skeletal formula | **formule topologique** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). The lycée term; *formule squelettique* is a calque. |
| methyl (group), as a diagram label | **méthyle** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). With the final *-e* as a noun (*un groupe méthyle*); *méthyl-* without it inside a name (*3-méthylpentan-2-ol*). |

### Diagram labels

Text drawn inside the diagrams. Labels must stay short: they sit in a fixed space. Text in {braces} is filled in with a number.

#### Atoms & the Periodic Table — diagram “What an atom is made of”

| Label | English | French | OK / comment |
|---|---|---|---|
| electronCloud | electron cloud | nuage électronique | |
| nucleus | nucleus | noyau | |
| proton | proton | proton | |
| neutron | neutron | neutron | |
| scale | Not to scale: the nucleus is about 1/100,000 of the atom’s width. | Échelle non respectée : le noyau mesure environ 1/100 000 du diamètre de l’atome. | |

#### Atoms & the Periodic Table — diagram “Atomic number and mass number”

| Label | English | French | OK / comment |
|---|---|---|---|
| massNumber | mass number = protons + neutrons | nombre de masse = protons + neutrons | |
| atomicNumber | atomic number = protons | numéro atomique = protons | |
| subtraction | {mass} − {atomic} = {neutrons} neutrons | {mass} − {atomic} = {neutrons} neutrons | |

#### Atoms & the Periodic Table — diagram “Electrons, energy levels…” (sodium)

| Label | English | French | OK / comment |
|---|---|---|---|
| outerLevel | outer level | niveau extérieur | |
| arrangement | {first}, {second}, {third} | {first}, {second}, {third} | |
| electrons | {count} electrons | {count} électrons | |
| countNote | A way to count electrons, not a picture of an atom. | Une façon de compter les électrons, pas une image de l’atome. | |

#### Atoms & the Periodic Table — diagram “Ordered by atomic number”

| Label | English | French | OK / comment |
|---|---|---|---|
| atomicNumber | atomic number | numéro atomique | |
| relativeAtomicMass | relative atomic mass | masse atomique relative | |
| telluriumName | Tellurium | Tellure | |
| telluriumMass | 127.60 | 127,60 | |
| telluriumRank | heavier, but first | plus lourd, mais placé avant | |
| iodineName | Iodine | Iode | |
| iodineMass | 126.90 | 126,90 | |
| iodineRank | lighter, but second | plus léger, mais placé après | |

#### Isotopes & Radioactivity — diagram “Isotopes” (hydrogen)

| Label | English | French | OK / comment |
|---|---|---|---|
| proton | proton | proton | |
| neutron | neutron | neutron | |
| electron | electron | électron | |
| isotopeName | hydrogen-{mass} | hydrogène {mass} | |
| protium | protium | protium | |
| deuterium | deuterium | deutérium | |
| tritium | tritium | tritium | |
| stable | stable | stable | |
| radioactive | radioactive | radioactif | |

#### Isotopes & Radioactivity — diagram “Half-life”

| Label | English | French | OK / comment |
|---|---|---|---|
| axisAmount | undecayed nuclei | noyaux non désintégrés | |
| axisTime | time, in half-lives | temps, en demi-vies | |
| percent0 | 100% | 100 % | |
| percent1 | 50% | 50 % | |
| percent2 | 25% | 25 % | |
| percent3 | 12.5% | 12,5 % | |
| percent4 | 6.25% | 6,25 % | |

#### Diagram states-of-matter/01-particles-in-each-state

| Label | English | French | OK / comment |
|---|---|---|---|
| solid | solid | solide | |
| liquid | liquid | liquide | |
| gas | gas | gaz | |

#### Diagram states-of-matter/02-heating-curve

| Label | English | French | OK / comment |
|---|---|---|---|
| axisTemperature | temperature | température | |
| axisEnergy | energy added | énergie reçue | |
| degrees | {t} °C | {t} °C | |
| melting | melting | fusion | |
| boiling | boiling | ébullition | |
| solid | solid | solide | |
| liquid | liquid | liquide | |
| gas | gas | gaz | |

#### Diagram lewis-structures/01-lewis-structures

| Label | English | French | OK / comment |
|---|---|---|---|
| lonePair | lone pair | doublet non liant | |
| sharedPair | shared pair | doublet liant | |
| water | H₂O | H₂O | |
| ammonia | NH₃ | NH₃ | |
| carbonDioxide | CO₂ | CO₂ | |
| methane | CH₄ | CH₄ | |

#### Diagram lewis-structures/02-vsepr-shapes

| Label | English | French | OK / comment |
|---|---|---|---|
| carbonDioxide | CO₂ | CO₂ | |
| boronTrifluoride | BF₃ | BF₃ | |
| methane | CH₄ | CH₄ | |
| ammonia | NH₃ | NH₃ | |
| water | H₂O | H₂O | |
| linear | linear, 180° | linéaire, 180° | |
| trigonalPlanar | trigonal planar, 120° | triangulaire plane, 120° | |
| tetrahedral | tetrahedral, 109.5° | tétraédrique, 109,5° | |
| trigonalPyramidal | trigonal pyramidal, 107° | pyramidale à base triangulaire, 107° | |
| bent | bent, 104.5° | coudée, 104,5° | |

#### Diagram functional-groups/01-reaction-map

| Label | English | French | OK / comment |
|---|---|---|---|
| alkene | alkene | alcène | |
| haloalkane | haloalkane | halogénoalcane | |
| primaryAlcohol | primary alcohol | alcool primaire | |
| secondaryAlcohol | secondary alcohol | alcool secondaire | |
| aldehyde | aldehyde | aldéhyde | |
| ketone | ketone | cétone | |
| carboxylicAcid | carboxylic acid | acide carboxylique | |
| ester | ester | ester | |
| hydration | H2O, H3PO4 catalyst | H2O, catalyseur H3PO4 | |
| addition | HX | HX | |
| substitution | OH− (aq) | OH− (aq) | |
| oxidation | Cr2O7 2−/H+ | Cr2O7 2−/H+ | |
| esterification | alcohol, H2SO4 catalyst | alcool, catalyseur H2SO4 | |

#### Diagram relative-formula-mass/01-carbon-hydrogen-balance

| Label | English | French | OK / comment |
|---|---|---|---|
| carbonAtom | carbon atom | atome de carbone | |
| hydrogenAtoms | hydrogen atoms | atomes d’hydrogène | |
| notToScale | Not to scale | Échelle non respectée | |

#### Diagram balancing-equations/01-particle-equation

| Label | English | French | OK / comment |
|---|---|---|---|
| reactants | reactants | réactifs | |
| products | products | produits | |
| hydrogen | 2H2 | 2H2 | |
| oxygen | O2 | O2 | |
| water | 2H2O | 2H2O | |

#### Diagram chemical-bonds/01-bonding-models

| Label | English | French | OK / comment |
|---|---|---|---|
| ionic | ionic | liaison ionique | |
| covalent | covalent | liaison covalente | |
| metallic | metallic | liaison métallique | |
| sharedPair | shared pair | doublet liant | |
| delocalised | delocalised electrons | électrons libres | |

#### Diagram acids-and-bases/01-ph-scale

| Label | English | French | OK / comment |
|---|---|---|---|
| stomachAcid | stomach acid | suc gastrique | |
| vinegar | vinegar | vinaigre | |
| pureWater | pure water | eau pure | |
| bakingSoda | baking soda | bicarbonate | |
| ovenCleaner | oven cleaner | décapant four | |

#### Diagram naming-compounds/01-which-system

| Label | English | French | OK / comment |
|---|---|---|---|
| metalNonMetal | metal + non-metal | métal + non-métal | |
| twoNonMetals | two non-metals | deux non-métaux | |
| hydrogenInWater | H first, in water | H en tête, dans l’eau | |
| ionic | ionic | ionique | |
| molecular | molecular | moléculaire | |
| acid | acid | acide | |
| ionicExample | sodium chloride | chlorure de sodium | |
| molecularExample | sulfur dioxide | dioxyde de soufre | |
| acidExample | hydrochloric acid | acide chlorhydrique | |

#### Diagram stoichiometry/01-mole-map

| Label | English | French | OK / comment |
|---|---|---|---|
| mass | mass | masse | |
| particles | particles | nombre d’entités | |
| gasVolume | gas volume | volume de gaz | |
| solution | solution | solution | |
| fromMass | n = m/M | n = m/M | |
| fromParticles | n = N/NA | n = N/NA | |
| fromGasVolume | n = V/Vm | n = V/Vm | |
| fromSolution | n = cV | n = cV | |
| reactantMoles | moles of reactant | quantité de matière du réactif | |
| moleRatio | mole ratio (coefficients) | rapport molaire (coefficients) | |
| productMoles | moles of product | quantité de matière du produit | |

#### Diagram organic-nomenclature/01-numbered-chain

| Label | English | French | OK / comment |
|---|---|---|---|
| hydroxyl | OH | OH | |
| methyl | methyl | méthyle | |
| name | {methylAt}-methylpentan-{hydroxylAt}-ol | {methylAt}-méthylpentan-{hydroxylAt}-ol | |

### Atoms & the Periodic Table

**Key takeaway 3**

English:

> Electrons sit in energy levels, and how many are in the outer level decides which group (column) an element is in.

French, new:

> Les électrons occupent des niveaux d’énergie. Le nombre d’électrons du niveau extérieur décide du groupe (la colonne) dans lequel se trouve l’élément.

French, before:

> Les électrons occupent des niveaux d’énergie. Le nombre d’électrons du niveau extérieur est ce qui range le tableau périodique.

- [ ] OK   Comment:

**Example card 1 (Cl-35): description**

English:

> 17 protons, 18 neutrons

French, new:

> 17 protons, 18 neutrons

- [ ] OK   Comment:

**Example card 2 (Cl-37): description**

English:

> 17 protons, 20 neutrons

French, new:

> 17 protons, 20 neutrons

- [ ] OK   Comment:

**Example card 3 (H+): description**

English:

> a hydrogen atom that has lost its one electron — a bare proton

French, new:

> un atome d’hydrogène qui a perdu son unique électron – il ne reste qu’un proton

- [ ] OK   Comment:

**Diagram description (alt text) in section “What an atom is made of”**

English:

> An atom: a nucleus of three protons (filled circles) and four neutrons (hollow circles), with an electron cloud around it that is densest right next to the nucleus and thins out, with no edge, further away. Three protons and four neutrons would make it lithium-7, but the picture stands for any atom. Labels name the electron cloud, the nucleus, a proton and a neutron. A note says it is not to scale: the nucleus is about 1/100,000 of the atom’s width.

French, new:

> Un atome : un noyau de trois protons (disques pleins) et quatre neutrons (cercles creux), entouré d’un nuage électronique très dense contre le noyau, qui s’éclaircit vers l’extérieur sans bord net. Avec trois protons et quatre neutrons, ce serait du lithium 7, mais le schéma vaut pour n’importe quel atome. Des légendes désignent le nuage électronique, le noyau, un proton et un neutron. Une note précise que l’échelle n’est pas respectée : le noyau mesure environ 1/100 000 du diamètre de l’atome.

French, before:

> Un noyau de protons et de neutrons au centre, entouré d’un nuage flou montrant où les électrons se trouvent probablement. Une note précise que le noyau est dessiné bien trop gros pour être visible.

- [ ] OK   Comment:

**Paragraph of section “Atomic number and mass number”**

English:

> The atomic number is the number of protons, and it is what makes an atom that element. Every chlorine atom has 17 protons; anything with 17 protons is chlorine. The mass number is protons plus neutrons. Neutrons can vary without changing which element it is.

French, new:

> Le numéro atomique est le nombre de protons, et c’est lui qui fait qu’un atome est cet élément. Tout atome de chlore a 17 protons ; tout ce qui a 17 protons est du chlore. Le nombre de masse, c’est les protons plus les neutrons. Le nombre de neutrons peut varier sans changer l’élément.

French, before:

> Le numéro atomique est le nombre de protons, et c’est lui qui fait qu’un atome est cet élément. Tout atome de chlore a 17 protons ; tout ce qui a 17 protons est du chlore. Le nombre de masse, c’est les protons plus les neutrons. Le nombre de neutrons peut varier sans changer l’élément. Les deux mots sont ici un prolongement : le programme de ces années-là n’en nomme aucun, et sans eux tu ne peux pas lire une case du tableau.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Atomic number and mass number”**

English:

> The symbol for chlorine-35: the mass number 35 above the atomic number 17, to the left of Cl. A line joins the 35 to “mass number = protons + neutrons” and another joins the 17 to “atomic number = protons”. Underneath: 35 − 17 = 18 neutrons.

French, new:

> Le symbole du chlore 35 : le nombre de masse 35 au-dessus du numéro atomique 17, à gauche de Cl. Un trait relie 35 à « nombre de masse = protons + neutrons », un autre relie 17 à « numéro atomique = protons ». En dessous : 35 − 17 = 18 neutrons.

French, before:

> Le symbole du chlore 35 avec le nombre de masse 35 écrit au-dessus du numéro atomique 17, et des flèches : 17 protons, et 35 moins 17 donne 18 neutrons.

- [ ] OK   Comment:

**Paragraph of section “Electrons, energy levels and the shape of the table”**

English:

> Electrons occupy energy levels around the nucleus. The first holds up to 2, the next up to 8, then 8 again for the first twenty elements. Your teacher may call these shells; it means the same thing. Counting electrons this way is called the Bohr model: it is useful, and it is not a picture of a real atom. The number in the outer level sets how an atom reacts. Elements are placed in the same group when they have the same outer count, which is why a group behaves alike.

French, new:

> Les électrons occupent des niveaux d’énergie autour du noyau. Le premier en contient jusqu’à 2, le suivant jusqu’à 8, puis 8 encore pour les vingt premiers éléments. Ton prof parle peut-être de couches : c’est la même chose. Compter les électrons ainsi s’appelle le modèle de Bohr : il est utile, et ce n’est pas une image d’un vrai atome. Le nombre d’électrons du niveau extérieur décide de la façon dont un atome réagit. Deux éléments sont dans le même groupe quand ils en ont autant à l’extérieur. C’est pour cela qu’un groupe se comporte de la même manière.

French, before:

> Les électrons occupent des niveaux d’énergie autour du noyau. Le premier en contient jusqu’à 2, le suivant jusqu’à 8, puis 8 encore pour les vingt premiers éléments. Ton prof et le programme disent peut-être couches : c’est la même chose. Compter les électrons ainsi s’appelle le modèle de Bohr : il est utile, et ce n’est pas une image d’un vrai atome. Le nombre d’électrons du niveau extérieur décide de la façon dont un atome réagit. Deux éléments sont dans le même groupe quand ils en ont autant à l’extérieur. C’est pour cela qu’un groupe se comporte de la même manière.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Electrons, energy levels and the shape of the table”**

English:

> Sodium, Na, drawn as a model for counting electrons: a disc marked Na for the nucleus, inside three bands with visible edges that hold 2, 8 and 1 electrons at irregular angles. The single electron in the outer band is circled and labelled “outer level”. Below, the arrangement 2, 8, 1 and the total, 11 electrons. A note says it is a way to count electrons, not a picture of an atom.

French, new:

> Le sodium, Na, dessiné comme un modèle pour compter les électrons : un disque marqué Na pour le noyau, dans trois bandes aux bords visibles qui portent 2, 8 et 1 électrons à des angles irréguliers. L’électron seul de la bande extérieure est entouré d’un cercle, avec la légende « niveau extérieur ». En dessous, l’arrangement 2, 8, 1 et le total, 11 électrons. Une note précise que c’est une façon de compter les électrons, pas une image de l’atome.

French, before:

> Un noyau de sodium de 11 protons et 12 neutrons, entouré de trois bandes floues portant 2, 8 et 1 électrons, dessinés comme des marques à des angles irréguliers et non comme des points sur des cercles. À côté, l’arrangement 2, 8, 1 avec le niveau externe en dernier. La figure précise elle-même qu’elle est une façon de compter les électrons et non une image d’un atome, et que le noyau est dessiné environ 100 000 fois trop gros.

- [ ] OK   Comment:

**Paragraph of section “Groups and periods”**

English:

> A group is a column of the table and a period is a row. Elements in one group have the same number of electrons in their outer level, so the column predicts how an element reacts. Group 1 is the alkali metals, group 17 the halogens and group 18 the noble gases. A period tells you how many energy levels are in use: an element in period 3 uses three of them. So atoms get bigger as you go down to a new row.

French, new:

> Un groupe est une colonne du tableau et une période est une ligne. Les éléments d’un même groupe ont le même nombre d’électrons au niveau extérieur. La colonne prévoit donc la façon dont un élément réagit. Le groupe 1, ce sont les métaux alcalins, le groupe 17 les halogènes et le groupe 18 les gaz nobles. La période dit combien de niveaux d’énergie sont utilisés : un élément de la période 3 en utilise trois. Les atomes sont donc plus gros à chaque nouvelle ligne quand on descend.

French, before:

> Un groupe est une colonne du tableau et une période est une ligne. Les éléments d’un même groupe ont le même nombre d’électrons au niveau extérieur. La colonne prévoit donc la façon dont un élément réagit. Le groupe 1, ce sont les métaux alcalins, le groupe 17 les halogènes et le groupe 18 les gaz nobles. La période dit combien de niveaux d’énergie sont utilisés : un élément de la période 3 en utilise trois. La ligne te dit donc à peu près quelle est la taille de l’atome.

- [ ] OK   Comment:

**Paragraph of section “Metals and non-metals”**

English:

> Metals fill the left and the middle of the table, and non-metals sit in the top right corner. A metal conducts electricity and heat, has a shiny surface, and can be hammered into a sheet without shattering. Almost every metal is solid at room temperature; mercury is the liquid one. A non-metal is usually a poor conductor, dull, and brittle if it is solid at all. Many non-metals are gases. A few elements along the staircase between the two, such as silicon, behave partly like each. They are called metalloids.

French, new:

> Les métaux remplissent la gauche et le milieu du tableau, et les non-métaux occupent le coin en haut à droite. Un métal conduit l’électricité et la chaleur, a une surface brillante, et se laisse marteler en feuille sans se briser. Presque tous les métaux sont solides à température ambiante ; le mercure est celui qui est liquide. Un non-métal conduit mal, est terne, et casse net s’il est solide. Beaucoup de non-métaux sont des gaz. Quelques éléments situés sur l’escalier entre les deux, comme le silicium, se comportent un peu comme l’un et un peu comme l’autre. On les appelle semi-métaux.

French, before:

> Les métaux remplissent la gauche et le milieu du tableau, et les non-métaux occupent le coin en haut à droite. Un métal conduit l’électricité et la chaleur, a une surface brillante, et se laisse marteler en feuille sans se briser. Presque tous les métaux sont solides à température ambiante ; le mercure est celui qui est liquide. Un non-métal conduit mal, est terne, et casse net s’il est solide. Beaucoup de non-métaux sont des gaz. Prolongement : quelques éléments situés sur l’escalier entre les deux, comme le silicium, se comportent un peu comme l’un et un peu comme l’autre. On les appelle semi-métaux, un mot que le programme n’emploie pas.

- [ ] OK   Comment:

**Paragraph of section “Reactivity, and why a group behaves alike”**

English:

> You can test a group by reacting its elements with oxygen, water and acids, and they behave the same way as each other. Group 1 metals react with water and get more violent down the group: lithium fizzes, sodium darts about, potassium catches fire. The same metals with an acid give off hydrogen faster still, which is far too violent to try in a school lab. Group 17 elements run the other way and get less reactive down the group. Group 18 already has a full outer level, so the noble gases react with almost nothing.

French, new:

> Tu peux tester un groupe en faisant réagir ses éléments avec le dioxygène, l’eau et les acides : entre eux, ils se comportent de la même façon. Les métaux du groupe 1 réagissent avec l’eau et deviennent plus violents vers le bas : le lithium pétille, le sodium file à la surface, le potassium prend feu. Les mêmes métaux dégagent du dihydrogène avec un acide, et encore plus vite : c’est bien trop violent pour être fait en classe. Les éléments du groupe 17 vont dans l’autre sens et deviennent moins réactifs vers le bas. Le groupe 18 a déjà un niveau extérieur plein, donc les gaz nobles ne réagissent presque avec rien.

French, before:

> Tu peux tester un groupe en faisant réagir ses éléments avec le dioxygène, l’eau et les acides : entre eux, ils se comportent de la même façon. Les métaux du groupe 1 réagissent avec l’eau et deviennent plus violents vers le bas : le lithium pétille, le sodium file à la surface, le potassium prend feu. Les mêmes métaux dégagent du dihydrogène avec un acide, et encore plus vite. Les éléments du groupe 17 vont dans l’autre sens et deviennent moins réactifs vers le bas. Le groupe 18 a déjà un niveau extérieur plein, donc les gaz nobles ne réagissent presque avec rien.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Ordered by atomic number, not by mass”**

English:

> Two periodic-table cells side by side, with an arrow from the first to the second for the order in the table. Tellurium: atomic number 52, relative atomic mass 127.60, labelled “heavier, but first”. Iodine: atomic number 53, relative atomic mass 126.90, labelled “lighter, but second”. In the tellurium cell the two numbers are labelled atomic number and relative atomic mass.

French, new:

> Deux cases du tableau périodique côte à côte, avec une flèche de la première vers la seconde pour l’ordre dans le tableau. Tellure : numéro atomique 52, masse atomique relative 127,60, avec « plus lourd, mais placé avant ». Iode : numéro atomique 53, masse atomique relative 126,90, avec « plus léger, mais placé après ». Dans la case du tellure, les deux nombres sont légendés numéro atomique et masse atomique relative.

French, before:

> Le tellure et l’iode côte à côte. Le tellure a la masse atomique relative la plus grande mais le numéro atomique le plus petit, et le tableau le place en premier.

- [ ] OK   Comment:


### Isotopes & Radioactivity

**Example card 1 (H-3): name**

English:

> Hydrogen-3 (tritium)

French, new:

> Hydrogène 3 (tritium)

French, before:

> Carbone 12

- [ ] OK   Comment:

**Example card 1 (H-3): description**

English:

> radioactive: half-life about 12 years

French, new:

> radioactif : demi-vie d’environ 12 ans

- [ ] OK   Comment:

**Example card 2 (Rn-222): description**

English:

> decays by giving out an alpha particle

French, new:

> se désintègre en émettant une particule alpha

- [ ] OK   Comment:

**Example card 3 (I-131): description**

English:

> decays by giving out a beta particle

French, new:

> se désintègre en émettant une particule bêta

- [ ] OK   Comment:

**Example card 4 (Co-60): description**

English:

> gives out beta and gamma radiation — used for its gamma

French, new:

> émet des rayonnements bêta et gamma – on l’utilise pour le gamma

- [ ] OK   Comment:

**Example card 5 (C-14): description**

English:

> half-life about 5730 years

French, new:

> demi-vie d’environ 5730 ans

- [ ] OK   Comment:

**Example card 6 (U-238): description**

English:

> half-life about 4.5 billion years

French, new:

> demi-vie d’environ 4,5 milliards d’années

- [ ] OK   Comment:

**Paragraph of section “The two numbers this sheet needs”**

English:

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put. Why an element's relative atomic mass, such as chlorine's 35.5, is not a whole number is on the Relative Atomic & Formula Mass sheet.

French, new:

> Le numéro atomique est le nombre de protons, et c’est lui qui fixe l’élément. Le nombre de masse, c’est les protons plus les neutrons. Toute cette antisèche parle du deuxième nombre qui change pendant que le premier reste en place. Pourquoi la masse atomique relative d’un élément, comme le 35,5 du chlore, n’est pas un nombre entier, c’est expliqué dans l’antisèche « Masse atomique et masse formulaire relatives ».

French, before:

> Le numéro atomique est le nombre de protons, et c’est lui qui fixe l’élément. Le nombre de masse, c’est les protons plus les neutrons. Toute cette antisèche parle du deuxième nombre qui change pendant que le premier reste en place. Les deux mots sont un prolongement : le programme de ces années-là n’en nomme aucun, et sans eux rien ici ne fonctionne.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Isotopes”**

English:

> Three hydrogen atoms, one above another. Each has one proton (a filled circle) and one electron in a soft band around the nucleus. Hydrogen-1 (protium) has no neutrons, hydrogen-2 (deuterium) has one and hydrogen-3 (tritium) has two (hollow circles). Hydrogen-1 and hydrogen-2 are labelled stable, and hydrogen-3 radioactive. Labels name the electron, the proton and the neutron.

French, new:

> Trois atomes d’hydrogène l’un au-dessous de l’autre. Chacun a un proton (cercle plein) et un électron dans une zone floue autour du noyau. L’hydrogène 1 (protium) n’a pas de neutron, l’hydrogène 2 (deutérium) en a un et l’hydrogène 3 (tritium) deux (cercles vides). L’hydrogène 1 et l’hydrogène 2 sont marqués stables, l’hydrogène 3 radioactif. Des étiquettes nomment l’électron, le proton et le neutron.

French, before:

> Trois atomes d’hydrogène côte à côte : un proton, puis un proton et un neutron, puis un proton et deux neutrons. Tous les trois ont un seul électron.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

French, new:

> Certains noyaux sont instables. Ils se désintègrent tout seuls, émettent un rayonnement et laissent derrière eux un atome plus stable. Le radon 222 éjecte une particule alpha, c’est-à-dire deux protons et deux neutrons ensemble. L’iode 131 émet une particule bêta, c’est-à-dire un électron rapide parti du noyau. Le cobalt 60 émet des rayonnements bêta et gamma, et on l’utilise pour son rayonnement gamma, qui est de l’énergie et pas une particule. Une feuille de papier arrête l’alpha et une plaque d’aluminium arrête le bêta. Rien n’arrête complètement le gamma : le plomb ou le béton épais l’atténuent fortement.

French, before:

> Certains noyaux sont instables. Ils se désintègrent tout seuls, émettent un rayonnement et laissent derrière eux un atome plus stable. Le radon 222 éjecte une particule alpha, c’est-à-dire deux protons et deux neutrons ensemble. L’iode 131 émet une particule bêta, c’est-à-dire un électron rapide parti du noyau. Le cobalt 60 émet un rayonnement gamma, qui est de l’énergie et pas une particule. Une feuille de papier arrête l’alpha, une plaque d’aluminium arrête le bêta, et le gamma demande du plomb ou du béton épais.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Half-life”**

English:

> A decay curve of undecayed nuclei against time, in half-lives. It falls from 100 per cent to 50, 25, 12.5 and 6.25 per cent at one, two, three and four half-lives, with a dashed line down to the time axis at each point, and keeps falling after the fourth without reaching zero.

French, new:

> Une courbe de décroissance radioactive : les noyaux non désintégrés en fonction du temps, en demi-vies. Elle tombe de 100 pour cent à 50, 25, 12,5 puis 6,25 pour cent après une, deux, trois et quatre demi-vies, avec à chaque point un trait en pointillés descendant jusqu’à l’axe du temps, et continue de baisser au-delà sans jamais atteindre zéro.

French, before:

> Une courbe de désintégration qui tombe de 100 pour cent à 50, 25 puis 12,5 pour cent après une, deux et trois demi-vies, avec à chaque fois un trait en pointillés descendant jusqu’à l’axe. Après trois demi-vies, il reste un huitième. Une demi-vie vaut 5730 ans pour le carbone 14 et environ 4,5 milliards d’années pour l’uranium 238.

- [ ] OK   Comment:

**Paragraph of section “Elements that had to be made”**

English:

> Elements past uranium have no stable isotopes and are not found in nature in any useful amount. The first few, such as plutonium, are made in nuclear reactors: uranium takes in neutrons, and beta decay then turns it into neptunium and plutonium. The heavier ones are built in accelerators by firing one nucleus at another, sometimes a few atoms at a time. Many last less than a second before they decay. Making them is how the bottom rows of the periodic table were filled in.

French, new:

> Les éléments après l’uranium n’ont aucun isotope stable et ne se trouvent pas dans la nature en quantité utilisable. Les premiers, comme le plutonium, sont produits dans des réacteurs nucléaires : l’uranium y capte des neutrons, puis la désintégration bêta le transforme en neptunium et en plutonium. Les plus lourds sont construits dans des accélérateurs en projetant un noyau sur un autre, parfois quelques atomes à la fois. Beaucoup tiennent moins d’une seconde avant de se désintégrer. C’est en les fabriquant qu’on a rempli les dernières lignes du tableau périodique.

French, before:

> Les éléments après l’uranium n’ont aucun isotope stable et ne se trouvent pas dans la nature. On les construit dans des accélérateurs en projetant un noyau sur un autre, parfois quelques atomes à la fois. Beaucoup tiennent moins d’une seconde avant de se désintégrer. C’est un prolongement : le programme ne demande pas les éléments fabriqués. Ils sont ici parce que c’est ainsi que les dernières lignes du tableau périodique ont été remplies.

- [ ] OK   Comment:


### States of Matter

**Key takeaway 3**

English:

> Gases: particles move freely and are far apart — fills any container, easily compressed.

French, new:

> Gaz : les particules se déplacent librement et sont très éloignées les unes des autres – ils remplissent tout récipient et se compriment facilement.

French, before:

> Gaz : les particules se déplacent librement et vite – ils remplissent tout récipient et se compriment facilement.

- [ ] OK   Comment:

**Heading of section “Particles in each state”**

English:

> Particles in each state

French, new:

> Les trois états à l’échelle microscopique

- [ ] OK   Comment:

**Paragraph of section “Particles in each state”**

English:

> In a solid the particles touch in a regular pattern and vibrate in place. In a liquid they still touch, but they are jumbled and slide past one another; in a gas they are far apart and move freely in every direction. The particles are the same size in all three states: only their arrangement and the spaces between them change.

French, new:

> Dans un solide, les particules se touchent et sont rangées de façon régulière : l’état solide est compact et ordonné, et les particules vibrent sur place. Dans un liquide, elles se touchent encore mais en désordre et glissent les unes sur les autres (compact et désordonné) ; dans un gaz, elles sont très éloignées les unes des autres et se déplacent librement dans toutes les directions (dispersé et désordonné). Les particules ont la même taille dans les trois états : seuls leur disposition et les espaces entre elles changent.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Particles in each state”**

English:

> Three boxes, one above another, with particles of the same size in each. Solid: particles touching in a regular block of rows and columns, resting on the floor of the box. Liquid: the same number of particles, still touching but jumbled, with small gaps, spread across the bottom of the box. Gas: five particles far apart across the whole box, each with two short marks behind it to show that it is moving.

French, new:

> Trois boîtes l’une au-dessus de l’autre, avec des particules de même taille dans chacune. Solide : les particules se touchent et forment un bloc régulier de rangées et de colonnes, posé au fond de la boîte. Liquide : le même nombre de particules, qui se touchent encore mais en désordre, avec de petits espaces, étalées au fond de la boîte. Gaz : cinq particules très éloignées les unes des autres dans toute la boîte, chacune avec deux petits traits derrière elle pour montrer qu’elle se déplace.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Heating and cooling curves”**

English:

> A heating curve for water: temperature up the side and energy added along the bottom, with no numbers on the energy axis. The line climbs steeply through the solid, stays flat at 0 °C for melting, climbs less steeply through the liquid, stays flat at 100 °C for boiling, then climbs steeply again through the gas. The boiling plateau is drawn to scale, almost seven times as long as the melting plateau: about 2260 J against 334 J for each gram.

French, new:

> Une courbe de chauffage de l’eau : la température en ordonnée, l’énergie reçue en abscisse, sans valeurs sur l’axe de l’énergie. La courbe monte fortement pour le solide, présente un palier à 0 °C pendant la fusion, monte moins fortement pour le liquide, présente un palier à 100 °C pendant l’ébullition, puis remonte fortement pour le gaz. Le palier d’ébullition est dessiné à l’échelle, presque sept fois plus long que celui de la fusion : environ 2 260 J contre 334 J par gramme.

- [ ] OK   Comment:


### Acids & Bases

**Key takeaway 2**

English:

> Base: a proton acceptor. Soluble bases (alkalis) release hydroxide ions, OH−, in water. pH > 7.

French, new:

> Base : un accepteur de proton. Les bases solubles libèrent des ions hydroxyde, OH−, dans l’eau. pH > 7.

French, before:

> Base : un accepteur de proton. Les bases solubles libèrent des ions hydroxyde, OH-, dans l’eau. pH > 7.

- [ ] OK   Comment:

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

French, new:

> Neutre : pH 7 à 25 °C – l’eau pure, et les solutions de sels comme NaCl.

French, before:

> Neutre : pH 7 à 25 °C – l’eau pure et la plupart des sels.

- [ ] OK   Comment:

**Key takeaway 4**

English:

> Neutralisation: acid + base → salt + water. The ionic equation is always H+ + OH− → H2O.

French, new:

> Neutralisation : acide + base → sel + eau. L’équation ionique est toujours H+ + OH− → H2O.

French, before:

> Neutralisation : acide + base → sel + eau. L’équation ionique est toujours H+ + OH- → H2O.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

French, new:

> Chaque graduation de l’échelle de pH correspond à un facteur 10 sur la concentration en H+ : à pH 2, la concentration en H+ est 100 fois plus grande qu’à pH 4.

French, before:

> Chaque graduation de l’échelle de pH correspond à un facteur 10 sur la concentration en H+ : un pH 2 est 100 fois plus acide qu’un pH 4.

- [ ] OK   Comment:

**Heading of section “The pH scale”**

English:

> The pH scale

French, new:

> L’échelle de pH

- [ ] OK   Comment:

**Paragraph of section “The pH scale”**

English:

> pH says how acidic or alkaline a solution is. At 25 °C, below 7 is acidic, 7 is neutral and above 7 is alkaline, and most solutions you will meet lie between 0 and 14. Universal indicator turns a different colour at each pH: red at the acidic end, green at 7 and purple at the alkaline end.

French, new:

> Le pH indique si une solution est acide, neutre ou basique. À 25 °C, une solution est acide en dessous de 7, neutre à 7 et basique au-dessus de 7 ; la plupart des solutions que tu rencontreras ont un pH compris entre 0 et 14. L’indicateur universel prend une couleur différente à chaque pH : rouge du côté acide, vert à 7 et violet du côté basique.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The pH scale”**

English:

> The pH scale as a bar from 0 at the top to 14 at the bottom, each step in its universal-indicator colour with its number printed beside it: red at 0, orange at 1, yellow at 2 and 3, green from 4 to 8, blue-green at 9, blue at 10 and 11 and purple from 12 to 14. Five everyday solutions are marked at their pH: stomach acid at 1, vinegar at 3, pure water at 7, baking soda at 8 and oven cleaner at 13.

French, new:

> L’échelle de pH sous forme de barre, de 0 en haut à 14 en bas, chaque graduation dans sa couleur d’indicateur universel, avec son nombre à côté : rouge à 0, orange à 1, jaune à 2 et 3, vert de 4 à 8, bleu-vert à 9, bleu à 10 et 11 et violet de 12 à 14. Cinq produits du quotidien sont placés à leur pH : le suc gastrique à 1, le vinaigre à 3, l’eau pure à 7, le bicarbonate à 8 et le décapant four à 13.

- [ ] OK   Comment:


### Balancing Chemical Equations

**Example card 1 (H2 + O2 -> H2O): name**

English:

> Unbalanced (no states yet)

French, new:

> Non équilibrée (sans symboles d’état pour l’instant)

French, before:

> Non équilibrée

- [ ] OK   Comment:

**Diagram description (alt text) in section “A method that always works”**

English:

> The reaction 2H₂ + O₂ → 2H₂O drawn as particles. On the left, the reactants: two hydrogen molecules, each two touching atoms marked H, plus one oxygen molecule, two touching atoms marked O. An arrow points to the products: two water molecules, each an O atom with two H atoms. The equation is written under the particles, and under that the atoms are counted on each side: H 4 and 4, O 2 and 2.

French, new:

> La réaction 2H₂ + O₂ → 2H₂O représentée par des particules. À gauche, les réactifs : deux molécules de dihydrogène, chacune formée de deux atomes marqués H qui se touchent, plus une molécule de dioxygène, deux atomes marqués O. Une flèche mène aux produits : deux molécules d’eau, chacune un atome O lié à deux atomes H. L’équation est écrite sous les particules et, en dessous, les atomes sont comptés de chaque côté : H 4 et 4, O 2 et 2.

- [ ] OK   Comment:


### Types of Chemical Reactions

**Key takeaway 3**

English:

> Combustion: fuel + oxygen → carbon dioxide + water (for a hydrocarbon fuel, burning completely) — releases heat.

French, new:

> Combustion : combustible + dioxygène → dioxyde de carbone + eau (pour un hydrocarbure, en combustion complète) – de la chaleur est libérée.

French, before:

> Combustion : combustible + dioxygène → dioxyde de carbone + eau (combustion complète) – de la chaleur est libérée.

- [ ] OK   Comment:


### Chemical Bonds & Structure

**Key takeaway 1**

English:

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons; helium, in group 18, has only 2).

French, new:

> Les atomes se lient pour atteindre une couche externe stable et complète (la configuration d’un gaz noble). Pour un élément d’un groupe principal, le chiffre des unités du numéro du groupe donne le nombre d’électrons de valence (Cl est dans le groupe 17 : 7 électrons de valence ; l’hélium, dans le groupe 18, n’en a que 2).

French, before:

> Les atomes se lient pour atteindre une couche externe stable et complète (la configuration d’un gaz noble). Pour un élément d’un groupe principal, le numéro de colonne donne le nombre d’électrons de valence.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Why ionic compounds conduct only when molten or dissolved”**

English:

> Three boxes, one above another. Ionic: a grid of small positive ions and large negative ions, alternating, each marked + or −. Covalent: one hydrogen molecule, two atoms marked H whose circles overlap, with two electron dots in the overlap, labelled shared pair. Metallic: a grid of positive metal ions with as many small electron dots scattered between them, labelled delocalised electrons.

French, new:

> Trois cadres, l’un sous l’autre. Liaison ionique : un réseau de petits ions positifs et de gros ions négatifs qui alternent, chacun marqué + ou −. Liaison covalente : une molécule de dihydrogène, deux atomes marqués H dont les cercles se chevauchent, avec deux points (les électrons) dans la zone commune, légendés doublet liant. Liaison métallique : un réseau d’ions métalliques positifs, avec autant de petits points (les électrons) dispersés entre eux, légendés électrons libres.

- [ ] OK   Comment:


### Writing Ionic Formulas

**Key takeaway 2**

English:

> Write the cation (metal or NH4+) first, then the anion.

French, new:

> Écris le cation (le métal ou NH4+) en premier dans la formule, puis l’anion – même si le nom commence par l’anion : chlorure de sodium, NaCl.

French, before:

> Écris le cation (le métal ou NH4+) en premier dans la formule, puis l’anion.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Worked example: aluminium sulfate”**

English:

> Aluminium sulfate by the cross-over method. At the top, the aluminium ion Al³⁺, labelled cation, and the sulfate ion SO₄²⁻, labelled anion. Two crossing arrows carry each charge number down to become the other ion’s subscript: the 3 of Al³⁺ becomes the 3 after the bracketed sulfate, and the 2 of SO₄²⁻ becomes the 2 after Al. At the bottom, the formula Al₂(SO₄)₃, and the check: 2 × (+3) = +6 and 3 × (−2) = −6.

French, new:

> Le sulfate d’aluminium par la méthode de la croix. En haut, l’ion aluminium Al³⁺, marqué « cation », et l’ion sulfate SO₄²⁻, marqué « anion ». Deux flèches qui se croisent font descendre chaque nombre de charges, qui devient l’indice de l’autre ion : le 3 de Al³⁺ devient le 3 après le sulfate entre parenthèses, et le 2 de SO₄²⁻ devient le 2 après Al. En bas, la formule statistique Al₂(SO₄)₃ et la vérification : 2 × (+3) = +6 et 3 × (−2) = −6.

- [ ] OK   Comment:

**Paragraph of section “Common ion charges from the periodic table”**

English:

> Group 1 → +1, Group 2 → +2, Al → +3, Group 17 → −1, Group 16 → −2, N and P → −3. Transition metals vary — the name will tell you. For polyatomic ions use the lookup table.

French, new:

> Groupe 1 → +1, groupe 2 → +2, Al → +3, groupe 17 → −1, groupe 16 → −2, N et P → −3. Les métaux de transition varient – le nom te le dit. Pour les ions polyatomiques, utilise le tableau de référence.

French, before:

> Colonne 1 → +1, colonne 2 → +2, Al → +3, colonne 17 → −1, colonne 16 → −2, N et P → −3. Les métaux de transition varient – le nom te le dit. Pour les ions polyatomiques, utilise le tableau de référence.

- [ ] OK   Comment:


### Polyatomic Ions

**Key takeaway 2**

English:

> The only common polyatomic cation is ammonium, NH4+ (apart from hydronium, H3O+, which you meet in acids). All the rest are anions.

French, new:

> Le seul cation polyatomique courant est l’ammonium, NH4+ (à part l’ion oxonium, H3O+, que tu rencontres avec les acides). Tous les autres sont des anions.

French, before:

> Le seul cation polyatomique courant est l’ammonium, NH4+. Tous les autres sont des anions.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Adding H+ to an anion makes its charge one less negative and adds "hydrogen" to the name: carbonate CO3 2− → hydrogen carbonate HCO3−.

French, new:

> Ajouter un H+ à un anion rend sa charge moins négative d’une unité et met « hydrogéno » devant son nom : carbonate CO3 2− → hydrogénocarbonate HCO3−.

French, before:

> Ajouter un H+ à un anion augmente sa charge de un et met « hydrogéno » devant son nom : carbonate CO3 2− → hydrogénocarbonate HCO3−.

- [ ] OK   Comment:

**Paragraph of section “Where they show up”**

English:

> Acids: sulfuric acid is H2SO4 because sulfate is 2−; nitric acid is HNO3 because nitrate is 1−. Precipitation: all nitrates and all ammonium salts are soluble, so they are the usual "spectator" partners. Redox: permanganate and dichromate are the classic oxidising agents.

French, new:

> Les acides : l’acide sulfurique est H2SO4 parce que le sulfate porte 2− ; l’acide nitrique est HNO3 parce que le nitrate porte 1−. La précipitation : tous les nitrates et tous les sels d’ammonium sont solubles, ce sont donc les ions spectateurs habituels. L’oxydoréduction : le permanganate et le dichromate sont les oxydants classiques.

French, before:

> Les acides : l’acide sulfurique est H2SO4 parce que le sulfate porte 2− ; l’acide nitrique est HNO3 parce que le nitrate porte 1−. La précipitation : presque tous les nitrates et tous les sels d’ammonium sont solubles, ce sont donc les ions spectateurs habituels. L’oxydoréduction : le permanganate et le dichromate sont les oxydants classiques.

- [ ] OK   Comment:

**Heading of table “Polyatomic ions (VCE data book set)”**

English:

> Polyatomic ions (VCE data book set)

French, new:

> Les principaux ions polyatomiques

French, before:

> Ions polyatomiques (sélection du livret de données du VCE)

- [ ] OK   Comment:

**Common mistake 3**

English:

> Confusing the charge (2−) with the number of oxygens — sulfate has 4 O and charge 2−.

French, new:

> Confondre la charge (2−) avec le nombre d’atomes d’oxygène – le sulfate a 4 O et une charge de 2−.

French, before:

> Confondre la charge (−2) avec le nombre d’atomes d’oxygène – le sulfate a 4 O et une charge de 2−.

- [ ] OK   Comment:


### Naming Inorganic Compounds

**Heading of section “Which naming system?”**

English:

> Which naming system?

French, new:

> Quel système de nommage ?

- [ ] OK   Comment:

**Paragraph of section “Which naming system?”**

English:

> Look at what the compound is made of before you name it. A metal (or NH4+) with a non-metal is ionic: the cation, then the anion, with no prefixes. Two non-metals make a molecular compound, named with Greek prefixes — but if H comes first and it is dissolved in water, it is an acid, and acids have names of their own.

French, new:

> Regarde d’abord de quoi le composé est fait. Un métal (ou NH4+) avec un non-métal donne un composé ionique : l’anion d’abord, puis « de » et le cation, sans préfixe – chlorure de sodium. Deux non-métaux donnent un composé moléculaire, nommé avec des préfixes grecs (dioxyde de soufre) ; mais si H vient en tête et que le composé est dissous dans l’eau, c’est un acide, nommé d’après son anion : acide chlorhydrique.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Which naming system?”**

English:

> A flowchart for choosing a naming system. Metal + non-metal leads to ionic, for example sodium chloride. Two non-metals leads to molecular, for example sulfur dioxide. An arrow down from two non-metals leads to H first, in water, and from there to acid, for example hydrochloric acid.

French, new:

> Un organigramme pour choisir le système de nommage. De « métal + non-métal », une flèche mène à « ionique », par exemple chlorure de sodium. De « deux non-métaux », une flèche mène à « moléculaire », par exemple dioxyde de soufre. De « deux non-métaux », une autre flèche descend vers « H en tête, dans l’eau », puis mène à « acide », par exemple acide chlorhydrique.

- [ ] OK   Comment:

**Paragraph of section “Working out a Roman numeral”**

English:

> For Fe2(SO4)3: sulfate is 2−, and there are three, so the anions total −6. Two iron ions must total +6, so each is +3 → iron(III) sulfate. Only metals with more than one common charge (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni) need the numeral; Group 1, Group 2, Al, Zn and Ag never do.

French, new:

> Pour Fe2(SO4)3 : le sulfate porte 2−, et il y en a trois, donc les anions totalisent −6. Les deux ions fer doivent totaliser +6, chacun est donc en +3 → sulfate de fer(III). Seuls les métaux qui ont plus d’une charge courante (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni) ont besoin du chiffre ; le groupe 1, le groupe 2, Al, Zn et Ag n’en ont jamais besoin.

- [ ] OK   Comment:


### Relative Atomic & Formula Mass

**Example card 1 (H2O): description**

English:

> 2 × 1 + 16 = 18

French, new:

> 2 × 1 + 16 = 18

- [ ] OK   Comment:

**Example card 2 (CO2): description**

English:

> 12 + 2 × 16 = 44

French, new:

> 12 + 2 × 16 = 44

- [ ] OK   Comment:

**Example card 3 (CaCO3): description**

English:

> 40 + 12 + 3 × 16 = 100

French, new:

> 40 + 12 + 3 × 16 = 100

- [ ] OK   Comment:

**Example card 4 (Mg(OH)2): description**

English:

> 24 + 2 × (16 + 1) = 58

French, new:

> 24 + 2 × (16 + 1) = 58

- [ ] OK   Comment:

**Example card 5 (Ca(NO3)2): description**

English:

> 40 + 2 × (14 + 3 × 16) = 164

French, new:

> 40 + 2 × (14 + 3 × 16) = 164

- [ ] OK   Comment:

**Diagram description (alt text) in section “What "relative" actually means”**

English:

> A balance with two hanging pans, level. On the left pan is one carbon atom, a circle marked C. On the right pan are twelve hydrogen atoms, smaller circles marked H, piled in rows of five, four and three. Carbon is drawn bigger than hydrogen, but nowhere near twelve times the size. Labels under the pans say 1 carbon atom and 12 hydrogen atoms, and a note says the picture is not to scale.

French, new:

> Une balance à deux plateaux suspendus, en équilibre. Sur le plateau de gauche, un atome de carbone, un cercle marqué C. Sur celui de droite, douze atomes d’hydrogène, des cercles plus petits marqués H, empilés en rangées de cinq, quatre et trois. Le carbone est dessiné plus gros que l’hydrogène, mais loin d’être douze fois plus gros. Sous les plateaux, on lit « 1 atome de carbone » et « 12 atomes d’hydrogène », et une mention précise que l’échelle n’est pas respectée.

- [ ] OK   Comment:

**Example card 1 in section “Adding the atoms up”: description**

English:

> 14 + 3 × 1 = 17

French, new:

> 14 + 3 × 1 = 17

- [ ] OK   Comment:

**Example card 2 in section “Adding the atoms up”: description**

English:

> 12 + 4 × 1 = 16

French, new:

> 12 + 4 × 1 = 16

- [ ] OK   Comment:

**Example card 3 in section “Adding the atoms up”: description**

English:

> 2 × 1 + 32 + 4 × 16 = 98

French, new:

> 2 × 1 + 32 + 4 × 16 = 98

- [ ] OK   Comment:

**Example card 1 in section “Subscripts and brackets”: description**

English:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

French, new:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 9, column 3**

English:

> 35.5

French, new:

> 35,5

French, before:

> 35.5

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 13, column 3**

English:

> 63.5

French, new:

> 63,5

French, before:

> 63.5

- [ ] OK   Comment:

**Table “Worked examples”, row 1, column 2**

English:

> 2 × 1

French, new:

> 2 × 1

French, before:

> 2 x 1

- [ ] OK   Comment:

**Table “Worked examples”, row 2, column 2**

English:

> 2 × 16

French, new:

> 2 × 16

French, before:

> 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 3, column 2**

English:

> 2 × 1 + 16

French, new:

> 2 × 1 + 16

French, before:

> 2 x 1 + 16

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 2**

English:

> 23 + 35.5

French, new:

> 23 + 35,5

French, before:

> 23 + 35.5

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 3**

English:

> 58.5

French, new:

> 58,5

French, before:

> 58.5

- [ ] OK   Comment:

**Table “Worked examples”, row 6, column 2**

English:

> 12 + 2 × 16

French, new:

> 12 + 2 × 16

French, before:

> 12 + 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 7, column 2**

English:

> 40 + 12 + 3 × 16

French, new:

> 40 + 12 + 3 × 16

French, before:

> 40 + 12 + 3 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 8, column 2**

English:

> 2 × 1 + 32 + 4 × 16

French, new:

> 2 × 1 + 32 + 4 × 16

French, before:

> 2 x 1 + 32 + 4 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 9, column 2**

English:

> 24 + 2 × (16 + 1)

French, new:

> 24 + 2 × (16 + 1)

French, before:

> 24 + 2 x (16 + 1)

- [ ] OK   Comment:

**Table “Worked examples”, row 10, column 2**

English:

> 40 + 2 × (14 + 3 × 16)

French, new:

> 40 + 2 × (14 + 3 × 16)

French, before:

> 40 + 2 x (14 + 3 x 16)

- [ ] OK   Comment:

**Common mistake 1**

English:

> Saying an atom of carbon "weighs 12" — 12 what? Ar is a comparison and has no unit. Grams only appear once you scale up to a real amount.

French, new:

> Dire qu’un atome de carbone « pèse 12 » — 12 quoi ? Ar est une comparaison et n’a pas d’unité. Les grammes n’arrivent qu’au moment où tu passes à une quantité réelle.

- [ ] OK   Comment:


### The Mole & Stoichiometry

**Key takeaway 1**

English:

> One mole is 6.02 × 10²³ particles (Avogadro's number, N_A). Molar mass M (g/mol) is the mass of one mole — add up the atomic masses from the periodic table.

French, new:

> Une mole, c’est 6,02 × 10²³ entités (constante d’Avogadro, N_A). La masse molaire M (g/mol) est la masse d’une mole – additionne les masses atomiques lues dans le tableau périodique.

French, before:

> Une mole, c’est 6,02 × 10^23 entités (constante d’Avogadro, N_A). La masse molaire M (g/mol) est la masse d’une mole – additionne les masses atomiques lues dans le tableau périodique.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Worked example: mass → mass”**

English:

> The mole map. Four boxes down the left, mass, particles, gas volume and solution, are each joined to a tall box, moles of reactant, by a two-way arrow carrying its formula: n = m/M, n = N/N_A, n = V/V_m and n = cV. From moles of reactant, an arrow labelled mole ratio (coefficients) leads down to moles of product.

French, new:

> La carte des conversions par la quantité de matière. À gauche, quatre cases l’une sous l’autre – masse, nombre d’entités, volume de gaz et solution – sont reliées chacune à une grande case, « quantité de matière du réactif », par une double flèche qui porte sa formule : n = m/M, n = N/N_A, n = V/V_m et n = cV. De la quantité de matière du réactif, une flèche marquée « rapport molaire (coefficients) » descend vers la quantité de matière du produit.

- [ ] OK   Comment:

**Table “The conversion formulas”, row 4, column 2**

English:

> volume of a gas at SLC

French, new:

> le volume d’un gaz à 25 °C et 100 kPa

French, before:

> le volume d’un gaz dans les conditions SLC

- [ ] OK   Comment:

**Common mistake 4**

English:

> Rounding early — keep full precision until the final answer, then round to the same number of significant figures as the least precise value you were given.

French, new:

> Arrondir trop tôt – garde toute la précision jusqu’au résultat final, puis arrondis-le avec autant de chiffres significatifs que la donnée la moins précise.

French, before:

> Arrondir trop tôt – garde toute la précision jusqu’au résultat final, puis donne trois chiffres significatifs.

- [ ] OK   Comment:


### Lewis Structures

**Key takeaway 1**

English:

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17; helium, in group 18, has only 2). Add one electron per negative charge, remove one per positive charge.

French, new:

> Électrons de valence = chiffre des unités du numéro du groupe pour les éléments des groupes principaux (H 1, C 4, N 5, O 6, halogènes 7 – l’azote est dans le groupe 15, le chlore dans le groupe 17 ; l’hélium, dans le groupe 18, n’en a que 2). Ajoute un électron par charge négative, enlève-en un par charge positive.

French, before:

> Électrons de valence = numéro de colonne pour les éléments des groupes principaux (H 1, C 4, N 5, O 6, halogènes 7). Ajoute un électron par charge négative, enlève-en un par charge positive.

- [ ] OK   Comment:

**Paragraph of section “Year 10 essentials”**

English:

> Every atom brings its outer electrons as dots. A dot on its own is an unpaired electron (a "loner"); two loners from two different atoms make a shared pair, which is one bond (drawn as a line). Pairs that stay on one atom are lone pairs. An atom is full at 8 dots around it (an octet) — hydrogen is full at 2 (a duet). Share twice between the same two atoms for a double bond, three times for a triple. The number of loners tells you how many bonds an atom makes: H 1, C 4, N 3, O 2, Cl 1. Sulfur behaves like oxygen and phosphorus like nitrogen because they are in the same groups. Everything below this section (formal charge, VSEPR shapes, octet exceptions) is Senior content.

French, new:

> Chaque atome apporte ses électrons externes sous forme de points. Un point tout seul est un électron célibataire ; deux électrons célibataires venant de deux atomes différents forment un doublet partagé, c’est-à-dire une liaison (dessinée par un trait). Les doublets qui restent sur un seul atome sont des doublets non liants. Un atome est complet avec 8 points autour de lui (un octet) – l’hydrogène est complet à 2 (un duet). Partage deux fois entre les deux mêmes atomes pour une liaison double, trois fois pour une liaison triple. Le nombre d’électrons célibataires te dit combien de liaisons un atome forme : H 1, C 4, N 3, O 2, Cl 1. Le soufre se comporte comme l’oxygène et le phosphore comme l’azote, parce qu’ils sont dans les mêmes groupes. Tout ce qui suit cette section (charge formelle, formes VSEPR, exceptions à l’octet) relève du lycée.

French, before:

> Chaque atome apporte ses électrons externes sous forme de points. Un point tout seul est un solitaire ; deux solitaires venant de deux atomes différents forment un doublet partagé, c’est-à-dire une liaison (dessinée par un trait). Les doublets qui restent sur un seul atome sont des doublets non liants. Un atome est complet avec 8 points autour de lui (un octet) – l’hydrogène est complet à 2 (un duet). Partage deux fois entre les deux mêmes atomes pour une liaison double, trois fois pour une liaison triple. Le nombre de solitaires te dit combien de liaisons un atome forme : H 1, C 4, N 3, O 2, Cl 1. Le soufre se comporte comme l’oxygène et le phosphore comme l’azote, parce qu’ils sont dans les mêmes colonnes. Tout ce qui suit cette section (charge formelle, formes VSEPR, exceptions à l’octet) relève du lycée.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Year 10 essentials”**

English:

> Lewis structures of four molecules, each with its formula underneath. Water, H₂O: H–O–H with two lone pairs on the oxygen, one above it and one below. Ammonia, NH₃: nitrogen with single bonds to three hydrogens and one lone pair. Carbon dioxide, CO₂: O=C=O, two double bonds, with two lone pairs on each oxygen and none on the carbon. Methane, CH₄: carbon with single bonds to four hydrogens and no lone pairs. Bonds are lines and lone pairs are pairs of dots. Labels point to one lone pair, on the oxygen in water, and to one shared pair, a bond in ammonia.

French, new:

> Les structures de Lewis de quatre molécules, chacune avec sa formule en dessous. Eau, H₂O : H–O–H avec deux doublets non liants sur l’oxygène, un au-dessus et un en dessous. Ammoniac, NH₃ : l’azote lié à trois hydrogènes par des liaisons simples, avec un doublet non liant. Dioxyde de carbone, CO₂ : O=C=O, deux liaisons doubles, avec deux doublets non liants sur chaque oxygène et aucun sur le carbone. Méthane, CH₄ : le carbone lié à quatre hydrogènes par des liaisons simples, sans doublet non liant. Les liaisons sont des traits et les doublets non liants des paires de points. Des étiquettes désignent un doublet non liant, sur l’oxygène de l’eau, et un doublet liant, une liaison de l’ammoniac.

- [ ] OK   Comment:

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

French, new:

> Méthane – le carbone partage ses quatre électrons célibataires

French, before:

> Méthane – le carbone partage ses quatre solitaires

- [ ] OK   Comment:

**Diagram description (alt text) in section “From Lewis structure to shape (VSEPR)”**

English:

> The five VSEPR shapes, each with its formula, shape and bond angle underneath, drawn in 3D: a solid wedge is a bond coming out of the page and a hashed wedge a bond going behind it. CO₂ is linear, 180°. BF₃ is trigonal planar, 120°. CH₄ is tetrahedral, 109.5°. NH₃ is trigonal pyramidal, 107°, with its lone pair drawn as a lobe on the nitrogen. H₂O is bent, 104.5°, with two lone-pair lobes on the oxygen. NH₃ and H₂O are drawn like CH₄ with one, then two, of its bonds replaced by a lone pair. A small arc marks the angle between the two bonds that lie in the page.

French, new:

> Les cinq géométries VSEPR, chacune avec sa formule, sa géométrie et son angle de liaison en dessous, dessinées en représentation de Cram : un triangle plein est une liaison qui sort du plan vers l’avant, un triangle hachuré une liaison qui part vers l’arrière. CO₂ : linéaire, 180°. BF₃ : triangulaire plane, 120°. CH₄ : tétraédrique, 109,5°. NH₃ : pyramidale à base triangulaire, 107°, avec son doublet non liant dessiné comme un lobe sur l’azote. H₂O : coudée, 104,5°, avec deux lobes sur l’oxygène. NH₃ et H₂O sont dessinées comme CH₄, avec une puis deux de ses liaisons remplacées par un doublet non liant. Un petit arc marque l’angle entre les deux liaisons situées dans le plan de la page.

- [ ] OK   Comment:

**Heading of table “Valence electrons by group”**

English:

> Valence electrons by group

French, new:

> Électrons de valence par groupe

French, before:

> Électrons de valence par colonne

- [ ] OK   Comment:

**Column 1 header of table “Valence electrons by group”**

English:

> Group

French, new:

> Groupe

French, before:

> Colonne

- [ ] OK   Comment:


### Naming Organic Compounds

**Diagram description (alt text) in section “Worked example”**

English:

> The skeletal structure of 3-methylpentan-2-ol: a zigzag chain of five carbons, numbered 1 to 5 from left to right, with OH at the end of a bond up from carbon 2 and a methyl group as a short line down from carbon 3, labelled methyl. Underneath, the name 3-methylpentan-2-ol.

French, new:

> La formule topologique du 3-méthylpentan-2-ol : une chaîne en zigzag de cinq carbones, numérotés de 1 à 5 de gauche à droite. Sur le carbone 2, une liaison monte vers OH ; sur le carbone 3, un trait court descend : c’est le groupe méthyle, marqué « méthyle ». En dessous, le nom 3-méthylpentan-2-ol.

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 1**

English:

> Amide

French, new:

> Amide

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 2**

English:

> -amide

French, new:

> -amide

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 3**

English:

> ethanamide

French, new:

> éthanamide

- [ ] OK   Comment:

**Common mistake 4**

English:

> Forgetting the locant for -ene, -ol or -one whenever the group could sit in more than one position (propan-1-ol vs propan-2-ol).

French, new:

> Oublier le numéro de position de -ène, -ol ou -one dès que le groupe peut occuper plusieurs positions (propan-1-ol ou propan-2-ol).

French, before:

> Oublier le numéro de position de -ène, -ol ou -one quand la chaîne a 4 carbones ou plus.

- [ ] OK   Comment:


### Functional Groups

**Paragraph of section “The reaction pathway you must know”**

English:

> Alkene → (H₂O, H₃PO₄ catalyst) → alcohol. Alkene → (HX) → haloalkane → (OH⁻(aq)) → alcohol → (Cr₂O₇²⁻/H⁺) → aldehyde → (further oxidation) → carboxylic acid → (alcohol, H₂SO₄ catalyst) → ester. Primary alcohols oxidise twice, secondary alcohols oxidise once to ketones, tertiary alcohols do not oxidise.

French, new:

> Alcène → (H₂O, catalyseur H₃PO₄) → alcool. Alcène → (HX) → halogénoalcane → (OH⁻(aq)) → alcool → (Cr₂O₇²⁻/H⁺) → aldéhyde → (oxydation supplémentaire) → acide carboxylique → (alcool, catalyseur H₂SO₄) → ester. Les alcools primaires s’oxydent deux fois, les alcools secondaires une fois en cétone, les alcools tertiaires ne s’oxydent pas.

French, before:

> Alcène → (H2O, catalyseur H+) → alcool. Alcène → (HX) → halogénoalcane → (OH−) → alcool → (Cr2O7 2−/H+) → aldéhyde → (oxydation supplémentaire) → acide carboxylique → (alcool, catalyseur H2SO4) → ester. Les alcools primaires s’oxydent deux fois, les alcools secondaires une fois en cétone, les alcools tertiaires ne s’oxydent pas.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The reaction pathway you must know”**

English:

> A reaction map, read from the top down. Down the left: an alkene gives a primary alcohol with H₂O and an H₃PO₄ catalyst; the primary alcohol gives an aldehyde with Cr₂O₇²⁻/H⁺, the aldehyde a carboxylic acid with Cr₂O₇²⁻/H⁺, and the carboxylic acid an ester with an alcohol and an H₂SO₄ catalyst. On the right: the alkene can instead take HX to give a haloalkane, which gives the same primary alcohol with OH⁻(aq); and beside the primary alcohol, a secondary alcohol oxidises to a ketone with Cr₂O₇²⁻/H⁺.

French, new:

> Une carte des réactions, à lire de haut en bas. À gauche : un alcène donne un alcool primaire avec H₂O et le catalyseur H₃PO₄ ; l’alcool primaire donne un aldéhyde avec Cr₂O₇²⁻/H⁺, l’aldéhyde un acide carboxylique avec Cr₂O₇²⁻/H⁺, et l’acide carboxylique un ester avec un alcool et le catalyseur H₂SO₄. À droite : l’alcène peut aussi donner un halogénoalcane avec HX, qui donne le même alcool primaire avec OH⁻(aq) ; et à côté de l’alcool primaire, un alcool secondaire s’oxyde en cétone avec Cr₂O₇²⁻/H⁺.

- [ ] OK   Comment:

**Paragraph of section “Spotting groups in a spectrum”**

English:

> IR: a broad O–H stretch around 3200–3550 cm⁻¹ means alcohol (or, very broad and overlapping C–H, carboxylic acid); a strong C=O near 1670–1750 cm⁻¹ means aldehyde, ketone, acid, ester or amide. The VCE data book lists the exact ranges — use it.

French, new:

> IR : une bande O–H large vers 3200–3550 cm⁻¹ signale un alcool (ou, très large et superposée aux C–H, un acide carboxylique) ; une bande C=O intense vers 1670–1750 cm⁻¹ signale un aldéhyde, une cétone, un acide, un ester ou un amide. Les intervalles exacts figurent dans une table de données IR – sers-t’en.

French, before:

> IR : une bande O–H large vers 3200–3550 cm⁻¹ signale un alcool (ou, très large et superposée aux C–H, un acide carboxylique) ; une bande C=O intense vers 1670–1750 cm⁻¹ signale un aldéhyde, une cétone, un acide, un ester ou un amide. Les intervalles exacts sont dans le livret de données du VCE – sers-t’en.

- [ ] OK   Comment:

**Common mistake 1**

English:

> Calling a molecule with –OH on a benzene ring an alcohol (it is a phenol) — a common trap.

French, new:

> Appeler alcool une molécule qui porte un –OH sur un cycle benzénique (c’est un phénol) – c’est un piège classique.

French, before:

> Appeler alcool une molécule qui porte un –OH sur un cycle benzénique (c’est un phénol) – hors programme VCE, mais c’est un piège classique.

- [ ] OK   Comment:


---

## Spanish (es): 93 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-es.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 años*. The RAE (*Ortografía*, 2010) writes four-digit numbers without the space; it starts at five digits (*65 000*). |
| billion (10⁹) | **mil millones**, so 4.5 billion years is *4500 millones de años*. Never *billón*, which in Spanish is 10¹² — a thousand times too old for uranium-238. |
| pH scale | **escala de pH** | Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| the pH scale's everyday examples (diagram labels) | **jugo gástrico** (1), **vinagre** (3), **agua pura** (7), **bicarbonato** (8), **limpiahornos** (13) | The words the sheet's own pH table uses, each at the same pH band as the English. *Jugo gástrico* is the school term in Spain as well as in Latin America. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| particle | **partícula** | Added 2026-09-25 for the States of Matter diagrams. |
| melting / boiling (a heating curve's plateaus) | **fusión / ebullición** | As in the sheet's table of phase changes. Added 2026-09-25 for the States of Matter diagrams. |
| heating curve | **curva de calentamiento** | Matches the sheet's section heading. Added 2026-09-25 for the States of Matter diagrams. |
| energy added (a graph's axis) | **energía suministrada** | Spanish textbooks label this axis *calor suministrado*; *energía* keeps the sheet's word. *Energía añadida* is a calque. Added 2026-09-25 for the States of Matter diagrams. |
| VSEPR shapes: linear, trigonal planar, tetrahedral, trigonal pyramidal, bent | **lineal, triangular plana, tetraédrica, piramidal trigonal, angular** | Added 2026-09-25 with the Lewis sheet's shape diagram (`lewis-structures/02-vsepr-shapes`). Feminine, agreeing with *geometría*, as a Bachillerato textbook writes them, and the ones the sheet's RPECV paragraph already used. *Trigonal plana* is also seen. The model is **RPECV** in Spanish, never *VSEPR* in running text. Angles: *109,5°*. |
| bond angle | **ángulo de enlace** | Added 2026-09-25. |
| wedge / hashed wedge (a bond towards / away from the viewer) | **cuña rellena / cuña rayada** | Added 2026-09-25, for alt text. |
| lone-pair lobe (in a VSEPR drawing) | **lóbulo** | Added 2026-09-25, for alt text. |
| electron shell (the curriculum's word) | **capa electrónica** | VC2S10U07 says "electron shells", so the sheet names *capa* once as the word the reader's teacher uses, and keeps *nivel de energía* as its own term. Since 2026-09-25 the sentence is *Puede que en clase oigas llamarlos capas*: it credits the word to the classroom alone, no longer to the curriculum, and it avoids a gendered *tu profesor*. |
| valence electrons from the group number | **la última cifra del número de grupo** (*el Cl está en el grupo 17: 7 electrones de valencia*) | Added 2026-09-25. Spanish textbooks number the groups 1–18, where *número de grupo = electrones de valencia* only holds for groups 1 and 2. The bonding and Lewis sheets now state the last-digit rule. |
| beta decay | **desintegración beta** | Added 2026-09-25, for how reactors make neptunium and plutonium. Matches *partícula beta*. |
| shielding gamma ("reduces, never stops") | **atenuar**: *el plomo o el hormigón grueso la atenúan mucho* | Added 2026-09-24. *Atenuación* is the textbook word for gamma passing through matter; alpha and beta keep *detener*. |
| electron cloud (diagram label) | **nube electrónica** | Added 2026-09-25 with the redrawn atom diagrams. The standard term in ESO textbooks. |
| not to scale (diagram caveat) | **No está a escala**, and the ratio as **1/100 000 del diámetro del átomo** | Added 2026-09-25 with the redrawn atom diagrams. Says *diámetro*, because by volume the ratio is about 10⁻¹⁵. *100 000 veces menor* was rejected: common, but it does not say what is compared, and *veces menor* is a construction style guides object to. |
| heavier, but first / lighter, but second (06) | **más pesado, pero va antes** / **más ligero, pero va después** | Added 2026-09-25 with the redrawn atom diagrams. *Ir antes / después* is how a Spanish classroom says where an element sits in the table. |
| a cell of the periodic table | **casilla** | Added 2026-09-25 with the redrawn atom diagrams. |
| percentages | **12,5 %**, with a no-break space (U+00A0) before the sign | Added 2026-09-25 with the redrawn isotope diagrams. The glossary was silent. The RAE's *Ortografía* (2010) writes a space between the number and *%*, and current Spanish textbooks follow it, so Spanish joins de, fr and ru here, not it. |
| hydrogen-1, -2, -3 (03) | **hidrógeno-1**, **hidrógeno-2**, **hidrógeno-3** | Added 2026-09-25 with the redrawn isotope diagrams. With a hyphen, following the *carbono-14* row above. |
| protium / deuterium / tritium (03) | **protio** / **deuterio** / **tritio** | Added 2026-09-25 with the redrawn isotope diagrams. Printed under the mass-number name; the forms Spanish ESO and Bachillerato textbooks use. |
| stable / radioactive, of one isotope (03) | **estable** / **radiactivo** | Added 2026-09-25 with the redrawn isotope diagrams. *Radiactivo* without the o, per the row above; masculine, agreeing with *hidrógeno*. |
| undecayed nuclei (07, vertical axis) | **núcleos sin desintegrar** | Added 2026-09-25 with the redrawn isotope diagrams. The phrase Spanish physics uses for *N(t)* in the decay law. Replaces "how much is left", which suggests the sample disappears. |
| time in half-lives (07, horizontal axis) | **tiempo, en periodos de semidesintegración** | Added 2026-09-25 with the redrawn isotope diagrams. Wraps onto two lines in the diagram, which leaves room for it; the term is not shortened to *semivida* to fit. |
| name order vs formula order | formula **cation first**, name **anion first**: *cloruro de sodio*, NaCl | Added 2026-09-25. The English common mistake "writing the anion first because it sounds first" was removed, since in English the cation is said first. In Spanish the trap is real, but an overlay must keep the English list lengths, so the point lives in takeaway 2 of *Writing Ionic Formulas* instead. |
| cross-over method (charges → subscripts) | **método del aspa** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Already the sheet's term. |
| significant figures | **cifras significativas** | Added 2026-09-25. The rule is phrased *al mismo número de cifras significativas que el dato menos preciso*, not a fixed three. |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet. The IR sentence now points to *una tabla de IR*, and the polyatomic-ion table is headed *Los iones poliatómicos más habituales*. |
| CLE (condiciones estándar de laboratorio) | **withheld — spell out "a 25 °C y 100 kPa"** | Added 2026-09-25. "CLE" is a VCE (Australian) abbreviation with no Spanish equivalent, so the conversion-table cell now names the conditions instead, keeping the English value (V_m = 24,8 L/mol). |
| a two-pan balance (the relative-mass picture) | **balanza de dos platillos**; level is **equilibrada** | *La balanza* as fixed above for the game's beam; the pans are *platillos*. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| mole ratio | **relación molar** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). |
| number of particles (N) | **número de partículas** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). |
| moles of reactant / product (mole-map boxes) | **moles de reactivo / de producto** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). *Moles de*, as the overlay says it (*convierte a moles*) and as a Spanish class does; *cantidad de sustancia del reactivo* would not fit the box and no student says it. |
| primary / secondary / tertiary alcohol | **alcohol primario / secundario / terciario** | Added 2026-09-25 with the reaction-map diagram. |
| catalyst | **catalizador** | Added 2026-09-25. On the reaction map: *H₃PO₄ como catalizador*. |
| skeletal formula | **fórmula de esqueleto** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Also *fórmula de líneas y ángulos* in some textbooks. **Rated medium.** |
| methyl (group), as a diagram label | **metilo** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). *Metilo* as a noun (*un metilo*, *grupo metilo*); *metil-* inside a name (*3-metilpentan-2-ol*). |

### Diagram labels

Text drawn inside the diagrams. Labels must stay short: they sit in a fixed space. Text in {braces} is filled in with a number.

#### Atoms & the Periodic Table — diagram “What an atom is made of”

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| electronCloud | electron cloud | nube electrónica | |
| nucleus | nucleus | núcleo | |
| proton | proton | protón | |
| neutron | neutron | neutrón | |
| scale | Not to scale: the nucleus is about 1/100,000 of the atom’s width. | No está a escala: el núcleo mide cerca de 1/100 000 del diámetro del átomo. | |

#### Atoms & the Periodic Table — diagram “Atomic number and mass number”

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| massNumber | mass number = protons + neutrons | número másico = protones + neutrones | |
| atomicNumber | atomic number = protons | número atómico = protones | |
| subtraction | {mass} − {atomic} = {neutrons} neutrons | {mass} − {atomic} = {neutrons} neutrones | |

#### Atoms & the Periodic Table — diagram “Electrons, energy levels…” (sodium)

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| outerLevel | outer level | nivel exterior | |
| arrangement | {first}, {second}, {third} | {first}, {second}, {third} | |
| electrons | {count} electrons | {count} electrones | |
| countNote | A way to count electrons, not a picture of an atom. | Una forma de contar electrones, no una imagen del átomo. | |

#### Atoms & the Periodic Table — diagram “Ordered by atomic number”

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| atomicNumber | atomic number | número atómico | |
| relativeAtomicMass | relative atomic mass | masa atómica relativa | |
| telluriumName | Tellurium | Teluro | |
| telluriumMass | 127.60 | 127,60 | |
| telluriumRank | heavier, but first | más pesado, pero va antes | |
| iodineName | Iodine | Yodo | |
| iodineMass | 126.90 | 126,90 | |
| iodineRank | lighter, but second | más ligero, pero va después | |

#### Isotopes & Radioactivity — diagram “Isotopes” (hydrogen)

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| proton | proton | protón | |
| neutron | neutron | neutrón | |
| electron | electron | electrón | |
| isotopeName | hydrogen-{mass} | hidrógeno-{mass} | |
| protium | protium | protio | |
| deuterium | deuterium | deuterio | |
| tritium | tritium | tritio | |
| stable | stable | estable | |
| radioactive | radioactive | radiactivo | |

#### Isotopes & Radioactivity — diagram “Half-life”

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| axisAmount | undecayed nuclei | núcleos sin desintegrar | |
| axisTime | time, in half-lives | tiempo, en periodos de semidesintegración | |
| percent0 | 100% | 100 % | |
| percent1 | 50% | 50 % | |
| percent2 | 25% | 25 % | |
| percent3 | 12.5% | 12,5 % | |
| percent4 | 6.25% | 6,25 % | |

#### Diagram states-of-matter/01-particles-in-each-state

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| solid | solid | sólido | |
| liquid | liquid | líquido | |
| gas | gas | gas | |

#### Diagram states-of-matter/02-heating-curve

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| axisTemperature | temperature | temperatura | |
| axisEnergy | energy added | energía suministrada | |
| degrees | {t} °C | {t} °C | |
| melting | melting | fusión | |
| boiling | boiling | ebullición | |
| solid | solid | sólido | |
| liquid | liquid | líquido | |
| gas | gas | gas | |

#### Diagram lewis-structures/01-lewis-structures

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| lonePair | lone pair | par solitario | |
| sharedPair | shared pair | par enlazante | |
| water | H₂O | H₂O | |
| ammonia | NH₃ | NH₃ | |
| carbonDioxide | CO₂ | CO₂ | |
| methane | CH₄ | CH₄ | |

#### Diagram lewis-structures/02-vsepr-shapes

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| carbonDioxide | CO₂ | CO₂ | |
| boronTrifluoride | BF₃ | BF₃ | |
| methane | CH₄ | CH₄ | |
| ammonia | NH₃ | NH₃ | |
| water | H₂O | H₂O | |
| linear | linear, 180° | lineal, 180° | |
| trigonalPlanar | trigonal planar, 120° | triangular plana, 120° | |
| tetrahedral | tetrahedral, 109.5° | tetraédrica, 109,5° | |
| trigonalPyramidal | trigonal pyramidal, 107° | piramidal trigonal, 107° | |
| bent | bent, 104.5° | angular, 104,5° | |

#### Diagram functional-groups/01-reaction-map

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| alkene | alkene | alqueno | |
| haloalkane | haloalkane | haloalcano | |
| primaryAlcohol | primary alcohol | alcohol primario | |
| secondaryAlcohol | secondary alcohol | alcohol secundario | |
| aldehyde | aldehyde | aldehído | |
| ketone | ketone | cetona | |
| carboxylicAcid | carboxylic acid | ácido carboxílico | |
| ester | ester | éster | |
| hydration | H2O, H3PO4 catalyst | H2O, H3PO4 como catalizador | |
| addition | HX | HX | |
| substitution | OH− (aq) | OH− (aq) | |
| oxidation | Cr2O7 2−/H+ | Cr2O7 2−/H+ | |
| esterification | alcohol, H2SO4 catalyst | alcohol, H2SO4 como catalizador | |

#### Diagram relative-formula-mass/01-carbon-hydrogen-balance

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| carbonAtom | carbon atom | átomo de carbono | |
| hydrogenAtoms | hydrogen atoms | átomos de hidrógeno | |
| notToScale | Not to scale | No está a escala | |

#### Diagram balancing-equations/01-particle-equation

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| reactants | reactants | reactivos | |
| products | products | productos | |
| hydrogen | 2H2 | 2H2 | |
| oxygen | O2 | O2 | |
| water | 2H2O | 2H2O | |

#### Diagram chemical-bonds/01-bonding-models

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| ionic | ionic | enlace iónico | |
| covalent | covalent | enlace covalente | |
| metallic | metallic | enlace metálico | |
| sharedPair | shared pair | par enlazante | |
| delocalised | delocalised electrons | electrones libres | |

#### Diagram acids-and-bases/01-ph-scale

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| stomachAcid | stomach acid | jugo gástrico | |
| vinegar | vinegar | vinagre | |
| pureWater | pure water | agua pura | |
| bakingSoda | baking soda | bicarbonato | |
| ovenCleaner | oven cleaner | limpiahornos | |

#### Diagram chemical-formulas/01-cross-over

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| cation | cation | catión | |
| anion | anion | anión | |
| cationFormula | Al 3+ | Al 3+ | |
| anionFormula | SO4 2− | SO4 2− | |
| formula | Al2(SO4)3 | Al2(SO4)3 | |
| positive | {count} × (+{charge}) = +{total} | {count} × (+{charge}) = +{total} | |
| negative | {count} × (−{charge}) = −{total} | {count} × (−{charge}) = −{total} | |

#### Diagram naming-compounds/01-which-system

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| metalNonMetal | metal + non-metal | metal + no metal | |
| twoNonMetals | two non-metals | dos no metales | |
| hydrogenInWater | H first, in water | H delante, en agua | |
| ionic | ionic | iónico | |
| molecular | molecular | molecular | |
| acid | acid | ácido | |
| ionicExample | sodium chloride | cloruro de sodio | |
| molecularExample | sulfur dioxide | dióxido de azufre | |
| acidExample | hydrochloric acid | ácido clorhídrico | |

#### Diagram stoichiometry/01-mole-map

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| mass | mass | masa | |
| particles | particles | número de partículas | |
| gasVolume | gas volume | volumen de gas | |
| solution | solution | disolución | |
| fromMass | n = m/M | n = m/M | |
| fromParticles | n = N/NA | n = N/NA | |
| fromGasVolume | n = V/Vm | n = V/Vm | |
| fromSolution | n = cV | n = cV | |
| reactantMoles | moles of reactant | moles de reactivo | |
| moleRatio | mole ratio (coefficients) | relación molar (coeficientes) | |
| productMoles | moles of product | moles de producto | |

#### Diagram organic-nomenclature/01-numbered-chain

| Label | English | Spanish | OK / comment |
|---|---|---|---|
| hydroxyl | OH | OH | |
| methyl | methyl | metilo | |
| name | {methylAt}-methylpentan-{hydroxylAt}-ol | {methylAt}-metilpentan-{hydroxylAt}-ol | |

### Atoms & the Periodic Table

**Key takeaway 3**

English:

> Electrons sit in energy levels, and how many are in the outer level decides which group (column) an element is in.

Spanish, new:

> Los electrones ocupan niveles de energía, y cuántos hay en el nivel exterior decide en qué grupo (columna) está un elemento.

Spanish, before:

> Los electrones ocupan niveles de energía, y cuántos hay en el nivel exterior es el criterio con el que está ordenada la tabla.

- [ ] OK   Comment:

**Example card 1 (Cl-35): description**

English:

> 17 protons, 18 neutrons

Spanish, new:

> 17 protones, 18 neutrones

- [ ] OK   Comment:

**Example card 2 (Cl-37): description**

English:

> 17 protons, 20 neutrons

Spanish, new:

> 17 protones, 20 neutrones

- [ ] OK   Comment:

**Example card 3 (H+): description**

English:

> a hydrogen atom that has lost its one electron — a bare proton

Spanish, new:

> un átomo de hidrógeno que ha perdido su único electrón – solo queda un protón

- [ ] OK   Comment:

**Diagram description (alt text) in section “What an atom is made of”**

English:

> An atom: a nucleus of three protons (filled circles) and four neutrons (hollow circles), with an electron cloud around it that is densest right next to the nucleus and thins out, with no edge, further away. Three protons and four neutrons would make it lithium-7, but the picture stands for any atom. Labels name the electron cloud, the nucleus, a proton and a neutron. A note says it is not to scale: the nucleus is about 1/100,000 of the atom’s width.

Spanish, new:

> Un átomo: un núcleo de tres protones (círculos rellenos) y cuatro neutrones (círculos huecos), rodeado de una nube electrónica muy densa junto al núcleo que se va aclarando hacia fuera, sin borde. Con tres protones y cuatro neutrones sería litio-7, pero el dibujo vale para cualquier átomo. Las etiquetas señalan la nube electrónica, el núcleo, un protón y un neutrón. Una nota dice que no está a escala: el núcleo mide cerca de 1/100 000 del diámetro del átomo.

Spanish, before:

> Un núcleo de protones y neutrones en el centro, rodeado de una nube difusa que muestra dónde es probable que estén los electrones. Una nota avisa de que el núcleo está dibujado demasiado grande para poder verse siquiera.

- [ ] OK   Comment:

**Paragraph of section “Atomic number and mass number”**

English:

> The atomic number is the number of protons, and it is what makes an atom that element. Every chlorine atom has 17 protons; anything with 17 protons is chlorine. The mass number is protons plus neutrons. Neutrons can vary without changing which element it is.

Spanish, new:

> El número atómico es el número de protones, y es lo que hace que un átomo sea ese elemento. Todo átomo de cloro tiene 17 protones; cualquier cosa con 17 protones es cloro. El número másico es protones más neutrones. Los neutrones pueden variar sin que cambie el elemento.

Spanish, before:

> El número atómico es el número de protones, y es lo que hace que un átomo sea ese elemento. Todo átomo de cloro tiene 17 protones; cualquier cosa con 17 protones es cloro. El número másico es protones más neutrones. Los neutrones pueden variar sin que cambie el elemento. Los dos términos son aquí una ampliación: el currículo de estos cursos no nombra ninguno, y sin ellos no puedes leer una casilla de la tabla.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Atomic number and mass number”**

English:

> The symbol for chlorine-35: the mass number 35 above the atomic number 17, to the left of Cl. A line joins the 35 to “mass number = protons + neutrons” and another joins the 17 to “atomic number = protons”. Underneath: 35 − 17 = 18 neutrons.

Spanish, new:

> El símbolo del cloro-35: el número másico 35 encima del número atómico 17, a la izquierda de Cl. Una línea une el 35 con «número másico = protones + neutrones» y otra une el 17 con «número atómico = protones». Debajo: 35 − 17 = 18 neutrones.

Spanish, before:

> El símbolo del cloro-35 con el número másico 35 escrito encima del número atómico 17, y flechas que señalan: 17 protones, y 35 menos 17 da 18 neutrones.

- [ ] OK   Comment:

**Paragraph of section “Electrons, energy levels and the shape of the table”**

English:

> Electrons occupy energy levels around the nucleus. The first holds up to 2, the next up to 8, then 8 again for the first twenty elements. Your teacher may call these shells; it means the same thing. Counting electrons this way is called the Bohr model: it is useful, and it is not a picture of a real atom. The number in the outer level sets how an atom reacts. Elements are placed in the same group when they have the same outer count, which is why a group behaves alike.

Spanish, new:

> Los electrones ocupan niveles de energía alrededor del núcleo. El primero admite hasta 2, el siguiente hasta 8, y otros 8 en los veinte primeros elementos. Puede que en clase oigas llamarlos capas: es lo mismo. Contar los electrones así se llama modelo de Bohr: es útil, y no es una foto de un átomo de verdad. Cuántos hay en el nivel exterior determina cómo reacciona un átomo. Dos elementos van en el mismo grupo cuando tienen el mismo número fuera. Por eso un grupo se comporta de forma parecida.

Spanish, before:

> Los electrones ocupan niveles de energía alrededor del núcleo. El primero admite hasta 2, el siguiente hasta 8, y otros 8 en los veinte primeros elementos. Tu profesorado y el currículo quizá digan capas: es lo mismo. Contar los electrones así se llama modelo de Bohr: es útil, y no es una foto de un átomo de verdad. Cuántos hay en el nivel exterior determina cómo reacciona un átomo. Dos elementos van en el mismo grupo cuando tienen el mismo número fuera. Por eso un grupo se comporta de forma parecida.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Electrons, energy levels and the shape of the table”**

English:

> Sodium, Na, drawn as a model for counting electrons: a disc marked Na for the nucleus, inside three bands with visible edges that hold 2, 8 and 1 electrons at irregular angles. The single electron in the outer band is circled and labelled “outer level”. Below, the arrangement 2, 8, 1 and the total, 11 electrons. A note says it is a way to count electrons, not a picture of an atom.

Spanish, new:

> El sodio, Na, dibujado como un modelo para contar electrones: un disco con Na para el núcleo, dentro de tres bandas de borde visible que contienen 2, 8 y 1 electrones en ángulos irregulares. El único electrón de la banda exterior está rodeado por un círculo y señalado como «nivel exterior». Debajo, la disposición 2, 8, 1 y el total, 11 electrones. Una nota dice que es una forma de contar electrones, no una imagen del átomo.

Spanish, before:

> Un núcleo de sodio con 11 protones y 12 neutrones, rodeado de tres bandas difusas que contienen 2, 8 y 1 electrones, dibujados como marcas en ángulos irregulares y no como puntos sobre círculos. Al lado, la disposición 2, 8, 1 con el nivel externo al final. La propia figura dice que es una forma de contar electrones y no una imagen de un átomo, y que el núcleo está dibujado unas 100 000 veces demasiado grande.

- [ ] OK   Comment:

**Paragraph of section “Groups and periods”**

English:

> A group is a column of the table and a period is a row. Elements in one group have the same number of electrons in their outer level, so the column predicts how an element reacts. Group 1 is the alkali metals, group 17 the halogens and group 18 the noble gases. A period tells you how many energy levels are in use: an element in period 3 uses three of them. So atoms get bigger as you go down to a new row.

Spanish, new:

> Un grupo es una columna de la tabla y un periodo es una fila. Los elementos de un mismo grupo tienen el mismo número de electrones en el nivel exterior. La columna predice, por tanto, cómo reacciona un elemento. El grupo 1 son los metales alcalinos, el grupo 17 los halógenos y el grupo 18 los gases nobles. El periodo dice cuántos niveles de energía se usan: un elemento del periodo 3 usa tres. Así que los átomos son más grandes cada vez que bajas a una fila nueva.

Spanish, before:

> Un grupo es una columna de la tabla y un periodo es una fila. Los elementos de un mismo grupo tienen el mismo número de electrones en el nivel exterior. La columna predice, por tanto, cómo reacciona un elemento. El grupo 1 son los metales alcalinos, el grupo 17 los halógenos y el grupo 18 los gases nobles. El periodo dice cuántos niveles de energía se usan: un elemento del periodo 3 usa tres. La fila te dice así, más o menos, lo grande que es el átomo.

- [ ] OK   Comment:

**Paragraph of section “Metals and non-metals”**

English:

> Metals fill the left and the middle of the table, and non-metals sit in the top right corner. A metal conducts electricity and heat, has a shiny surface, and can be hammered into a sheet without shattering. Almost every metal is solid at room temperature; mercury is the liquid one. A non-metal is usually a poor conductor, dull, and brittle if it is solid at all. Many non-metals are gases. A few elements along the staircase between the two, such as silicon, behave partly like each. They are called metalloids.

Spanish, new:

> Los metales ocupan la izquierda y el centro de la tabla, y los no metales están en la esquina superior derecha. Un metal conduce la electricidad y el calor, tiene la superficie brillante y se deja golpear hasta formar una lámina sin romperse. Casi todos los metales son sólidos a temperatura ambiente; el mercurio es el líquido. Un no metal suele conducir mal, es mate y se rompe si es que llega a ser sólido. Muchos no metales son gases. Unos pocos elementos de la escalera que hay entre unos y otros, como el silicio, se comportan en parte como cada uno. Se llaman semimetales.

Spanish, before:

> Los metales ocupan la izquierda y el centro de la tabla, y los no metales están en la esquina superior derecha. Un metal conduce la electricidad y el calor, tiene la superficie brillante y se deja golpear hasta formar una lámina sin romperse. Casi todos los metales son sólidos a temperatura ambiente; el mercurio es el líquido. Un no metal suele conducir mal, es mate y se rompe si es que llega a ser sólido. Muchos no metales son gases. Ampliación: unos pocos elementos de la escalera que hay entre unos y otros, como el silicio, se comportan en parte como cada uno. Se llaman semimetales, una palabra que el currículo no usa.

- [ ] OK   Comment:

**Paragraph of section “Reactivity, and why a group behaves alike”**

English:

> You can test a group by reacting its elements with oxygen, water and acids, and they behave the same way as each other. Group 1 metals react with water and get more violent down the group: lithium fizzes, sodium darts about, potassium catches fire. The same metals with an acid give off hydrogen faster still, which is far too violent to try in a school lab. Group 17 elements run the other way and get less reactive down the group. Group 18 already has a full outer level, so the noble gases react with almost nothing.

Spanish, new:

> Puedes poner a prueba un grupo haciendo reaccionar sus elementos con oxígeno, agua y ácidos: entre ellos se comportan igual. Los metales del grupo 1 reaccionan con el agua y se vuelven más violentos hacia abajo: el litio burbujea, el sodio corretea por la superficie, el potasio se incendia. Esos mismos metales desprenden hidrógeno con un ácido, y todavía más deprisa: es demasiado violento para probarlo en clase. Los elementos del grupo 17 van al revés y son menos reactivos hacia abajo. El grupo 18 ya tiene el nivel exterior lleno, así que los gases nobles no reaccionan casi con nada.

Spanish, before:

> Puedes poner a prueba un grupo haciendo reaccionar sus elementos con oxígeno, agua y ácidos: entre ellos se comportan igual. Los metales del grupo 1 reaccionan con el agua y se vuelven más violentos hacia abajo: el litio burbujea, el sodio corretea por la superficie, el potasio se incendia. Esos mismos metales desprenden hidrógeno con un ácido, y todavía más deprisa. Los elementos del grupo 17 van al revés y son menos reactivos hacia abajo. El grupo 18 ya tiene el nivel exterior lleno, así que los gases nobles no reaccionan casi con nada.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Ordered by atomic number, not by mass”**

English:

> Two periodic-table cells side by side, with an arrow from the first to the second for the order in the table. Tellurium: atomic number 52, relative atomic mass 127.60, labelled “heavier, but first”. Iodine: atomic number 53, relative atomic mass 126.90, labelled “lighter, but second”. In the tellurium cell the two numbers are labelled atomic number and relative atomic mass.

Spanish, new:

> Dos casillas de la tabla periódica, una al lado de la otra, con una flecha de la primera a la segunda que indica el orden en la tabla. Teluro: número atómico 52, masa atómica relativa 127,60, con «más pesado, pero va antes». Yodo: número atómico 53, masa atómica relativa 126,90, con «más ligero, pero va después». En la casilla del teluro, los dos números llevan las etiquetas número atómico y masa atómica relativa.

Spanish, before:

> El teluro y el yodo uno al lado del otro. El teluro tiene mayor masa atómica relativa pero menor número atómico, y la tabla lo coloca primero.

- [ ] OK   Comment:


### Isotopes & Radioactivity

**Example card 1 (H-3): name**

English:

> Hydrogen-3 (tritium)

Spanish, new:

> Hidrógeno-3 (tritio)

Spanish, before:

> Carbono-12

- [ ] OK   Comment:

**Example card 1 (H-3): description**

English:

> radioactive: half-life about 12 years

Spanish, new:

> radiactivo: periodo de semidesintegración de unos 12 años

- [ ] OK   Comment:

**Example card 2 (Rn-222): description**

English:

> decays by giving out an alpha particle

Spanish, new:

> se desintegra emitiendo una partícula alfa

- [ ] OK   Comment:

**Example card 3 (I-131): description**

English:

> decays by giving out a beta particle

Spanish, new:

> se desintegra emitiendo una partícula beta

- [ ] OK   Comment:

**Example card 4 (Co-60): description**

English:

> gives out beta and gamma radiation — used for its gamma

Spanish, new:

> emite radiación beta y gamma – se usa por la gamma

- [ ] OK   Comment:

**Example card 5 (C-14): description**

English:

> half-life about 5730 years

Spanish, new:

> periodo de semidesintegración de unos 5730 años

- [ ] OK   Comment:

**Example card 6 (U-238): description**

English:

> half-life about 4.5 billion years

Spanish, new:

> periodo de semidesintegración de unos 4500 millones de años

- [ ] OK   Comment:

**Paragraph of section “The two numbers this sheet needs”**

English:

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put. Why an element's relative atomic mass, such as chlorine's 35.5, is not a whole number is on the Relative Atomic & Formula Mass sheet.

Spanish, new:

> El número atómico es cuántos protones tiene un átomo, y es lo que fija de qué elemento se trata. El número másico es protones más neutrones. Toda esta chuleta va de que el segundo número cambia mientras el primero se queda quieto. Por qué la masa atómica relativa de un elemento, como el 35,5 del cloro, no es un número entero se explica en la chuleta «Masa atómica y masa fórmula relativas».

Spanish, before:

> El número atómico es cuántos protones tiene un átomo, y es lo que fija de qué elemento se trata. El número másico es protones más neutrones. Toda esta chuleta va de que el segundo número cambia mientras el primero se queda quieto. Los dos términos son una ampliación: el currículo de estos cursos no nombra ninguno, y sin ellos aquí no funciona nada.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Isotopes”**

English:

> Three hydrogen atoms, one above another. Each has one proton (a filled circle) and one electron in a soft band around the nucleus. Hydrogen-1 (protium) has no neutrons, hydrogen-2 (deuterium) has one and hydrogen-3 (tritium) has two (hollow circles). Hydrogen-1 and hydrogen-2 are labelled stable, and hydrogen-3 radioactive. Labels name the electron, the proton and the neutron.

Spanish, new:

> Tres átomos de hidrógeno, uno debajo de otro. Cada uno tiene un protón (círculo relleno) y un electrón en una zona difusa alrededor del núcleo. El hidrógeno-1 (protio) no tiene neutrones, el hidrógeno-2 (deuterio) tiene uno y el hidrógeno-3 (tritio), dos (círculos huecos). El hidrógeno-1 y el hidrógeno-2 están marcados como estables, y el hidrógeno-3 como radiactivo. Unas etiquetas nombran el electrón, el protón y el neutrón.

Spanish, before:

> Tres átomos de hidrógeno uno al lado del otro: uno con un protón, otro con un protón y un neutrón, y otro con un protón y dos neutrones. Los tres tienen un solo electrón.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

Spanish, new:

> Algunos núcleos son inestables. Se desintegran por su cuenta, emiten radiación y dejan detrás un átomo más estable. El radón-222 expulsa una partícula alfa, que son dos protones y dos neutrones juntos. El yodo-131 emite una partícula beta, que es un electrón rápido salido del núcleo. El cobalto-60 emite radiación beta y gamma, y se usa por su radiación gamma, que es energía y no una partícula. Un papel detiene la alfa y una lámina de aluminio detiene la beta. Nada detiene del todo la gamma: el plomo o el hormigón grueso la atenúan mucho.

Spanish, before:

> Algunos núcleos son inestables. Se desintegran por su cuenta, emiten radiación y dejan detrás un átomo más estable. El radón-222 expulsa una partícula alfa, que son dos protones y dos neutrones juntos. El yodo-131 emite una partícula beta, que es un electrón rápido salido del núcleo. El cobalto-60 emite radiación gamma, que es energía y no una partícula. Un papel detiene la alfa, una lámina de aluminio detiene la beta, y la gamma necesita plomo u hormigón grueso.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Half-life”**

English:

> A decay curve of undecayed nuclei against time, in half-lives. It falls from 100 per cent to 50, 25, 12.5 and 6.25 per cent at one, two, three and four half-lives, with a dashed line down to the time axis at each point, and keeps falling after the fourth without reaching zero.

Spanish, new:

> Una curva de desintegración: los núcleos sin desintegrar frente al tiempo, en periodos de semidesintegración. Baja del 100 por ciento al 50, al 25, al 12,5 y al 6,25 por ciento tras uno, dos, tres y cuatro periodos, con una línea discontinua hasta el eje del tiempo en cada punto, y sigue bajando después sin llegar a cero.

Spanish, before:

> Una curva de desintegración que baja del 100 por ciento al 50, al 25 y al 12,5 por ciento tras uno, dos y tres periodos de semidesintegración, con una línea discontinua hasta el eje en cada punto. Tras tres periodos queda una octava parte. Un periodo son 5730 años para el carbono-14 y unos 4500 millones de años para el uranio-238.

- [ ] OK   Comment:

**Paragraph of section “Elements that had to be made”**

English:

> Elements past uranium have no stable isotopes and are not found in nature in any useful amount. The first few, such as plutonium, are made in nuclear reactors: uranium takes in neutrons, and beta decay then turns it into neptunium and plutonium. The heavier ones are built in accelerators by firing one nucleus at another, sometimes a few atoms at a time. Many last less than a second before they decay. Making them is how the bottom rows of the periodic table were filled in.

Spanish, new:

> Los elementos posteriores al uranio no tienen isótopos estables y no se encuentran en la naturaleza en ninguna cantidad aprovechable. Los primeros, como el plutonio, se producen en reactores nucleares: allí el uranio captura neutrones y después la desintegración beta lo convierte en neptunio y plutonio. Los más pesados se construyen en aceleradores lanzando un núcleo contra otro, a veces unos pocos átomos cada vez. Muchos duran menos de un segundo y luego se desintegran. Fabricándolos se rellenaron las últimas filas de la tabla periódica.

Spanish, before:

> Los elementos posteriores al uranio no tienen isótopos estables y no se encuentran en la naturaleza. Se construyen en aceleradores lanzando un núcleo contra otro, a veces unos pocos átomos cada vez. Muchos duran menos de un segundo y luego se desintegran. Esto es una ampliación: el currículo no pide los elementos fabricados. Están aquí porque así se rellenaron las últimas filas de la tabla periódica.

- [ ] OK   Comment:


### States of Matter

**Key takeaway 3**

English:

> Gases: particles move freely and are far apart — fills any container, easily compressed.

Spanish, new:

> Gases: las partículas se mueven libremente y están muy separadas; llenan cualquier recipiente y se comprimen con facilidad.

Spanish, before:

> Gases: las partículas se mueven libremente y deprisa; llenan cualquier recipiente y se comprimen con facilidad.

- [ ] OK   Comment:

**Heading of section “Particles in each state”**

English:

> Particles in each state

Spanish, new:

> Las partículas en cada estado

- [ ] OK   Comment:

**Paragraph of section “Particles in each state”**

English:

> In a solid the particles touch in a regular pattern and vibrate in place. In a liquid they still touch, but they are jumbled and slide past one another; in a gas they are far apart and move freely in every direction. The particles are the same size in all three states: only their arrangement and the spaces between them change.

Spanish, new:

> En un sólido, las partículas están en contacto, ordenadas de forma regular, y vibran sin moverse de su sitio. En un líquido siguen en contacto, pero desordenadas, y se deslizan unas sobre otras; en un gas están muy separadas y se mueven libremente en todas direcciones. Las partículas tienen el mismo tamaño en los tres estados: solo cambian su colocación y los huecos entre ellas.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Particles in each state”**

English:

> Three boxes, one above another, with particles of the same size in each. Solid: particles touching in a regular block of rows and columns, resting on the floor of the box. Liquid: the same number of particles, still touching but jumbled, with small gaps, spread across the bottom of the box. Gas: five particles far apart across the whole box, each with two short marks behind it to show that it is moving.

Spanish, new:

> Tres cajas, una encima de otra, con partículas del mismo tamaño en cada una. Sólido: las partículas están en contacto y forman un bloque regular de filas y columnas, apoyado en el fondo de la caja. Líquido: el mismo número de partículas, todavía en contacto pero desordenadas, con pequeños huecos, repartidas por el fondo de la caja. Gas: cinco partículas muy separadas por toda la caja, cada una con dos trazos cortos detrás que indican que se mueve.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Heating and cooling curves”**

English:

> A heating curve for water: temperature up the side and energy added along the bottom, with no numbers on the energy axis. The line climbs steeply through the solid, stays flat at 0 °C for melting, climbs less steeply through the liquid, stays flat at 100 °C for boiling, then climbs steeply again through the gas. The boiling plateau is drawn to scale, almost seven times as long as the melting plateau: about 2260 J against 334 J for each gram.

Spanish, new:

> Una curva de calentamiento del agua: la temperatura en el eje vertical y la energía suministrada en el horizontal, sin números en el eje de la energía. La línea sube con mucha pendiente en el sólido, se mantiene horizontal a 0 °C durante la fusión, sube con menos pendiente en el líquido, se mantiene horizontal a 100 °C durante la ebullición y vuelve a subir con mucha pendiente en el gas. El tramo de la ebullición está dibujado a escala, casi siete veces más largo que el de la fusión: unos 2260 J frente a 334 J por gramo.

- [ ] OK   Comment:


### Acids & Bases

**Key takeaway 2**

English:

> Base: a proton acceptor. Soluble bases (alkalis) release hydroxide ions, OH−, in water. pH > 7.

Spanish, new:

> Base: un aceptor de protones. Las bases solubles (álcalis) liberan iones hidróxido, OH−, en agua. pH > 7.

Spanish, before:

> Base: un aceptor de protones. Las bases solubles (álcalis) liberan iones hidróxido, OH-, en agua. pH > 7.

- [ ] OK   Comment:

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

Spanish, new:

> Neutro: pH 7 a 25 °C; el agua pura y las disoluciones de sales como el NaCl.

Spanish, before:

> Neutro: pH 7 a 25 °C; el agua pura y la mayoría de las sales.

- [ ] OK   Comment:

**Key takeaway 4**

English:

> Neutralisation: acid + base → salt + water. The ionic equation is always H+ + OH− → H2O.

Spanish, new:

> Neutralización: ácido + base → sal + agua. La ecuación iónica es siempre H+ + OH− → H2O.

Spanish, before:

> Neutralización: ácido + base → sal + agua. La ecuación iónica es siempre H+ + OH- → H2O.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

Spanish, new:

> Cada escalón de la escala de pH es un factor 10 en la concentración de H+: a pH 2 la concentración de H+ es 100 veces la de pH 4.

Spanish, before:

> Cada escalón de la escala de pH es un factor 10 en la concentración de H+: un pH 2 es 100 veces más ácido que un pH 4.

- [ ] OK   Comment:

**Heading of section “The pH scale”**

English:

> The pH scale

Spanish, new:

> La escala de pH

- [ ] OK   Comment:

**Paragraph of section “The pH scale”**

English:

> pH says how acidic or alkaline a solution is. At 25 °C, below 7 is acidic, 7 is neutral and above 7 is alkaline, and most solutions you will meet lie between 0 and 14. Universal indicator turns a different colour at each pH: red at the acidic end, green at 7 and purple at the alkaline end.

Spanish, new:

> El pH indica lo ácida o básica que es una disolución. A 25 °C, por debajo de 7 es ácida, a 7 es neutra y por encima de 7 es básica, y casi todas las disoluciones que vas a encontrar están entre 0 y 14. El indicador universal toma un color distinto en cada pH: rojo en el extremo ácido, verde a 7 y violeta en el extremo básico.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The pH scale”**

English:

> The pH scale as a bar from 0 at the top to 14 at the bottom, each step in its universal-indicator colour with its number printed beside it: red at 0, orange at 1, yellow at 2 and 3, green from 4 to 8, blue-green at 9, blue at 10 and 11 and purple from 12 to 14. Five everyday solutions are marked at their pH: stomach acid at 1, vinegar at 3, pure water at 7, baking soda at 8 and oven cleaner at 13.

Spanish, new:

> La escala de pH como una barra, con el 0 arriba y el 14 abajo, cada tramo del color del indicador universal y con su número al lado: rojo en 0, naranja en 1, amarillo en 2 y 3, verde de 4 a 8, verde azulado en 9, azul en 10 y 11 y violeta de 12 a 14. Cinco productos cotidianos están marcados en su pH: el jugo gástrico en 1, el vinagre en 3, el agua pura en 7, el bicarbonato en 8 y el limpiahornos en 13.

- [ ] OK   Comment:


### Balancing Chemical Equations

**Example card 1 (H2 + O2 -> H2O): name**

English:

> Unbalanced (no states yet)

Spanish, new:

> Sin ajustar (aún sin símbolos de estado)

Spanish, before:

> Sin ajustar

- [ ] OK   Comment:

**Diagram description (alt text) in section “A method that always works”**

English:

> The reaction 2H₂ + O₂ → 2H₂O drawn as particles. On the left, the reactants: two hydrogen molecules, each two touching atoms marked H, plus one oxygen molecule, two touching atoms marked O. An arrow points to the products: two water molecules, each an O atom with two H atoms. The equation is written under the particles, and under that the atoms are counted on each side: H 4 and 4, O 2 and 2.

Spanish, new:

> La reacción 2H₂ + O₂ → 2H₂O dibujada con partículas. A la izquierda, los reactivos: dos moléculas de dihidrógeno, cada una con dos átomos marcados con H que se tocan, más una molécula de dioxígeno, dos átomos marcados con O. Una flecha lleva a los productos: dos moléculas de agua, cada una un átomo de O con dos átomos de H. Debajo de las partículas está la ecuación y, debajo de ella, el recuento de átomos de cada lado: H 4 y 4, O 2 y 2.

- [ ] OK   Comment:


### Types of Chemical Reactions

**Key takeaway 3**

English:

> Combustion: fuel + oxygen → carbon dioxide + water (for a hydrocarbon fuel, burning completely) — releases heat.

Spanish, new:

> Combustión: combustible + oxígeno → dióxido de carbono + agua (para un hidrocarburo, en combustión completa); se libera calor.

Spanish, before:

> Combustión: combustible + oxígeno → dióxido de carbono + agua (combustión completa); se libera calor.

- [ ] OK   Comment:


### Chemical Bonds & Structure

**Key takeaway 1**

English:

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons; helium, in group 18, has only 2).

Spanish, new:

> Los átomos se enlazan para conseguir una capa externa completa y estable (una configuración de gas noble). En un elemento representativo, la última cifra del número de grupo te dice cuántos electrones de valencia tiene (el Cl está en el grupo 17: 7 electrones de valencia; el helio, en el grupo 18, solo tiene 2).

Spanish, before:

> Los átomos se enlazan para conseguir una capa externa completa y estable (una configuración de gas noble). El número del grupo te dice cuántos electrones de valencia tiene un elemento representativo.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Why ionic compounds conduct only when molten or dissolved”**

English:

> Three boxes, one above another. Ionic: a grid of small positive ions and large negative ions, alternating, each marked + or −. Covalent: one hydrogen molecule, two atoms marked H whose circles overlap, with two electron dots in the overlap, labelled shared pair. Metallic: a grid of positive metal ions with as many small electron dots scattered between them, labelled delocalised electrons.

Spanish, new:

> Tres recuadros, uno debajo de otro. Enlace iónico: una red de iones positivos pequeños e iones negativos grandes, alternados, cada uno marcado con + o −. Enlace covalente: una molécula de dihidrógeno, dos átomos marcados con H cuyos círculos se solapan, con dos puntos (los electrones) en la zona común, rotulados par enlazante. Enlace metálico: una red de iones metálicos positivos con otros tantos puntos (los electrones) repartidos entre ellos, rotulados electrones libres.

- [ ] OK   Comment:


### Writing Ionic Formulas

**Key takeaway 2**

English:

> Write the cation (metal or NH4+) first, then the anion.

Spanish, new:

> Escribe primero el catión (el metal o NH4+) y después el anión, aunque en el nombre el anión vaya delante: cloruro de sodio, NaCl.

Spanish, before:

> Escribe primero el catión (el metal o NH4+) y después el anión.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Worked example: aluminium sulfate”**

English:

> Aluminium sulfate by the cross-over method. At the top, the aluminium ion Al³⁺, labelled cation, and the sulfate ion SO₄²⁻, labelled anion. Two crossing arrows carry each charge number down to become the other ion’s subscript: the 3 of Al³⁺ becomes the 3 after the bracketed sulfate, and the 2 of SO₄²⁻ becomes the 2 after Al. At the bottom, the formula Al₂(SO₄)₃, and the check: 2 × (+3) = +6 and 3 × (−2) = −6.

Spanish, new:

> El sulfato de aluminio por el método del aspa. Arriba, el ion aluminio Al³⁺, rotulado «catión», y el ion sulfato SO₄²⁻, rotulado «anión». Dos flechas que se cruzan bajan cada número de carga, que pasa a ser el subíndice del otro ion: el 3 del Al³⁺ pasa a ser el 3 tras el sulfato entre paréntesis, y el 2 del SO₄²⁻, el 2 tras el Al. Abajo, la fórmula Al₂(SO₄)₃ y la comprobación: 2 × (+3) = +6 y 3 × (−2) = −6.

- [ ] OK   Comment:


### Polyatomic Ions

**Key takeaway 2**

English:

> The only common polyatomic cation is ammonium, NH4+ (apart from hydronium, H3O+, which you meet in acids). All the rest are anions.

Spanish, new:

> El único catión poliatómico común es el amonio, NH4+ (aparte del ion hidronio, H3O+, que verás en los ácidos). Todos los demás son aniones.

Spanish, before:

> El único catión poliatómico común es el amonio, NH4+. Todos los demás son aniones.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Adding H+ to an anion makes its charge one less negative and adds "hydrogen" to the name: carbonate CO3 2− → hydrogen carbonate HCO3−.

Spanish, new:

> Añadir H+ a un anión hace su carga una unidad menos negativa y añade «hidrogeno» al nombre: carbonato CO3 2− → hidrogenocarbonato HCO3−.

Spanish, before:

> Añadir H+ a un anión sube su carga en una unidad y añade «hidrogeno» al nombre: carbonato CO3 2− → hidrogenocarbonato HCO3−.

- [ ] OK   Comment:

**Paragraph of section “Where they show up”**

English:

> Acids: sulfuric acid is H2SO4 because sulfate is 2−; nitric acid is HNO3 because nitrate is 1−. Precipitation: all nitrates and all ammonium salts are soluble, so they are the usual "spectator" partners. Redox: permanganate and dichromate are the classic oxidising agents.

Spanish, new:

> Ácidos: el ácido sulfúrico es H2SO4 porque el sulfato es 2−; el ácido nítrico es HNO3 porque el nitrato es 1−. Precipitación: todos los nitratos y todas las sales de amonio son solubles, así que son las parejas «espectadoras» de siempre. Redox: el permanganato y el dicromato son los oxidantes clásicos.

Spanish, before:

> Ácidos: el ácido sulfúrico es H2SO4 porque el sulfato es 2−; el ácido nítrico es HNO3 porque el nitrato es 1−. Precipitación: casi todos los nitratos y todas las sales de amonio son solubles, así que son las parejas «espectadoras» de siempre. Redox: el permanganato y el dicromato son los oxidantes clásicos.

- [ ] OK   Comment:

**Heading of table “Polyatomic ions (VCE data book set)”**

English:

> Polyatomic ions (VCE data book set)

Spanish, new:

> Los iones poliatómicos más habituales

Spanish, before:

> Iones poliatómicos (los del libro de datos de VCE)

- [ ] OK   Comment:

**Common mistake 3**

English:

> Confusing the charge (2−) with the number of oxygens — sulfate has 4 O and charge 2−.

Spanish, new:

> Confundir la carga (2−) con el número de oxígenos: el sulfato tiene 4 O y carga 2−.

Spanish, before:

> Confundir la carga (−2) con el número de oxígenos: el sulfato tiene 4 O y carga 2−.

- [ ] OK   Comment:


### Naming Inorganic Compounds

**Heading of section “Which naming system?”**

English:

> Which naming system?

Spanish, new:

> ¿Qué sistema de nomenclatura?

- [ ] OK   Comment:

**Paragraph of section “Which naming system?”**

English:

> Look at what the compound is made of before you name it. A metal (or NH4+) with a non-metal is ionic: the cation, then the anion, with no prefixes. Two non-metals make a molecular compound, named with Greek prefixes — but if H comes first and it is dissolved in water, it is an acid, and acids have names of their own.

Spanish, new:

> Fíjate primero en de qué está hecho el compuesto. Un metal (o NH4+) con un no metal forma un compuesto iónico: primero el anión, luego «de» y el catión, sin prefijos (cloruro de sodio). Dos no metales forman un compuesto molecular, que se nombra con prefijos griegos (dióxido de azufre); pero si el H va delante y está disuelto en agua, es un ácido, y su nombre sale del anión: ácido clorhídrico.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Which naming system?”**

English:

> A flowchart for choosing a naming system. Metal + non-metal leads to ionic, for example sodium chloride. Two non-metals leads to molecular, for example sulfur dioxide. An arrow down from two non-metals leads to H first, in water, and from there to acid, for example hydrochloric acid.

Spanish, new:

> Un diagrama de flujo para elegir el sistema de nomenclatura. De «metal + no metal» sale una flecha a «iónico», por ejemplo cloruro de sodio. De «dos no metales» sale una flecha a «molecular», por ejemplo dióxido de azufre. De «dos no metales» baja además una flecha a «H delante, en agua», y de ahí a «ácido», por ejemplo ácido clorhídrico.

- [ ] OK   Comment:


### Relative Atomic & Formula Mass

**Example card 1 (H2O): description**

English:

> 2 × 1 + 16 = 18

Spanish, new:

> 2 × 1 + 16 = 18

- [ ] OK   Comment:

**Example card 2 (CO2): description**

English:

> 12 + 2 × 16 = 44

Spanish, new:

> 12 + 2 × 16 = 44

- [ ] OK   Comment:

**Example card 3 (CaCO3): description**

English:

> 40 + 12 + 3 × 16 = 100

Spanish, new:

> 40 + 12 + 3 × 16 = 100

- [ ] OK   Comment:

**Example card 4 (Mg(OH)2): description**

English:

> 24 + 2 × (16 + 1) = 58

Spanish, new:

> 24 + 2 × (16 + 1) = 58

- [ ] OK   Comment:

**Example card 5 (Ca(NO3)2): description**

English:

> 40 + 2 × (14 + 3 × 16) = 164

Spanish, new:

> 40 + 2 × (14 + 3 × 16) = 164

- [ ] OK   Comment:

**Diagram description (alt text) in section “What "relative" actually means”**

English:

> A balance with two hanging pans, level. On the left pan is one carbon atom, a circle marked C. On the right pan are twelve hydrogen atoms, smaller circles marked H, piled in rows of five, four and three. Carbon is drawn bigger than hydrogen, but nowhere near twelve times the size. Labels under the pans say 1 carbon atom and 12 hydrogen atoms, and a note says the picture is not to scale.

Spanish, new:

> Una balanza de dos platillos colgantes, equilibrada. En el platillo de la izquierda hay un átomo de carbono, un círculo marcado con C. En el de la derecha hay doce átomos de hidrógeno, círculos más pequeños marcados con H, apilados en filas de cinco, cuatro y tres. El carbono está dibujado más grande que el hidrógeno, pero ni de lejos doce veces más. Bajo los platillos pone «1 átomo de carbono» y «12 átomos de hidrógeno», y una nota avisa de que el dibujo no está a escala.

- [ ] OK   Comment:

**Example card 1 in section “Adding the atoms up”: description**

English:

> 14 + 3 × 1 = 17

Spanish, new:

> 14 + 3 × 1 = 17

- [ ] OK   Comment:

**Example card 2 in section “Adding the atoms up”: description**

English:

> 12 + 4 × 1 = 16

Spanish, new:

> 12 + 4 × 1 = 16

- [ ] OK   Comment:

**Example card 3 in section “Adding the atoms up”: description**

English:

> 2 × 1 + 32 + 4 × 16 = 98

Spanish, new:

> 2 × 1 + 32 + 4 × 16 = 98

- [ ] OK   Comment:

**Example card 1 in section “Subscripts and brackets”: description**

English:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

Spanish, new:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 9, column 3**

English:

> 35.5

Spanish, new:

> 35,5

Spanish, before:

> 35.5

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 13, column 3**

English:

> 63.5

Spanish, new:

> 63,5

Spanish, before:

> 63.5

- [ ] OK   Comment:

**Table “Worked examples”, row 1, column 2**

English:

> 2 × 1

Spanish, new:

> 2 × 1

Spanish, before:

> 2 x 1

- [ ] OK   Comment:

**Table “Worked examples”, row 2, column 2**

English:

> 2 × 16

Spanish, new:

> 2 × 16

Spanish, before:

> 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 3, column 2**

English:

> 2 × 1 + 16

Spanish, new:

> 2 × 1 + 16

Spanish, before:

> 2 x 1 + 16

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 2**

English:

> 23 + 35.5

Spanish, new:

> 23 + 35,5

Spanish, before:

> 23 + 35.5

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 3**

English:

> 58.5

Spanish, new:

> 58,5

Spanish, before:

> 58.5

- [ ] OK   Comment:

**Table “Worked examples”, row 6, column 2**

English:

> 12 + 2 × 16

Spanish, new:

> 12 + 2 × 16

Spanish, before:

> 12 + 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 7, column 2**

English:

> 40 + 12 + 3 × 16

Spanish, new:

> 40 + 12 + 3 × 16

Spanish, before:

> 40 + 12 + 3 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 8, column 2**

English:

> 2 × 1 + 32 + 4 × 16

Spanish, new:

> 2 × 1 + 32 + 4 × 16

Spanish, before:

> 2 x 1 + 32 + 4 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 9, column 2**

English:

> 24 + 2 × (16 + 1)

Spanish, new:

> 24 + 2 × (16 + 1)

Spanish, before:

> 24 + 2 x (16 + 1)

- [ ] OK   Comment:

**Table “Worked examples”, row 10, column 2**

English:

> 40 + 2 × (14 + 3 × 16)

Spanish, new:

> 40 + 2 × (14 + 3 × 16)

Spanish, before:

> 40 + 2 x (14 + 3 x 16)

- [ ] OK   Comment:

**Common mistake 1**

English:

> Saying an atom of carbon "weighs 12" — 12 what? Ar is a comparison and has no unit. Grams only appear once you scale up to a real amount.

Spanish, new:

> Decir que un átomo de carbono «pesa 12»: ¿12 qué? Ar es una comparación y no tiene unidad. Los gramos solo aparecen al escalar a una cantidad real.

- [ ] OK   Comment:


### The Mole & Stoichiometry

**Key takeaway 1**

English:

> One mole is 6.02 × 10²³ particles (Avogadro's number, N_A). Molar mass M (g/mol) is the mass of one mole — add up the atomic masses from the periodic table.

Spanish, new:

> Un mol son 6,02 × 10²³ partículas (la constante de Avogadro, N_A). La masa molar M (g/mol) es la masa de un mol: se suman las masas atómicas de la tabla periódica.

Spanish, before:

> Un mol son 6,02 × 10^23 partículas (la constante de Avogadro, N_A). La masa molar M (g/mol) es la masa de un mol: se suman las masas atómicas de la tabla periódica.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Worked example: mass → mass”**

English:

> The mole map. Four boxes down the left, mass, particles, gas volume and solution, are each joined to a tall box, moles of reactant, by a two-way arrow carrying its formula: n = m/M, n = N/N_A, n = V/V_m and n = cV. From moles of reactant, an arrow labelled mole ratio (coefficients) leads down to moles of product.

Spanish, new:

> El mapa del mol. A la izquierda, cuatro recuadros uno debajo de otro —masa, número de partículas, volumen de gas y disolución—, cada uno unido a un recuadro alto, «moles de reactivo», por una flecha doble con su fórmula: n = m/M, n = N/N_A, n = V/V_m y n = cV. De los moles de reactivo baja una flecha rotulada «relación molar (coeficientes)» hasta los moles de producto.

- [ ] OK   Comment:

**Table “The conversion formulas”, row 4, column 2**

English:

> volume of a gas at SLC

Spanish, new:

> el volumen de un gas a 25 °C y 100 kPa

Spanish, before:

> el volumen de un gas en CLE

- [ ] OK   Comment:

**Common mistake 4**

English:

> Rounding early — keep full precision until the final answer, then round to the same number of significant figures as the least precise value you were given.

Spanish, new:

> Redondear pronto: mantén toda la precisión hasta el resultado final y redondea entonces al mismo número de cifras significativas que el dato menos preciso.

Spanish, before:

> Redondear pronto: mantén toda la precisión hasta el resultado final y da entonces 3 cifras significativas.

- [ ] OK   Comment:


### Lewis Structures

**Key takeaway 1**

English:

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17; helium, in group 18, has only 2). Add one electron per negative charge, remove one per positive charge.

Spanish, new:

> Electrones de valencia = última cifra del número de grupo para los elementos representativos (H 1, C 4, N 5, O 6, halógenos 7; el nitrógeno está en el grupo 15 y el cloro en el 17; el helio, en el grupo 18, solo tiene 2). Suma un electrón por cada carga negativa y quita uno por cada carga positiva.

Spanish, before:

> Electrones de valencia = número del grupo para los elementos representativos (H 1, C 4, N 5, O 6, halógenos 7). Suma un electrón por cada carga negativa y quita uno por cada carga positiva.

- [ ] OK   Comment:

**Paragraph of section “Year 10 essentials”**

English:

> Every atom brings its outer electrons as dots. A dot on its own is an unpaired electron (a "loner"); two loners from two different atoms make a shared pair, which is one bond (drawn as a line). Pairs that stay on one atom are lone pairs. An atom is full at 8 dots around it (an octet) — hydrogen is full at 2 (a duet). Share twice between the same two atoms for a double bond, three times for a triple. The number of loners tells you how many bonds an atom makes: H 1, C 4, N 3, O 2, Cl 1. Sulfur behaves like oxygen and phosphorus like nitrogen because they are in the same groups. Everything below this section (formal charge, VSEPR shapes, octet exceptions) is Senior content.

Spanish, new:

> Cada átomo trae sus electrones externos en forma de puntos. Un punto que está solo es un electrón desapareado; dos electrones desapareados de dos átomos distintos forman un par enlazante, que es un enlace (se dibuja como una raya). Los pares que se quedan en un solo átomo son pares solitarios. Un átomo está completo con 8 puntos alrededor (un octeto); el hidrógeno está completo con 2 (un dueto). Comparte dos veces entre los dos mismos átomos para un enlace doble, y tres para uno triple. El número de electrones desapareados te dice cuántos enlaces forma un átomo: H 1, C 4, N 3, O 2, Cl 1. El azufre se comporta como el oxígeno y el fósforo como el nitrógeno, porque están en los mismos grupos. Todo lo que viene por debajo de esta sección (carga formal, geometría RPECV, excepciones al octeto) es materia de Bachillerato.

Spanish, before:

> Cada átomo trae sus electrones externos en forma de puntos. Un punto que está solo es un impar; dos impares de dos átomos distintos forman un par enlazante, que es un enlace (se dibuja como una raya). Los pares que se quedan en un solo átomo son pares solitarios. Un átomo está completo con 8 puntos alrededor (un octeto); el hidrógeno está completo con 2 (un dueto). Comparte dos veces entre los dos mismos átomos para un enlace doble, y tres para uno triple. El número de impares te dice cuántos enlaces forma un átomo: H 1, C 4, N 3, O 2, Cl 1. El azufre se comporta como el oxígeno y el fósforo como el nitrógeno, porque están en los mismos grupos. Todo lo que viene por debajo de esta sección (carga formal, geometría RPECV, excepciones al octeto) es materia de Bachillerato.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Year 10 essentials”**

English:

> Lewis structures of four molecules, each with its formula underneath. Water, H₂O: H–O–H with two lone pairs on the oxygen, one above it and one below. Ammonia, NH₃: nitrogen with single bonds to three hydrogens and one lone pair. Carbon dioxide, CO₂: O=C=O, two double bonds, with two lone pairs on each oxygen and none on the carbon. Methane, CH₄: carbon with single bonds to four hydrogens and no lone pairs. Bonds are lines and lone pairs are pairs of dots. Labels point to one lone pair, on the oxygen in water, and to one shared pair, a bond in ammonia.

Spanish, new:

> Estructuras de Lewis de cuatro moléculas, cada una con su fórmula debajo. Agua, H₂O: H–O–H con dos pares solitarios en el oxígeno, uno encima y otro debajo. Amoniaco, NH₃: el nitrógeno unido a tres hidrógenos por enlaces simples, con un par solitario. Dióxido de carbono, CO₂: O=C=O, dos enlaces dobles, con dos pares solitarios en cada oxígeno y ninguno en el carbono. Metano, CH₄: el carbono unido a cuatro hidrógenos por enlaces simples, sin pares solitarios. Los enlaces son rayas y los pares solitarios, parejas de puntos. Unas etiquetas señalan un par solitario, en el oxígeno del agua, y un par enlazante, un enlace del amoniaco.

- [ ] OK   Comment:

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

Spanish, new:

> Metano: el carbono comparte sus cuatro electrones desapareados

Spanish, before:

> Metano: el carbono comparte sus cuatro impares

- [ ] OK   Comment:

**Diagram description (alt text) in section “From Lewis structure to shape (VSEPR)”**

English:

> The five VSEPR shapes, each with its formula, shape and bond angle underneath, drawn in 3D: a solid wedge is a bond coming out of the page and a hashed wedge a bond going behind it. CO₂ is linear, 180°. BF₃ is trigonal planar, 120°. CH₄ is tetrahedral, 109.5°. NH₃ is trigonal pyramidal, 107°, with its lone pair drawn as a lobe on the nitrogen. H₂O is bent, 104.5°, with two lone-pair lobes on the oxygen. NH₃ and H₂O are drawn like CH₄ with one, then two, of its bonds replaced by a lone pair. A small arc marks the angle between the two bonds that lie in the page.

Spanish, new:

> Las cinco geometrías RPECV, cada una con su fórmula, su geometría y su ángulo de enlace debajo, dibujadas en 3D: una cuña rellena es un enlace que sale del plano hacia delante y una cuña rayada, uno que va hacia atrás. CO₂: lineal, 180°. BF₃: triangular plana, 120°. CH₄: tetraédrica, 109,5°. NH₃: piramidal trigonal, 107°, con su par solitario dibujado como un lóbulo en el nitrógeno. H₂O: angular, 104,5°, con dos lóbulos en el oxígeno. El NH₃ y el H₂O se dibujan como el CH₄, con uno y luego dos de sus enlaces sustituidos por un par solitario. Un pequeño arco marca el ángulo entre los dos enlaces que están en el plano de la página.

- [ ] OK   Comment:


### Naming Organic Compounds

**Diagram description (alt text) in section “Worked example”**

English:

> The skeletal structure of 3-methylpentan-2-ol: a zigzag chain of five carbons, numbered 1 to 5 from left to right, with OH at the end of a bond up from carbon 2 and a methyl group as a short line down from carbon 3, labelled methyl. Underneath, the name 3-methylpentan-2-ol.

Spanish, new:

> La fórmula de esqueleto del 3-metilpentan-2-ol: una cadena en zigzag de cinco carbonos, numerados del 1 al 5 de izquierda a derecha. Del carbono 2 sale hacia arriba un enlace con el OH, y del carbono 3, hacia abajo, un trazo corto: el grupo metilo, rotulado «metilo». Debajo, el nombre 3-metilpentan-2-ol.

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 1**

English:

> Amide

Spanish, new:

> Amida

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 2**

English:

> -amide

Spanish, new:

> -amida

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 3**

English:

> ethanamide

Spanish, new:

> etanamida

- [ ] OK   Comment:

**Common mistake 4**

English:

> Forgetting the locant for -ene, -ol or -one whenever the group could sit in more than one position (propan-1-ol vs propan-2-ol).

Spanish, new:

> Olvidar el localizador de -eno, -ol o -ona siempre que el grupo pueda ir en más de una posición (propan-1-ol o propan-2-ol).

Spanish, before:

> Olvidar el localizador de -eno, -ol o -ona cuando la cadena tiene 4 carbonos o más.

- [ ] OK   Comment:


### Functional Groups

**Paragraph of section “The reaction pathway you must know”**

English:

> Alkene → (H₂O, H₃PO₄ catalyst) → alcohol. Alkene → (HX) → haloalkane → (OH⁻(aq)) → alcohol → (Cr₂O₇²⁻/H⁺) → aldehyde → (further oxidation) → carboxylic acid → (alcohol, H₂SO₄ catalyst) → ester. Primary alcohols oxidise twice, secondary alcohols oxidise once to ketones, tertiary alcohols do not oxidise.

Spanish, new:

> Alqueno → (H₂O, H₃PO₄ como catalizador) → alcohol. Alqueno → (HX) → haloalcano → (OH⁻(aq)) → alcohol → (Cr₂O₇²⁻/H⁺) → aldehído → (más oxidación) → ácido carboxílico → (alcohol, H₂SO₄ como catalizador) → éster. Los alcoholes primarios se oxidan dos veces, los secundarios se oxidan una vez y dan cetonas, y los terciarios no se oxidan.

Spanish, before:

> Alqueno → (H2O, con H+ de catalizador) → alcohol. Alqueno → (HX) → haloalcano → (OH−) → alcohol → (Cr2O7 2−/H+) → aldehído → (más oxidación) → ácido carboxílico → (alcohol, con H2SO4 de catalizador) → éster. Los alcoholes primarios se oxidan dos veces, los secundarios se oxidan una vez y dan cetonas, y los terciarios no se oxidan.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The reaction pathway you must know”**

English:

> A reaction map, read from the top down. Down the left: an alkene gives a primary alcohol with H₂O and an H₃PO₄ catalyst; the primary alcohol gives an aldehyde with Cr₂O₇²⁻/H⁺, the aldehyde a carboxylic acid with Cr₂O₇²⁻/H⁺, and the carboxylic acid an ester with an alcohol and an H₂SO₄ catalyst. On the right: the alkene can instead take HX to give a haloalkane, which gives the same primary alcohol with OH⁻(aq); and beside the primary alcohol, a secondary alcohol oxidises to a ketone with Cr₂O₇²⁻/H⁺.

Spanish, new:

> Un mapa de reacciones que se lee de arriba abajo. A la izquierda: un alqueno da un alcohol primario con H₂O y H₃PO₄ como catalizador; el alcohol primario da un aldehído con Cr₂O₇²⁻/H⁺, el aldehído un ácido carboxílico con Cr₂O₇²⁻/H⁺, y el ácido carboxílico un éster con un alcohol y H₂SO₄ como catalizador. A la derecha: el alqueno también puede dar un haloalcano con HX, que con OH⁻(aq) da el mismo alcohol primario; y junto al alcohol primario, un alcohol secundario se oxida a cetona con Cr₂O₇²⁻/H⁺.

- [ ] OK   Comment:

**Paragraph of section “Spotting groups in a spectrum”**

English:

> IR: a broad O–H stretch around 3200–3550 cm⁻¹ means alcohol (or, very broad and overlapping C–H, carboxylic acid); a strong C=O near 1670–1750 cm⁻¹ means aldehyde, ketone, acid, ester or amide. The VCE data book lists the exact ranges — use it.

Spanish, new:

> IR: una banda ancha de O–H hacia 3200–3550 cm⁻¹ indica un alcohol (o, si es muy ancha y se solapa con el C–H, un ácido carboxílico); un C=O intenso cerca de 1670–1750 cm⁻¹ indica un aldehído, una cetona, un ácido, un éster o una amida. Los intervalos exactos vienen en una tabla de IR: úsala.

Spanish, before:

> IR: una banda ancha de O–H hacia 3200–3550 cm⁻¹ indica un alcohol (o, si es muy ancha y se solapa con el C–H, un ácido carboxílico); un C=O intenso cerca de 1670–1750 cm⁻¹ indica un aldehído, una cetona, un ácido, un éster o una amida. El libro de datos de VCE da los intervalos exactos: úsalo.

- [ ] OK   Comment:

**Common mistake 1**

English:

> Calling a molecule with –OH on a benzene ring an alcohol (it is a phenol) — a common trap.

Spanish, new:

> Llamar alcohol a una molécula con –OH sobre un anillo de benceno (es un fenol): es una trampa habitual.

Spanish, before:

> Llamar alcohol a una molécula con –OH sobre un anillo de benceno (es un fenol): queda fuera del temario de VCE, pero es una trampa habitual.

- [ ] OK   Comment:


---

## Italian (it): 93 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-it.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 anni*. The SI space starts at five digits (*65 000*); a four-digit number may stand unseparated, and it is what the isotopes prose already printed. |
| pH scale | **scala del pH** | With the article, as the sheet's own table heading has it. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| the pH scale's everyday examples (diagram labels) | **succhi gastrici** (1), **aceto** (3), **acqua pura** (7), **bicarbonato** (8), **sgrassatore per forni** (13) | The words the sheet's own pH table uses, each at the same pH band as the English. *Succhi gastrici* is plural, as Italian says it. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| particle | **particella** | Added 2026-09-25 for the States of Matter diagrams. |
| melting / boiling (a heating curve's plateaus) | **fusione / ebollizione** | As in the sheet's table of phase changes. Added 2026-09-25 for the States of Matter diagrams. |
| heating curve | **curva di riscaldamento** | Matches the sheet's section heading. Added 2026-09-25 for the States of Matter diagrams. |
| energy added (a graph's axis) | **energia fornita** | Italian textbooks say *calore fornito*; *energia* keeps the sheet's word. *Energia aggiunta* is a calque. Added 2026-09-25 for the States of Matter diagrams. |
| gas, as a state name in a diagram | **gas** | Italian school books also call the state *aeriforme*. Kept *gas*, per the row above and the sheet's own prose, so the diagram and the paragraph agree. **Rated medium.** Added 2026-09-25 for the States of Matter diagrams. |
| VSEPR shapes: linear, trigonal planar, tetrahedral, trigonal pyramidal, bent | **lineare, trigonale planare, tetraedrica, piramidale trigonale, angolare** | Added 2026-09-25 with the Lewis sheet's shape diagram (`lewis-structures/02-vsepr-shapes`). Feminine, agreeing with *geometria*. **Bent is *angolare*, not *piegata***: both are in Italian textbooks, and *angolare* is the word the sheet's VSEPR paragraph already used directly above the drawing, so the two agree. Angles: *109,5°*. |
| bond angle | **angolo di legame** | Added 2026-09-25. |
| wedge / hashed wedge (a bond towards / away from the viewer) | **cuneo pieno / cuneo tratteggiato** | Added 2026-09-25, for alt text. |
| lone-pair lobe (in a VSEPR drawing) | **lobo** | Added 2026-09-25, for alt text. |
| electron shell (the curriculum's word) | **guscio elettronico** | VC2S10U07 says "electron shells", so the sheet names *guscio* once as the word the reader's teacher uses, and keeps *livello di energia* as its own term. Since 2026-09-25 the sentence credits the word to the teacher alone (*Chi ti insegna può chiamarli gusci*); it no longer mentions the programma. |
| valence electrons from the group number | **l’ultima cifra del numero del gruppo** (*il Cl è nel gruppo 17: 7 elettroni di valenza*) | Added 2026-09-25. The sheets number the groups 1–18, where *numero del gruppo = elettroni di valenza* only holds for groups 1 and 2. Some Italian textbooks still print the I–VIII A-group numbering, where the plain rule works; the last-digit rule is correct in both. **Rated medium**: a teacher using an older book may prefer to name the Roman numeral too. |
| beta decay | **decadimento beta** | Added 2026-09-25, for how reactors make neptunium and plutonium. Matches *particella beta*; *decadimento* is the school word, not *disintegrazione*. |
| shielding gamma ("reduces, never stops") | **attenuare**: *il piombo o il cemento spesso la attenuano molto* | Added 2026-09-24. *Attenuazione* is the textbook word for gamma passing through matter; alpha and beta keep *fermare*. |
| electron cloud (diagram label) | **nube elettronica** | Added 2026-09-25 with the redrawn atom diagrams. *Nuvola elettronica* is also in circulation; *nube* is the textbook form and is shorter. The old alt text said *nuvola sfumata*; the new one follows the label. |
| not to scale (diagram caveat) | **Non in scala**, and the ratio as **1/100 000 del diametro dell’atomo** | Added 2026-09-25 with the redrawn atom diagrams. Says *diametro*, because by volume the ratio is about 10⁻¹⁵. |
| heavier, but first / lighter, but second (06) | **più pesante, ma viene prima** / **più leggero, ma viene dopo** | Added 2026-09-25 with the redrawn atom diagrams. *Venire prima / dopo* is the natural Italian for a place in a sequence. |
| a cell of the periodic table | **casella** | Added 2026-09-25 with the redrawn atom diagrams. |
| percentages | **12,5%**, with no space before the sign | Added 2026-09-25 with the redrawn isotope diagrams. The glossary was silent. Italian school books and the Italian CLDR format write the sign straight after the number, so Italian differs from de, fr, es and ru here. |
| hydrogen-1, -2, -3 (03) | **idrogeno-1**, **idrogeno-2**, **idrogeno-3** | Added 2026-09-25 with the redrawn isotope diagrams. With a hyphen, like *carbonio-14*. |
| protium / deuterium / tritium (03) | **prozio** / **deuterio** / **trizio** | Added 2026-09-25 with the redrawn isotope diagrams. Printed under the mass-number name. Note the Italian spellings *prozio* and *trizio*, not *protio* / *tritio*. |
| stable / radioactive, of one isotope (03) | **stabile** / **radioattivo** | Added 2026-09-25 with the redrawn isotope diagrams. Masculine, agreeing with *idrogeno*. |
| undecayed nuclei (07, vertical axis) | **nuclei non ancora decaduti** | Added 2026-09-25 with the redrawn isotope diagrams. The quantity Italian textbooks plot in the decay law, with *decadere* per the row above. Replaces "how much is left", which suggests the sample disappears. |
| time in half-lives (07, horizontal axis) | **tempo, in tempi di dimezzamento** | Added 2026-09-25 with the redrawn isotope diagrams. |
| name order vs formula order | formula **cation first**, name **anion first**: *cloruro di sodio*, NaCl | Added 2026-09-25. The English common mistake "writing the anion first because it sounds first" was removed, since in English the cation is said first. In Italian the trap is real, but an overlay must keep the English list lengths, so the point lives in takeaway 2 of *Writing Ionic Formulas* instead. |
| cross-over method (charges → subscripts) | **metodo dell’incrocio** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Already the sheet's term. |
| significant figures | **cifre significative** | Added 2026-09-25. The rule is phrased *allo stesso numero di cifre significative del dato meno preciso*, not a fixed three. |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet. The IR sentence now points to *una tabella IR*, and the polyatomic-ion table is headed *Gli ioni poliatomici più comuni*. |
| CSA (condizioni standard ambiente) | **withheld — spell out "a 25 °C e 100 kPa"** | Added 2026-09-25. "CSA" is a VCE (Australian) abbreviation with no Italian equivalent, so the conversion-table cell now names the conditions instead, keeping the English value (V_m = 24,8 L/mol). |
| a two-pan balance (the relative-mass picture) | **bilancia a due piatti**; level is **in equilibrio** | Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| mole ratio | **rapporto molare** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). |
| number of particles (N) | **numero di particelle** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). |
| moles of reactant / product (mole-map boxes) | **moli di reagente / di prodotto** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). *Moli di*, as the overlay says it (*converti in moli*); *quantità di sostanza del reagente* is correct and too long for the box. |
| primary / secondary / tertiary alcohol | **alcol primario / secondario / terziario** | Added 2026-09-25 with the reaction-map diagram. |
| catalyst | **catalizzatore** | Added 2026-09-25. On the reaction map: *H₃PO₄ come catalizzatore*. |
| skeletal formula | **formula scheletrica** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). *Formula topologica* is also used. **Rated medium.** |
| methyl (group), as a diagram label | **metile** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). *Metile* as a noun; *metil-* inside a name. The alcohol suffix is **-olo** (*3-metilpentan-2-olo*), as the sheet already writes it. |

### Diagram labels

Text drawn inside the diagrams. Labels must stay short: they sit in a fixed space. Text in {braces} is filled in with a number.

#### Atoms & the Periodic Table — diagram “What an atom is made of”

| Label | English | Italian | OK / comment |
|---|---|---|---|
| electronCloud | electron cloud | nube elettronica | |
| nucleus | nucleus | nucleo | |
| proton | proton | protone | |
| neutron | neutron | neutrone | |
| scale | Not to scale: the nucleus is about 1/100,000 of the atom’s width. | Non in scala: il nucleo misura circa 1/100 000 del diametro dell’atomo. | |

#### Atoms & the Periodic Table — diagram “Atomic number and mass number”

| Label | English | Italian | OK / comment |
|---|---|---|---|
| massNumber | mass number = protons + neutrons | numero di massa = protoni + neutroni | |
| atomicNumber | atomic number = protons | numero atomico = protoni | |
| subtraction | {mass} − {atomic} = {neutrons} neutrons | {mass} − {atomic} = {neutrons} neutroni | |

#### Atoms & the Periodic Table — diagram “Electrons, energy levels…” (sodium)

| Label | English | Italian | OK / comment |
|---|---|---|---|
| outerLevel | outer level | livello esterno | |
| arrangement | {first}, {second}, {third} | {first}, {second}, {third} | |
| electrons | {count} electrons | {count} elettroni | |
| countNote | A way to count electrons, not a picture of an atom. | Un modo per contare gli elettroni, non un’immagine dell’atomo. | |

#### Atoms & the Periodic Table — diagram “Ordered by atomic number”

| Label | English | Italian | OK / comment |
|---|---|---|---|
| atomicNumber | atomic number | numero atomico | |
| relativeAtomicMass | relative atomic mass | massa atomica relativa | |
| telluriumName | Tellurium | Tellurio | |
| telluriumMass | 127.60 | 127,60 | |
| telluriumRank | heavier, but first | più pesante, ma viene prima | |
| iodineName | Iodine | Iodio | |
| iodineMass | 126.90 | 126,90 | |
| iodineRank | lighter, but second | più leggero, ma viene dopo | |

#### Isotopes & Radioactivity — diagram “Isotopes” (hydrogen)

| Label | English | Italian | OK / comment |
|---|---|---|---|
| proton | proton | protone | |
| neutron | neutron | neutrone | |
| electron | electron | elettrone | |
| isotopeName | hydrogen-{mass} | idrogeno-{mass} | |
| protium | protium | prozio | |
| deuterium | deuterium | deuterio | |
| tritium | tritium | trizio | |
| stable | stable | stabile | |
| radioactive | radioactive | radioattivo | |

#### Isotopes & Radioactivity — diagram “Half-life”

| Label | English | Italian | OK / comment |
|---|---|---|---|
| axisAmount | undecayed nuclei | nuclei non ancora decaduti | |
| axisTime | time, in half-lives | tempo, in tempi di dimezzamento | |
| percent0 | 100% | 100% | |
| percent1 | 50% | 50% | |
| percent2 | 25% | 25% | |
| percent3 | 12.5% | 12,5% | |
| percent4 | 6.25% | 6,25% | |

#### Diagram states-of-matter/01-particles-in-each-state

| Label | English | Italian | OK / comment |
|---|---|---|---|
| solid | solid | solido | |
| liquid | liquid | liquido | |
| gas | gas | gas | |

#### Diagram states-of-matter/02-heating-curve

| Label | English | Italian | OK / comment |
|---|---|---|---|
| axisTemperature | temperature | temperatura | |
| axisEnergy | energy added | energia fornita | |
| degrees | {t} °C | {t} °C | |
| melting | melting | fusione | |
| boiling | boiling | ebollizione | |
| solid | solid | solido | |
| liquid | liquid | liquido | |
| gas | gas | gas | |

#### Diagram lewis-structures/01-lewis-structures

| Label | English | Italian | OK / comment |
|---|---|---|---|
| lonePair | lone pair | doppietto solitario | |
| sharedPair | shared pair | doppietto di legame | |
| water | H₂O | H₂O | |
| ammonia | NH₃ | NH₃ | |
| carbonDioxide | CO₂ | CO₂ | |
| methane | CH₄ | CH₄ | |

#### Diagram lewis-structures/02-vsepr-shapes

| Label | English | Italian | OK / comment |
|---|---|---|---|
| carbonDioxide | CO₂ | CO₂ | |
| boronTrifluoride | BF₃ | BF₃ | |
| methane | CH₄ | CH₄ | |
| ammonia | NH₃ | NH₃ | |
| water | H₂O | H₂O | |
| linear | linear, 180° | lineare, 180° | |
| trigonalPlanar | trigonal planar, 120° | trigonale planare, 120° | |
| tetrahedral | tetrahedral, 109.5° | tetraedrica, 109,5° | |
| trigonalPyramidal | trigonal pyramidal, 107° | piramidale trigonale, 107° | |
| bent | bent, 104.5° | angolare, 104,5° | |

#### Diagram functional-groups/01-reaction-map

| Label | English | Italian | OK / comment |
|---|---|---|---|
| alkene | alkene | alchene | |
| haloalkane | haloalkane | alogenuro alchilico | |
| primaryAlcohol | primary alcohol | alcol primario | |
| secondaryAlcohol | secondary alcohol | alcol secondario | |
| aldehyde | aldehyde | aldeide | |
| ketone | ketone | chetone | |
| carboxylicAcid | carboxylic acid | acido carbossilico | |
| ester | ester | estere | |
| hydration | H2O, H3PO4 catalyst | H2O, H3PO4 come catalizzatore | |
| addition | HX | HX | |
| substitution | OH− (aq) | OH− (aq) | |
| oxidation | Cr2O7 2−/H+ | Cr2O7 2−/H+ | |
| esterification | alcohol, H2SO4 catalyst | alcol, H2SO4 come catalizzatore | |

#### Diagram relative-formula-mass/01-carbon-hydrogen-balance

| Label | English | Italian | OK / comment |
|---|---|---|---|
| carbonAtom | carbon atom | atomo di carbonio | |
| hydrogenAtoms | hydrogen atoms | atomi di idrogeno | |
| notToScale | Not to scale | Non in scala | |

#### Diagram balancing-equations/01-particle-equation

| Label | English | Italian | OK / comment |
|---|---|---|---|
| reactants | reactants | reagenti | |
| products | products | prodotti | |
| hydrogen | 2H2 | 2H2 | |
| oxygen | O2 | O2 | |
| water | 2H2O | 2H2O | |

#### Diagram chemical-bonds/01-bonding-models

| Label | English | Italian | OK / comment |
|---|---|---|---|
| ionic | ionic | legame ionico | |
| covalent | covalent | legame covalente | |
| metallic | metallic | legame metallico | |
| sharedPair | shared pair | doppietto di legame | |
| delocalised | delocalised electrons | elettroni delocalizzati | |

#### Diagram acids-and-bases/01-ph-scale

| Label | English | Italian | OK / comment |
|---|---|---|---|
| stomachAcid | stomach acid | succhi gastrici | |
| vinegar | vinegar | aceto | |
| pureWater | pure water | acqua pura | |
| bakingSoda | baking soda | bicarbonato | |
| ovenCleaner | oven cleaner | sgrassatore per forni | |

#### Diagram chemical-formulas/01-cross-over

| Label | English | Italian | OK / comment |
|---|---|---|---|
| cation | cation | catione | |
| anion | anion | anione | |
| cationFormula | Al 3+ | Al 3+ | |
| anionFormula | SO4 2− | SO4 2− | |
| formula | Al2(SO4)3 | Al2(SO4)3 | |
| positive | {count} × (+{charge}) = +{total} | {count} × (+{charge}) = +{total} | |
| negative | {count} × (−{charge}) = −{total} | {count} × (−{charge}) = −{total} | |

#### Diagram naming-compounds/01-which-system

| Label | English | Italian | OK / comment |
|---|---|---|---|
| metalNonMetal | metal + non-metal | metallo + non metallo | |
| twoNonMetals | two non-metals | due non metalli | |
| hydrogenInWater | H first, in water | H davanti, in acqua | |
| ionic | ionic | ionico | |
| molecular | molecular | molecolare | |
| acid | acid | acido | |
| ionicExample | sodium chloride | cloruro di sodio | |
| molecularExample | sulfur dioxide | diossido di zolfo | |
| acidExample | hydrochloric acid | acido cloridrico | |

#### Diagram stoichiometry/01-mole-map

| Label | English | Italian | OK / comment |
|---|---|---|---|
| mass | mass | massa | |
| particles | particles | numero di particelle | |
| gasVolume | gas volume | volume di gas | |
| solution | solution | soluzione | |
| fromMass | n = m/M | n = m/M | |
| fromParticles | n = N/NA | n = N/NA | |
| fromGasVolume | n = V/Vm | n = V/Vm | |
| fromSolution | n = cV | n = cV | |
| reactantMoles | moles of reactant | moli di reagente | |
| moleRatio | mole ratio (coefficients) | rapporto molare (coefficienti) | |
| productMoles | moles of product | moli di prodotto | |

#### Diagram organic-nomenclature/01-numbered-chain

| Label | English | Italian | OK / comment |
|---|---|---|---|
| hydroxyl | OH | OH | |
| methyl | methyl | metile | |
| name | {methylAt}-methylpentan-{hydroxylAt}-ol | {methylAt}-metilpentan-{hydroxylAt}-olo | |

### Atoms & the Periodic Table

**Key takeaway 3**

English:

> Electrons sit in energy levels, and how many are in the outer level decides which group (column) an element is in.

Italian, new:

> Gli elettroni stanno su livelli di energia, e quanti ce ne sono sul livello esterno decide in quale gruppo (colonna) si trova un elemento.

Italian, before:

> Gli elettroni stanno su livelli di energia, e quanti ce ne sono sul livello esterno è il criterio con cui la tavola è ordinata.

- [ ] OK   Comment:

**Example card 1 (Cl-35): description**

English:

> 17 protons, 18 neutrons

Italian, new:

> 17 protoni, 18 neutroni

- [ ] OK   Comment:

**Example card 2 (Cl-37): description**

English:

> 17 protons, 20 neutrons

Italian, new:

> 17 protoni, 20 neutroni

- [ ] OK   Comment:

**Example card 3 (H+): description**

English:

> a hydrogen atom that has lost its one electron — a bare proton

Italian, new:

> un atomo di idrogeno che ha perso il suo unico elettrone – resta solo un protone

- [ ] OK   Comment:

**Diagram description (alt text) in section “What an atom is made of”**

English:

> An atom: a nucleus of three protons (filled circles) and four neutrons (hollow circles), with an electron cloud around it that is densest right next to the nucleus and thins out, with no edge, further away. Three protons and four neutrons would make it lithium-7, but the picture stands for any atom. Labels name the electron cloud, the nucleus, a proton and a neutron. A note says it is not to scale: the nucleus is about 1/100,000 of the atom’s width.

Italian, new:

> Un atomo: un nucleo di tre protoni (cerchi pieni) e quattro neutroni (cerchi vuoti), circondato da una nube elettronica molto fitta vicino al nucleo, che si dirada verso l’esterno senza un bordo. Con tre protoni e quattro neutroni sarebbe litio-7, ma il disegno vale per qualsiasi atomo. Le etichette indicano la nube elettronica, il nucleo, un protone e un neutrone. Una nota dice che non è in scala: il nucleo misura circa 1/100 000 del diametro dell’atomo.

Italian, before:

> Un nucleo di protoni e neutroni al centro, circondato da una nuvola sfumata che mostra dove è probabile trovare gli elettroni. Una nota avverte che il nucleo è disegnato molto più grande del vero, altrimenti non si vedrebbe.

- [ ] OK   Comment:

**Paragraph of section “Atomic number and mass number”**

English:

> The atomic number is the number of protons, and it is what makes an atom that element. Every chlorine atom has 17 protons; anything with 17 protons is chlorine. The mass number is protons plus neutrons. Neutrons can vary without changing which element it is.

Italian, new:

> Il numero atomico è il numero di protoni, ed è ciò che rende un atomo quell’elemento. Ogni atomo di cloro ha 17 protoni; qualunque cosa abbia 17 protoni è cloro. Il numero di massa è protoni più neutroni. I neutroni possono cambiare senza che cambi l’elemento.

Italian, before:

> Il numero atomico è il numero di protoni, ed è ciò che rende un atomo quell’elemento. Ogni atomo di cloro ha 17 protoni; qualunque cosa abbia 17 protoni è cloro. Il numero di massa è protoni più neutroni. I neutroni possono cambiare senza che cambi l’elemento. Qui i due termini sono un ampliamento: il programma di questi anni non ne nomina nessuno, e senza di essi non puoi leggere una casella della tavola.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Atomic number and mass number”**

English:

> The symbol for chlorine-35: the mass number 35 above the atomic number 17, to the left of Cl. A line joins the 35 to “mass number = protons + neutrons” and another joins the 17 to “atomic number = protons”. Underneath: 35 − 17 = 18 neutrons.

Italian, new:

> Il simbolo del cloro-35: il numero di massa 35 sopra il numero atomico 17, a sinistra di Cl. Una linea collega il 35 a «numero di massa = protoni + neutroni» e un’altra collega il 17 a «numero atomico = protoni». Sotto: 35 − 17 = 18 neutroni.

Italian, before:

> Il simbolo del cloro-35 con il numero di massa 35 scritto sopra il numero atomico 17, e delle frecce: 17 protoni, e 35 meno 17 dà 18 neutroni.

- [ ] OK   Comment:

**Paragraph of section “Electrons, energy levels and the shape of the table”**

English:

> Electrons occupy energy levels around the nucleus. The first holds up to 2, the next up to 8, then 8 again for the first twenty elements. Your teacher may call these shells; it means the same thing. Counting electrons this way is called the Bohr model: it is useful, and it is not a picture of a real atom. The number in the outer level sets how an atom reacts. Elements are placed in the same group when they have the same outer count, which is why a group behaves alike.

Italian, new:

> Gli elettroni occupano livelli di energia intorno al nucleo. Il primo ne tiene fino a 2, il successivo fino a 8, poi ancora 8 per i primi venti elementi. Chi ti insegna può chiamarli gusci: è la stessa cosa. Contare gli elettroni in questo modo si chiama modello di Bohr: è utile, e non è la fotografia di un atomo vero. Quanti ce ne sono sul livello esterno decide come reagisce un atomo. Due elementi stanno nello stesso gruppo quando ne hanno lo stesso numero all’esterno. È per questo che un gruppo si comporta in modo simile.

Italian, before:

> Gli elettroni occupano livelli di energia intorno al nucleo. Il primo ne tiene fino a 2, il successivo fino a 8, poi ancora 8 per i primi venti elementi. Chi ti insegna, e anche il programma, può chiamarli gusci: è la stessa cosa. Contare gli elettroni in questo modo si chiama modello di Bohr: è utile, e non è la fotografia di un atomo vero. Quanti ce ne sono sul livello esterno decide come reagisce un atomo. Due elementi stanno nello stesso gruppo quando ne hanno lo stesso numero all’esterno. È per questo che un gruppo si comporta in modo simile.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Electrons, energy levels and the shape of the table”**

English:

> Sodium, Na, drawn as a model for counting electrons: a disc marked Na for the nucleus, inside three bands with visible edges that hold 2, 8 and 1 electrons at irregular angles. The single electron in the outer band is circled and labelled “outer level”. Below, the arrangement 2, 8, 1 and the total, 11 electrons. A note says it is a way to count electrons, not a picture of an atom.

Italian, new:

> Il sodio, Na, disegnato come modello per contare gli elettroni: un disco con la scritta Na per il nucleo, dentro tre bande dal bordo visibile che contengono 2, 8 e 1 elettroni ad angoli irregolari. L’unico elettrone della banda esterna è cerchiato ed etichettato «livello esterno». Sotto, la disposizione 2, 8, 1 e il totale, 11 elettroni. Una nota dice che è un modo per contare gli elettroni, non un’immagine dell’atomo.

Italian, before:

> Un nucleo di sodio con 11 protoni e 12 neutroni, circondato da tre bande sfumate che contengono 2, 8 e 1 elettroni, disegnati come segni ad angoli irregolari e non come punti su cerchi. Accanto, la disposizione 2, 8, 1 con il livello esterno per ultimo. La figura stessa dice che è un modo per contare gli elettroni e non l’immagine di un atomo, e che il nucleo è disegnato circa 100 000 volte troppo grande.

- [ ] OK   Comment:

**Paragraph of section “Groups and periods”**

English:

> A group is a column of the table and a period is a row. Elements in one group have the same number of electrons in their outer level, so the column predicts how an element reacts. Group 1 is the alkali metals, group 17 the halogens and group 18 the noble gases. A period tells you how many energy levels are in use: an element in period 3 uses three of them. So atoms get bigger as you go down to a new row.

Italian, new:

> Un gruppo è una colonna della tavola e un periodo è una riga. Gli elementi di uno stesso gruppo hanno lo stesso numero di elettroni sul livello esterno. La colonna prevede quindi come reagisce un elemento. Il gruppo 1 sono i metalli alcalini, il gruppo 17 gli alogeni e il gruppo 18 i gas nobili. Il periodo dice quanti livelli di energia sono in uso: un elemento del periodo 3 ne usa tre. Per questo gli atomi diventano più grandi ogni volta che scendi a una nuova riga.

Italian, before:

> Un gruppo è una colonna della tavola e un periodo è una riga. Gli elementi di uno stesso gruppo hanno lo stesso numero di elettroni sul livello esterno. La colonna prevede quindi come reagisce un elemento. Il gruppo 1 sono i metalli alcalini, il gruppo 17 gli alogeni e il gruppo 18 i gas nobili. Il periodo dice quanti livelli di energia sono in uso: un elemento del periodo 3 ne usa tre. La riga ti dice così, all’incirca, quanto è grande l’atomo.

- [ ] OK   Comment:

**Paragraph of section “Metals and non-metals”**

English:

> Metals fill the left and the middle of the table, and non-metals sit in the top right corner. A metal conducts electricity and heat, has a shiny surface, and can be hammered into a sheet without shattering. Almost every metal is solid at room temperature; mercury is the liquid one. A non-metal is usually a poor conductor, dull, and brittle if it is solid at all. Many non-metals are gases. A few elements along the staircase between the two, such as silicon, behave partly like each. They are called metalloids.

Italian, new:

> I metalli riempiono la sinistra e il centro della tavola, e i non metalli stanno nell’angolo in alto a destra. Un metallo conduce l’elettricità e il calore, ha una superficie lucida e si lascia battere in lamina senza rompersi. Quasi tutti i metalli sono solidi a temperatura ambiente; il mercurio è quello liquido. Un non metallo di solito conduce male, è opaco e si spezza, ammesso che sia solido. Molti non metalli sono gas. Alcuni elementi sulla scala che sta fra gli uni e gli altri, come il silicio, si comportano un po’ come entrambi. Si chiamano semimetalli.

Italian, before:

> I metalli riempiono la sinistra e il centro della tavola, e i non metalli stanno nell’angolo in alto a destra. Un metallo conduce l’elettricità e il calore, ha una superficie lucida e si lascia battere in lamina senza rompersi. Quasi tutti i metalli sono solidi a temperatura ambiente; il mercurio è quello liquido. Un non metallo di solito conduce male, è opaco e si spezza, ammesso che sia solido. Molti non metalli sono gas. Ampliamento: alcuni elementi sulla scala che sta fra gli uni e gli altri, come il silicio, si comportano un po’ come entrambi. Si chiamano semimetalli, una parola che il programma non usa.

- [ ] OK   Comment:

**Paragraph of section “Reactivity, and why a group behaves alike”**

English:

> You can test a group by reacting its elements with oxygen, water and acids, and they behave the same way as each other. Group 1 metals react with water and get more violent down the group: lithium fizzes, sodium darts about, potassium catches fire. The same metals with an acid give off hydrogen faster still, which is far too violent to try in a school lab. Group 17 elements run the other way and get less reactive down the group. Group 18 already has a full outer level, so the noble gases react with almost nothing.

Italian, new:

> Puoi mettere alla prova un gruppo facendo reagire i suoi elementi con ossigeno, acqua e acidi: fra loro si comportano allo stesso modo. I metalli del gruppo 1 reagiscono con l’acqua e diventano più violenti scendendo: il litio sfrigola, il sodio sfreccia in superficie, il potassio prende fuoco. Gli stessi metalli con un acido liberano idrogeno ancora più in fretta, con una reazione troppo violenta per farla a scuola. Gli elementi del gruppo 17 vanno nel verso opposto e diventano meno reattivi scendendo. Il gruppo 18 ha già il livello esterno pieno, quindi i gas nobili non reagiscono quasi con niente.

Italian, before:

> Puoi mettere alla prova un gruppo facendo reagire i suoi elementi con ossigeno, acqua e acidi: fra loro si comportano allo stesso modo. I metalli del gruppo 1 reagiscono con l’acqua e diventano più violenti scendendo: il litio sfrigola, il sodio sfreccia in superficie, il potassio prende fuoco. Gli stessi metalli con un acido liberano idrogeno, e ancora più in fretta. Gli elementi del gruppo 17 vanno nel verso opposto e diventano meno reattivi scendendo. Il gruppo 18 ha già il livello esterno pieno, quindi i gas nobili non reagiscono quasi con niente.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Ordered by atomic number, not by mass”**

English:

> Two periodic-table cells side by side, with an arrow from the first to the second for the order in the table. Tellurium: atomic number 52, relative atomic mass 127.60, labelled “heavier, but first”. Iodine: atomic number 53, relative atomic mass 126.90, labelled “lighter, but second”. In the tellurium cell the two numbers are labelled atomic number and relative atomic mass.

Italian, new:

> Due caselle della tavola periodica affiancate, con una freccia dalla prima alla seconda per l’ordine nella tavola. Tellurio: numero atomico 52, massa atomica relativa 127,60, con «più pesante, ma viene prima». Iodio: numero atomico 53, massa atomica relativa 126,90, con «più leggero, ma viene dopo». Nella casella del tellurio i due numeri sono etichettati numero atomico e massa atomica relativa.

Italian, before:

> Il tellurio e lo iodio uno accanto all’altro. Il tellurio ha la massa atomica relativa maggiore ma il numero atomico minore, e la tavola lo mette per primo.

- [ ] OK   Comment:


### Isotopes & Radioactivity

**Example card 1 (H-3): name**

English:

> Hydrogen-3 (tritium)

Italian, new:

> Idrogeno-3 (trizio)

Italian, before:

> Carbonio-12

- [ ] OK   Comment:

**Example card 1 (H-3): description**

English:

> radioactive: half-life about 12 years

Italian, new:

> radioattivo: tempo di dimezzamento di circa 12 anni

- [ ] OK   Comment:

**Example card 2 (Rn-222): description**

English:

> decays by giving out an alpha particle

Italian, new:

> decade emettendo una particella alfa

- [ ] OK   Comment:

**Example card 3 (I-131): description**

English:

> decays by giving out a beta particle

Italian, new:

> decade emettendo una particella beta

- [ ] OK   Comment:

**Example card 4 (Co-60): description**

English:

> gives out beta and gamma radiation — used for its gamma

Italian, new:

> emette radiazione beta e gamma – si usa per la gamma

- [ ] OK   Comment:

**Example card 5 (C-14): description**

English:

> half-life about 5730 years

Italian, new:

> tempo di dimezzamento di circa 5730 anni

- [ ] OK   Comment:

**Example card 6 (U-238): description**

English:

> half-life about 4.5 billion years

Italian, new:

> tempo di dimezzamento di circa 4,5 miliardi di anni

- [ ] OK   Comment:

**Paragraph of section “The two numbers this sheet needs”**

English:

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put. Why an element's relative atomic mass, such as chlorine's 35.5, is not a whole number is on the Relative Atomic & Formula Mass sheet.

Italian, new:

> Il numero atomico è quanti protoni ha un atomo, ed è ciò che fissa di quale elemento si tratta. Il numero di massa è protoni più neutroni. Tutto questo bigino parla del secondo numero che cambia mentre il primo resta fermo. Perché la massa atomica relativa di un elemento, per esempio il 35,5 del cloro, non è un numero intero lo spiega il bigino «Massa atomica e massa formula relative».

Italian, before:

> Il numero atomico è quanti protoni ha un atomo, ed è ciò che fissa di quale elemento si tratta. Il numero di massa è protoni più neutroni. Tutto questo bigino parla del secondo numero che cambia mentre il primo resta fermo. I due termini sono un ampliamento: il programma di questi anni non ne nomina nessuno, e senza di essi qui non funziona niente.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Isotopes”**

English:

> Three hydrogen atoms, one above another. Each has one proton (a filled circle) and one electron in a soft band around the nucleus. Hydrogen-1 (protium) has no neutrons, hydrogen-2 (deuterium) has one and hydrogen-3 (tritium) has two (hollow circles). Hydrogen-1 and hydrogen-2 are labelled stable, and hydrogen-3 radioactive. Labels name the electron, the proton and the neutron.

Italian, new:

> Tre atomi di idrogeno, uno sotto l’altro. Ognuno ha un protone (cerchio pieno) e un elettrone in una zona sfumata intorno al nucleo. L’idrogeno-1 (prozio) non ha neutroni, l’idrogeno-2 (deuterio) ne ha uno e l’idrogeno-3 (trizio) due (cerchi vuoti). L’idrogeno-1 e l’idrogeno-2 sono indicati come stabili, l’idrogeno-3 come radioattivo. Le etichette indicano l’elettrone, il protone e il neutrone.

Italian, before:

> Tre atomi di idrogeno uno accanto all’altro: uno con un protone, uno con un protone e un neutrone, uno con un protone e due neutroni. Tutti e tre hanno un solo elettrone.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

Italian, new:

> Alcuni nuclei sono instabili. Decadono da soli, emettono radiazione e lasciano dietro di sé un atomo più stabile. Il radon-222 scaglia fuori una particella alfa, cioè due protoni e due neutroni insieme. Lo iodio-131 emette una particella beta, cioè un elettrone veloce uscito dal nucleo. Il cobalto-60 emette radiazione beta e gamma, e si usa per la gamma, che è energia e non una particella. Un foglio di carta ferma l’alfa e una lamina di alluminio ferma la beta. Niente ferma del tutto la gamma: il piombo o il cemento spesso la attenuano molto.

Italian, before:

> Alcuni nuclei sono instabili. Decadono da soli, emettono radiazione e lasciano dietro di sé un atomo più stabile. Il radon-222 scaglia fuori una particella alfa, cioè due protoni e due neutroni insieme. Lo iodio-131 emette una particella beta, cioè un elettrone veloce uscito dal nucleo. Il cobalto-60 emette radiazione gamma, che è energia e non una particella. Un foglio di carta ferma l’alfa, una lamina di alluminio ferma la beta, e la gamma richiede piombo o cemento spesso.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Half-life”**

English:

> A decay curve of undecayed nuclei against time, in half-lives. It falls from 100 per cent to 50, 25, 12.5 and 6.25 per cent at one, two, three and four half-lives, with a dashed line down to the time axis at each point, and keeps falling after the fourth without reaching zero.

Italian, new:

> Una curva di decadimento: i nuclei non ancora decaduti in funzione del tempo, in tempi di dimezzamento. Scende dal 100 per cento al 50, al 25, al 12,5 e al 6,25 per cento dopo uno, due, tre e quattro tempi di dimezzamento, con una linea tratteggiata fino all’asse del tempo a ogni punto, e continua a scendere senza mai arrivare a zero.

Italian, before:

> Una curva di decadimento che scende dal 100 per cento al 50, al 25 e al 12,5 per cento dopo uno, due e tre tempi di dimezzamento, con una linea tratteggiata fino all’asse a ogni punto. Dopo tre tempi di dimezzamento ne resta un ottavo. Un tempo di dimezzamento è di 5730 anni per il carbonio-14 e di circa 4,5 miliardi di anni per l’uranio-238.

- [ ] OK   Comment:

**Paragraph of section “Elements that had to be made”**

English:

> Elements past uranium have no stable isotopes and are not found in nature in any useful amount. The first few, such as plutonium, are made in nuclear reactors: uranium takes in neutrons, and beta decay then turns it into neptunium and plutonium. The heavier ones are built in accelerators by firing one nucleus at another, sometimes a few atoms at a time. Many last less than a second before they decay. Making them is how the bottom rows of the periodic table were filled in.

Italian, new:

> Gli elementi dopo l’uranio non hanno isotopi stabili e non si trovano in natura in quantità apprezzabili. I primi, come il plutonio, si producono nei reattori nucleari: lì l’uranio cattura neutroni e poi il decadimento beta lo trasforma in nettunio e plutonio. Quelli più pesanti vengono costruiti negli acceleratori sparando un nucleo contro un altro, a volte pochi atomi alla volta. Molti durano meno di un secondo e poi decadono. È fabbricandoli che sono state riempite le ultime righe della tavola periodica.

Italian, before:

> Gli elementi dopo l’uranio non hanno isotopi stabili e non si trovano in natura. Vengono costruiti negli acceleratori sparando un nucleo contro un altro, a volte pochi atomi alla volta. Molti durano meno di un secondo e poi decadono. Questo è un ampliamento: il programma non chiede gli elementi fabbricati. Sono qui perché è così che sono state riempite le ultime righe della tavola periodica.

- [ ] OK   Comment:


### States of Matter

**Key takeaway 3**

English:

> Gases: particles move freely and are far apart — fills any container, easily compressed.

Italian, new:

> Gas: le particelle si muovono liberamente e sono molto distanti fra loro; riempiono qualsiasi recipiente e si comprimono facilmente.

Italian, before:

> Gas: le particelle si muovono liberamente e in fretta; riempiono qualsiasi recipiente e si comprimono facilmente.

- [ ] OK   Comment:

**Heading of section “Particles in each state”**

English:

> Particles in each state

Italian, new:

> Le particelle nei tre stati

- [ ] OK   Comment:

**Paragraph of section “Particles in each state”**

English:

> In a solid the particles touch in a regular pattern and vibrate in place. In a liquid they still touch, but they are jumbled and slide past one another; in a gas they are far apart and move freely in every direction. The particles are the same size in all three states: only their arrangement and the spaces between them change.

Italian, new:

> In un solido le particelle sono a contatto, disposte in modo regolare, e vibrano sul posto. In un liquido sono ancora a contatto, ma in disordine, e scivolano le une sulle altre; in un gas sono molto distanti fra loro e si muovono liberamente in tutte le direzioni. Le particelle hanno la stessa dimensione nei tre stati: cambiano solo la loro disposizione e gli spazi fra loro.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Particles in each state”**

English:

> Three boxes, one above another, with particles of the same size in each. Solid: particles touching in a regular block of rows and columns, resting on the floor of the box. Liquid: the same number of particles, still touching but jumbled, with small gaps, spread across the bottom of the box. Gas: five particles far apart across the whole box, each with two short marks behind it to show that it is moving.

Italian, new:

> Tre scatole una sopra l’altra, con particelle della stessa dimensione in ciascuna. Solido: le particelle sono a contatto e formano un blocco regolare di righe e colonne, appoggiato sul fondo della scatola. Liquido: lo stesso numero di particelle, ancora a contatto ma in disordine, con piccoli spazi, sparse sul fondo della scatola. Gas: cinque particelle molto distanti fra loro in tutta la scatola, ciascuna con due brevi trattini dietro per mostrare che si muove.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Heating and cooling curves”**

English:

> A heating curve for water: temperature up the side and energy added along the bottom, with no numbers on the energy axis. The line climbs steeply through the solid, stays flat at 0 °C for melting, climbs less steeply through the liquid, stays flat at 100 °C for boiling, then climbs steeply again through the gas. The boiling plateau is drawn to scale, almost seven times as long as the melting plateau: about 2260 J against 334 J for each gram.

Italian, new:

> Una curva di riscaldamento dell’acqua: la temperatura sull’asse verticale e l’energia fornita su quello orizzontale, senza numeri sull’asse dell’energia. La linea sale ripida nel solido, resta orizzontale a 0 °C durante la fusione, sale meno ripida nel liquido, resta orizzontale a 100 °C durante l’ebollizione e poi risale ripida nel gas. Il tratto dell’ebollizione è disegnato in scala, quasi sette volte più lungo di quello della fusione: circa 2260 J contro 334 J per grammo.

- [ ] OK   Comment:


### Acids & Bases

**Key takeaway 2**

English:

> Base: a proton acceptor. Soluble bases (alkalis) release hydroxide ions, OH−, in water. pH > 7.

Italian, new:

> Base: un accettore di protoni. Le basi solubili (alcali) liberano ioni idrossido, OH−, in acqua. pH > 7.

Italian, before:

> Base: un accettore di protoni. Le basi solubili (alcali) liberano ioni idrossido, OH-, in acqua. pH > 7.

- [ ] OK   Comment:

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

Italian, new:

> Neutro: pH 7 a 25 °C; l’acqua pura e le soluzioni di sali come NaCl.

Italian, before:

> Neutro: pH 7 a 25 °C; l’acqua pura e quasi tutti i sali.

- [ ] OK   Comment:

**Key takeaway 4**

English:

> Neutralisation: acid + base → salt + water. The ionic equation is always H+ + OH− → H2O.

Italian, new:

> Neutralizzazione: acido + base → sale + acqua. L’equazione ionica è sempre H+ + OH− → H2O.

Italian, before:

> Neutralizzazione: acido + base → sale + acqua. L’equazione ionica è sempre H+ + OH- → H2O.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

Italian, new:

> Ogni gradino della scala del pH è un fattore 10 nella concentrazione di H+: a pH 2 la concentrazione di H+ è 100 volte quella a pH 4.

Italian, before:

> Ogni gradino della scala del pH è un fattore 10 nella concentrazione di H+: un pH 2 è 100 volte più acido di un pH 4.

- [ ] OK   Comment:

**Heading of section “The pH scale”**

English:

> The pH scale

Italian, new:

> La scala del pH

- [ ] OK   Comment:

**Paragraph of section “The pH scale”**

English:

> pH says how acidic or alkaline a solution is. At 25 °C, below 7 is acidic, 7 is neutral and above 7 is alkaline, and most solutions you will meet lie between 0 and 14. Universal indicator turns a different colour at each pH: red at the acidic end, green at 7 and purple at the alkaline end.

Italian, new:

> Il pH dice quanto una soluzione è acida o basica. A 25 °C sotto 7 è acida, a 7 è neutra e sopra 7 è basica, e quasi tutte le soluzioni che incontrerai stanno fra 0 e 14. L’indicatore universale assume un colore diverso a ogni pH: rosso dal lato acido, verde a 7 e viola dal lato basico.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The pH scale”**

English:

> The pH scale as a bar from 0 at the top to 14 at the bottom, each step in its universal-indicator colour with its number printed beside it: red at 0, orange at 1, yellow at 2 and 3, green from 4 to 8, blue-green at 9, blue at 10 and 11 and purple from 12 to 14. Five everyday solutions are marked at their pH: stomach acid at 1, vinegar at 3, pure water at 7, baking soda at 8 and oven cleaner at 13.

Italian, new:

> La scala del pH come una barra, con 0 in alto e 14 in basso, ogni gradino nel suo colore dell’indicatore universale e con il suo numero accanto: rosso a 0, arancione a 1, giallo a 2 e 3, verde da 4 a 8, verde-azzurro a 9, blu a 10 e 11 e viola da 12 a 14. Cinque prodotti di tutti i giorni sono segnati al loro pH: i succhi gastrici a 1, l’aceto a 3, l’acqua pura a 7, il bicarbonato a 8 e lo sgrassatore per forni a 13.

- [ ] OK   Comment:


### Balancing Chemical Equations

**Example card 1 (H2 + O2 -> H2O): name**

English:

> Unbalanced (no states yet)

Italian, new:

> Non bilanciata (ancora senza simboli di stato)

Italian, before:

> Non bilanciata

- [ ] OK   Comment:

**Diagram description (alt text) in section “A method that always works”**

English:

> The reaction 2H₂ + O₂ → 2H₂O drawn as particles. On the left, the reactants: two hydrogen molecules, each two touching atoms marked H, plus one oxygen molecule, two touching atoms marked O. An arrow points to the products: two water molecules, each an O atom with two H atoms. The equation is written under the particles, and under that the atoms are counted on each side: H 4 and 4, O 2 and 2.

Italian, new:

> La reazione 2H₂ + O₂ → 2H₂O disegnata con le particelle. A sinistra i reagenti: due molecole di idrogeno, ognuna di due atomi con la H che si toccano, più una molecola di ossigeno, due atomi con la O. Una freccia porta ai prodotti: due molecole d’acqua, ognuna un atomo di O con due atomi di H. Sotto le particelle c’è l’equazione e, sotto ancora, il conteggio degli atomi dei due lati: H 4 e 4, O 2 e 2.

- [ ] OK   Comment:


### Types of Chemical Reactions

**Key takeaway 3**

English:

> Combustion: fuel + oxygen → carbon dioxide + water (for a hydrocarbon fuel, burning completely) — releases heat.

Italian, new:

> Combustione: combustibile + ossigeno → diossido di carbonio + acqua (per un idrocarburo, con combustione completa); si libera calore.

Italian, before:

> Combustione: combustibile + ossigeno → diossido di carbonio + acqua (combustione completa); si libera calore.

- [ ] OK   Comment:


### Chemical Bonds & Structure

**Key takeaway 1**

English:

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons; helium, in group 18, has only 2).

Italian, new:

> Gli atomi si legano per raggiungere un guscio esterno completo e stabile (una configurazione da gas nobile). In un elemento rappresentativo, l’ultima cifra del numero del gruppo ti dice quanti elettroni di valenza ha (il Cl è nel gruppo 17: 7 elettroni di valenza; l’elio, nel gruppo 18, ne ha solo 2).

Italian, before:

> Gli atomi si legano per raggiungere un guscio esterno completo e stabile (una configurazione da gas nobile). Il numero del gruppo ti dice quanti elettroni di valenza ha un elemento rappresentativo.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Why ionic compounds conduct only when molten or dissolved”**

English:

> Three boxes, one above another. Ionic: a grid of small positive ions and large negative ions, alternating, each marked + or −. Covalent: one hydrogen molecule, two atoms marked H whose circles overlap, with two electron dots in the overlap, labelled shared pair. Metallic: a grid of positive metal ions with as many small electron dots scattered between them, labelled delocalised electrons.

Italian, new:

> Tre riquadri, uno sotto l’altro. Legame ionico: un reticolo di piccoli ioni positivi e grandi ioni negativi alternati, ognuno segnato con + o −. Legame covalente: una molecola di idrogeno, due atomi con la H i cui cerchi si sovrappongono, con due puntini (gli elettroni) nella zona comune, indicati come doppietto di legame. Legame metallico: un reticolo di ioni metallici positivi con altrettanti puntini (gli elettroni) sparsi fra loro, indicati come elettroni delocalizzati.

- [ ] OK   Comment:


### Writing Ionic Formulas

**Key takeaway 2**

English:

> Write the cation (metal or NH4+) first, then the anion.

Italian, new:

> Nella formula scrivi prima il catione (il metallo o NH4+) e poi l’anione, anche se nel nome l’anione viene prima: cloruro di sodio, NaCl.

Italian, before:

> Nella formula scrivi prima il catione (il metallo o NH4+) e poi l’anione.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Worked example: aluminium sulfate”**

English:

> Aluminium sulfate by the cross-over method. At the top, the aluminium ion Al³⁺, labelled cation, and the sulfate ion SO₄²⁻, labelled anion. Two crossing arrows carry each charge number down to become the other ion’s subscript: the 3 of Al³⁺ becomes the 3 after the bracketed sulfate, and the 2 of SO₄²⁻ becomes the 2 after Al. At the bottom, the formula Al₂(SO₄)₃, and the check: 2 × (+3) = +6 and 3 × (−2) = −6.

Italian, new:

> Il solfato di alluminio con il metodo dell’incrocio. In alto, lo ione alluminio Al³⁺, indicato come «catione», e lo ione solfato SO₄²⁻, indicato come «anione». Due frecce che si incrociano portano in basso ciascun numero di carica, che diventa il pedice dell’altro ione: il 3 di Al³⁺ diventa il 3 dopo il solfato tra parentesi, e il 2 di SO₄²⁻ il 2 dopo Al. In basso, la formula Al₂(SO₄)₃ e la verifica: 2 × (+3) = +6 e 3 × (−2) = −6.

- [ ] OK   Comment:


### Polyatomic Ions

**Key takeaway 2**

English:

> The only common polyatomic cation is ammonium, NH4+ (apart from hydronium, H3O+, which you meet in acids). All the rest are anions.

Italian, new:

> L’unico catione poliatomico comune è l’ammonio, NH4+ (a parte lo ione idronio, H3O+, che incontri negli acidi). Tutti gli altri sono anioni.

Italian, before:

> L’unico catione poliatomico comune è l’ammonio, NH4+. Tutti gli altri sono anioni.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Adding H+ to an anion makes its charge one less negative and adds "hydrogen" to the name: carbonate CO3 2− → hydrogen carbonate HCO3−.

Italian, new:

> Aggiungere H+ a un anione ne rende la carica meno negativa di un’unità e aggiunge «idrogeno» al nome: carbonato CO3 2− → idrogenocarbonato HCO3−.

Italian, before:

> Aggiungere H+ a un anione ne alza la carica di un’unità e aggiunge «idrogeno» al nome: carbonato CO3 2− → idrogenocarbonato HCO3−.

- [ ] OK   Comment:

**Paragraph of section “Where they show up”**

English:

> Acids: sulfuric acid is H2SO4 because sulfate is 2−; nitric acid is HNO3 because nitrate is 1−. Precipitation: all nitrates and all ammonium salts are soluble, so they are the usual "spectator" partners. Redox: permanganate and dichromate are the classic oxidising agents.

Italian, new:

> Acidi: l’acido solforico è H2SO4 perché il solfato è 2−; l’acido nitrico è HNO3 perché il nitrato è 1−. Precipitazione: tutti i nitrati e tutti i sali di ammonio sono solubili, quindi sono le coppie «spettatrici» di sempre. Redox: il permanganato e il dicromato sono gli ossidanti classici.

Italian, before:

> Acidi: l’acido solforico è H2SO4 perché il solfato è 2−; l’acido nitrico è HNO3 perché il nitrato è 1−. Precipitazione: quasi tutti i nitrati e tutti i sali di ammonio sono solubili, quindi sono le coppie «spettatrici» di sempre. Redox: il permanganato e il dicromato sono gli ossidanti classici.

- [ ] OK   Comment:

**Heading of table “Polyatomic ions (VCE data book set)”**

English:

> Polyatomic ions (VCE data book set)

Italian, new:

> Gli ioni poliatomici più comuni

Italian, before:

> Ioni poliatomici (quelli del libro dei dati di VCE)

- [ ] OK   Comment:

**Common mistake 3**

English:

> Confusing the charge (2−) with the number of oxygens — sulfate has 4 O and charge 2−.

Italian, new:

> Confondere la carica (2−) con il numero di ossigeni: il solfato ha 4 O e carica 2−.

Italian, before:

> Confondere la carica (−2) con il numero di ossigeni: il solfato ha 4 O e carica 2−.

- [ ] OK   Comment:


### Naming Inorganic Compounds

**Heading of section “Which naming system?”**

English:

> Which naming system?

Italian, new:

> Quale sistema di nomenclatura?

- [ ] OK   Comment:

**Paragraph of section “Which naming system?”**

English:

> Look at what the compound is made of before you name it. A metal (or NH4+) with a non-metal is ionic: the cation, then the anion, with no prefixes. Two non-metals make a molecular compound, named with Greek prefixes — but if H comes first and it is dissolved in water, it is an acid, and acids have names of their own.

Italian, new:

> Guarda prima di che cosa è fatto il composto. Un metallo (o NH4+) con un non metallo forma un composto ionico: prima l’anione, poi «di» e il catione, senza prefissi (cloruro di sodio). Due non metalli formano un composto molecolare, che si nomina con i prefissi greci (diossido di zolfo); ma se l’H sta davanti e il composto è sciolto in acqua, è un acido, e il suo nome si ricava dall’anione: acido cloridrico.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Which naming system?”**

English:

> A flowchart for choosing a naming system. Metal + non-metal leads to ionic, for example sodium chloride. Two non-metals leads to molecular, for example sulfur dioxide. An arrow down from two non-metals leads to H first, in water, and from there to acid, for example hydrochloric acid.

Italian, new:

> Un diagramma di flusso per scegliere il sistema di nomenclatura. Da «metallo + non metallo» una freccia porta a «ionico», per esempio cloruro di sodio. Da «due non metalli» una freccia porta a «molecolare», per esempio diossido di zolfo. Da «due non metalli» scende anche una freccia verso «H davanti, in acqua», e da lì ad «acido», per esempio acido cloridrico.

- [ ] OK   Comment:


### Relative Atomic & Formula Mass

**Example card 1 (H2O): description**

English:

> 2 × 1 + 16 = 18

Italian, new:

> 2 × 1 + 16 = 18

- [ ] OK   Comment:

**Example card 2 (CO2): description**

English:

> 12 + 2 × 16 = 44

Italian, new:

> 12 + 2 × 16 = 44

- [ ] OK   Comment:

**Example card 3 (CaCO3): description**

English:

> 40 + 12 + 3 × 16 = 100

Italian, new:

> 40 + 12 + 3 × 16 = 100

- [ ] OK   Comment:

**Example card 4 (Mg(OH)2): description**

English:

> 24 + 2 × (16 + 1) = 58

Italian, new:

> 24 + 2 × (16 + 1) = 58

- [ ] OK   Comment:

**Example card 5 (Ca(NO3)2): description**

English:

> 40 + 2 × (14 + 3 × 16) = 164

Italian, new:

> 40 + 2 × (14 + 3 × 16) = 164

- [ ] OK   Comment:

**Diagram description (alt text) in section “What "relative" actually means”**

English:

> A balance with two hanging pans, level. On the left pan is one carbon atom, a circle marked C. On the right pan are twelve hydrogen atoms, smaller circles marked H, piled in rows of five, four and three. Carbon is drawn bigger than hydrogen, but nowhere near twelve times the size. Labels under the pans say 1 carbon atom and 12 hydrogen atoms, and a note says the picture is not to scale.

Italian, new:

> Una bilancia a due piatti appesi, in equilibrio. Sul piatto di sinistra c’è un atomo di carbonio, un cerchio con la C. Su quello di destra ci sono dodici atomi di idrogeno, cerchi più piccoli con la H, impilati in file da cinque, quattro e tre. Il carbonio è disegnato più grande dell’idrogeno, ma non certo dodici volte tanto. Sotto i piatti c’è scritto «1 atomo di carbonio» e «12 atomi di idrogeno», e una nota avverte che il disegno non è in scala.

- [ ] OK   Comment:

**Example card 1 in section “Adding the atoms up”: description**

English:

> 14 + 3 × 1 = 17

Italian, new:

> 14 + 3 × 1 = 17

- [ ] OK   Comment:

**Example card 2 in section “Adding the atoms up”: description**

English:

> 12 + 4 × 1 = 16

Italian, new:

> 12 + 4 × 1 = 16

- [ ] OK   Comment:

**Example card 3 in section “Adding the atoms up”: description**

English:

> 2 × 1 + 32 + 4 × 16 = 98

Italian, new:

> 2 × 1 + 32 + 4 × 16 = 98

- [ ] OK   Comment:

**Example card 1 in section “Subscripts and brackets”: description**

English:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

Italian, new:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 9, column 3**

English:

> 35.5

Italian, new:

> 35,5

Italian, before:

> 35.5

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 13, column 3**

English:

> 63.5

Italian, new:

> 63,5

Italian, before:

> 63.5

- [ ] OK   Comment:

**Table “Worked examples”, row 1, column 2**

English:

> 2 × 1

Italian, new:

> 2 × 1

Italian, before:

> 2 x 1

- [ ] OK   Comment:

**Table “Worked examples”, row 2, column 2**

English:

> 2 × 16

Italian, new:

> 2 × 16

Italian, before:

> 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 3, column 2**

English:

> 2 × 1 + 16

Italian, new:

> 2 × 1 + 16

Italian, before:

> 2 x 1 + 16

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 2**

English:

> 23 + 35.5

Italian, new:

> 23 + 35,5

Italian, before:

> 23 + 35.5

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 3**

English:

> 58.5

Italian, new:

> 58,5

Italian, before:

> 58.5

- [ ] OK   Comment:

**Table “Worked examples”, row 6, column 2**

English:

> 12 + 2 × 16

Italian, new:

> 12 + 2 × 16

Italian, before:

> 12 + 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 7, column 2**

English:

> 40 + 12 + 3 × 16

Italian, new:

> 40 + 12 + 3 × 16

Italian, before:

> 40 + 12 + 3 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 8, column 2**

English:

> 2 × 1 + 32 + 4 × 16

Italian, new:

> 2 × 1 + 32 + 4 × 16

Italian, before:

> 2 x 1 + 32 + 4 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 9, column 2**

English:

> 24 + 2 × (16 + 1)

Italian, new:

> 24 + 2 × (16 + 1)

Italian, before:

> 24 + 2 x (16 + 1)

- [ ] OK   Comment:

**Table “Worked examples”, row 10, column 2**

English:

> 40 + 2 × (14 + 3 × 16)

Italian, new:

> 40 + 2 × (14 + 3 × 16)

Italian, before:

> 40 + 2 x (14 + 3 x 16)

- [ ] OK   Comment:

**Common mistake 1**

English:

> Saying an atom of carbon "weighs 12" — 12 what? Ar is a comparison and has no unit. Grams only appear once you scale up to a real amount.

Italian, new:

> Dire che un atomo di carbonio «pesa 12»: 12 che cosa? Ar è un confronto e non ha unità. I grammi arrivano solo quando passi a una quantità reale.

- [ ] OK   Comment:


### The Mole & Stoichiometry

**Key takeaway 1**

English:

> One mole is 6.02 × 10²³ particles (Avogadro's number, N_A). Molar mass M (g/mol) is the mass of one mole — add up the atomic masses from the periodic table.

Italian, new:

> Una mole è 6,02 × 10²³ particelle (la costante di Avogadro, N_A). La massa molare M (g/mol) è la massa di una mole: si sommano le masse atomiche della tavola periodica.

Italian, before:

> Una mole è 6,02 × 10^23 particelle (la costante di Avogadro, N_A). La massa molare M (g/mol) è la massa di una mole: si sommano le masse atomiche della tavola periodica.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Worked example: mass → mass”**

English:

> The mole map. Four boxes down the left, mass, particles, gas volume and solution, are each joined to a tall box, moles of reactant, by a two-way arrow carrying its formula: n = m/M, n = N/N_A, n = V/V_m and n = cV. From moles of reactant, an arrow labelled mole ratio (coefficients) leads down to moles of product.

Italian, new:

> La mappa della mole. A sinistra, quattro riquadri uno sotto l’altro – massa, numero di particelle, volume di gas e soluzione – sono collegati ciascuno a un riquadro alto, «moli di reagente», da una doppia freccia con la sua formula: n = m/M, n = N/N_A, n = V/V_m e n = cV. Dalle moli di reagente, una freccia con la scritta «rapporto molare (coefficienti)» scende alle moli di prodotto.

- [ ] OK   Comment:

**Table “The conversion formulas”, row 4, column 2**

English:

> volume of a gas at SLC

Italian, new:

> il volume di un gas a 25 °C e 100 kPa

Italian, before:

> il volume di un gas in CSA

- [ ] OK   Comment:

**Common mistake 4**

English:

> Rounding early — keep full precision until the final answer, then round to the same number of significant figures as the least precise value you were given.

Italian, new:

> Arrotondare presto: tieni tutta la precisione fino al risultato finale e poi arrotonda allo stesso numero di cifre significative del dato meno preciso.

Italian, before:

> Arrotondare presto: tieni tutta la precisione fino al risultato finale e dai allora 3 cifre significative.

- [ ] OK   Comment:


### Lewis Structures

**Key takeaway 1**

English:

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17; helium, in group 18, has only 2). Add one electron per negative charge, remove one per positive charge.

Italian, new:

> Elettroni di valenza = ultima cifra del numero del gruppo per gli elementi rappresentativi (H 1, C 4, N 5, O 6, alogeni 7; l’azoto è nel gruppo 15 e il cloro nel 17; l’elio, nel gruppo 18, ne ha solo 2). Aggiungi un elettrone per ogni carica negativa e togline uno per ogni carica positiva.

Italian, before:

> Elettroni di valenza = numero del gruppo per gli elementi rappresentativi (H 1, C 4, N 5, O 6, alogeni 7). Aggiungi un elettrone per ogni carica negativa e togline uno per ogni carica positiva.

- [ ] OK   Comment:

**Paragraph of section “Year 10 essentials”**

English:

> Every atom brings its outer electrons as dots. A dot on its own is an unpaired electron (a "loner"); two loners from two different atoms make a shared pair, which is one bond (drawn as a line). Pairs that stay on one atom are lone pairs. An atom is full at 8 dots around it (an octet) — hydrogen is full at 2 (a duet). Share twice between the same two atoms for a double bond, three times for a triple. The number of loners tells you how many bonds an atom makes: H 1, C 4, N 3, O 2, Cl 1. Sulfur behaves like oxygen and phosphorus like nitrogen because they are in the same groups. Everything below this section (formal charge, VSEPR shapes, octet exceptions) is Senior content.

Italian, new:

> Ogni atomo porta i suoi elettroni esterni sotto forma di punti. Un punto da solo è un elettrone spaiato; due elettroni spaiati di due atomi diversi formano un doppietto di legame, cioè un legame (si disegna come una linea). I doppietti che restano su un solo atomo sono doppietti solitari. Un atomo è completo con 8 punti intorno (un ottetto); l’idrogeno è completo con 2 (un duetto). Condividi due volte fra gli stessi due atomi per un legame doppio, e tre per uno triplo. Il numero di elettroni spaiati ti dice quanti legami forma un atomo: H 1, C 4, N 3, O 2, Cl 1. Lo zolfo si comporta come l’ossigeno e il fosforo come l’azoto, perché stanno negli stessi gruppi. Tutto quello che viene sotto questa sezione (carica formale, geometria VSEPR, eccezioni all’ottetto) è materia delle superiori.

Italian, before:

> Ogni atomo porta i suoi elettroni esterni sotto forma di punti. Un punto da solo è un dispari; due dispari di due atomi diversi formano un doppietto di legame, cioè un legame (si disegna come una linea). I doppietti che restano su un solo atomo sono doppietti solitari. Un atomo è completo con 8 punti intorno (un ottetto); l’idrogeno è completo con 2 (un duetto). Condividi due volte fra gli stessi due atomi per un legame doppio, e tre per uno triplo. Il numero di dispari ti dice quanti legami forma un atomo: H 1, C 4, N 3, O 2, Cl 1. Lo zolfo si comporta come l’ossigeno e il fosforo come l’azoto, perché stanno negli stessi gruppi. Tutto quello che viene sotto questa sezione (carica formale, geometria VSEPR, eccezioni all’ottetto) è materia delle superiori.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Year 10 essentials”**

English:

> Lewis structures of four molecules, each with its formula underneath. Water, H₂O: H–O–H with two lone pairs on the oxygen, one above it and one below. Ammonia, NH₃: nitrogen with single bonds to three hydrogens and one lone pair. Carbon dioxide, CO₂: O=C=O, two double bonds, with two lone pairs on each oxygen and none on the carbon. Methane, CH₄: carbon with single bonds to four hydrogens and no lone pairs. Bonds are lines and lone pairs are pairs of dots. Labels point to one lone pair, on the oxygen in water, and to one shared pair, a bond in ammonia.

Italian, new:

> Le strutture di Lewis di quattro molecole, ognuna con la sua formula sotto. Acqua, H₂O: H–O–H con due doppietti solitari sull’ossigeno, uno sopra e uno sotto. Ammoniaca, NH₃: l’azoto legato a tre idrogeni con legami singoli, con un doppietto solitario. Diossido di carbonio, CO₂: O=C=O, due legami doppi, con due doppietti solitari su ogni ossigeno e nessuno sul carbonio. Metano, CH₄: il carbonio legato a quattro idrogeni con legami singoli, senza doppietti solitari. I legami sono linee e i doppietti solitari coppie di punti. Due etichette indicano un doppietto solitario, sull’ossigeno dell’acqua, e un doppietto di legame, un legame dell’ammoniaca.

- [ ] OK   Comment:

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

Italian, new:

> Metano: il carbonio condivide i suoi quattro elettroni spaiati

Italian, before:

> Metano: il carbonio condivide i suoi quattro dispari

- [ ] OK   Comment:

**Diagram description (alt text) in section “From Lewis structure to shape (VSEPR)”**

English:

> The five VSEPR shapes, each with its formula, shape and bond angle underneath, drawn in 3D: a solid wedge is a bond coming out of the page and a hashed wedge a bond going behind it. CO₂ is linear, 180°. BF₃ is trigonal planar, 120°. CH₄ is tetrahedral, 109.5°. NH₃ is trigonal pyramidal, 107°, with its lone pair drawn as a lobe on the nitrogen. H₂O is bent, 104.5°, with two lone-pair lobes on the oxygen. NH₃ and H₂O are drawn like CH₄ with one, then two, of its bonds replaced by a lone pair. A small arc marks the angle between the two bonds that lie in the page.

Italian, new:

> Le cinque geometrie VSEPR, ognuna con la sua formula, la geometria e l’angolo di legame sotto, disegnate in 3D: un cuneo pieno è un legame che esce dal piano verso chi guarda, un cuneo tratteggiato uno che va dietro. CO₂: lineare, 180°. BF₃: trigonale planare, 120°. CH₄: tetraedrica, 109,5°. NH₃: piramidale trigonale, 107°, con il suo doppietto solitario disegnato come un lobo sull’azoto. H₂O: angolare, 104,5°, con due lobi sull’ossigeno. NH₃ e H₂O sono disegnate come CH₄, con uno e poi due dei suoi legami sostituiti da un doppietto solitario. Un piccolo arco segna l’angolo fra i due legami che stanno nel piano della pagina.

- [ ] OK   Comment:


### Naming Organic Compounds

**Diagram description (alt text) in section “Worked example”**

English:

> The skeletal structure of 3-methylpentan-2-ol: a zigzag chain of five carbons, numbered 1 to 5 from left to right, with OH at the end of a bond up from carbon 2 and a methyl group as a short line down from carbon 3, labelled methyl. Underneath, the name 3-methylpentan-2-ol.

Italian, new:

> La formula scheletrica del 3-metilpentan-2-olo: una catena a zigzag di cinque carboni, numerati da 1 a 5 da sinistra a destra. Dal carbonio 2 sale un legame verso l’OH, dal carbonio 3 scende un breve tratto: il gruppo metile, indicato come «metile». Sotto, il nome 3-metilpentan-2-olo.

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 1**

English:

> Amide

Italian, new:

> Ammide

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 2**

English:

> -amide

Italian, new:

> -ammide

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 3**

English:

> ethanamide

Italian, new:

> etanammide

- [ ] OK   Comment:

**Common mistake 4**

English:

> Forgetting the locant for -ene, -ol or -one whenever the group could sit in more than one position (propan-1-ol vs propan-2-ol).

Italian, new:

> Dimenticare il numero di -ene, -olo o -one ogni volta che il gruppo potrebbe stare in più di una posizione (propan-1-olo o propan-2-olo).

Italian, before:

> Dimenticare il numero di -ene, -olo o -one quando la catena ha 4 carboni o più.

- [ ] OK   Comment:


### Functional Groups

**Paragraph of section “The reaction pathway you must know”**

English:

> Alkene → (H₂O, H₃PO₄ catalyst) → alcohol. Alkene → (HX) → haloalkane → (OH⁻(aq)) → alcohol → (Cr₂O₇²⁻/H⁺) → aldehyde → (further oxidation) → carboxylic acid → (alcohol, H₂SO₄ catalyst) → ester. Primary alcohols oxidise twice, secondary alcohols oxidise once to ketones, tertiary alcohols do not oxidise.

Italian, new:

> Alchene → (H₂O, H₃PO₄ come catalizzatore) → alcol. Alchene → (HX) → alogenuro alchilico → (OH⁻(aq)) → alcol → (Cr₂O₇²⁻/H⁺) → aldeide → (altra ossidazione) → acido carbossilico → (alcol, H₂SO₄ come catalizzatore) → estere. Gli alcoli primari si ossidano due volte, i secondari si ossidano una volta e danno chetoni, e i terziari non si ossidano.

Italian, before:

> Alchene → (H2O, con H+ da catalizzatore) → alcol. Alchene → (HX) → alogenuro alchilico → (OH−) → alcol → (Cr2O7 2−/H+) → aldeide → (altra ossidazione) → acido carbossilico → (alcol, con H2SO4 da catalizzatore) → estere. Gli alcoli primari si ossidano due volte, i secondari si ossidano una volta e danno chetoni, e i terziari non si ossidano.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The reaction pathway you must know”**

English:

> A reaction map, read from the top down. Down the left: an alkene gives a primary alcohol with H₂O and an H₃PO₄ catalyst; the primary alcohol gives an aldehyde with Cr₂O₇²⁻/H⁺, the aldehyde a carboxylic acid with Cr₂O₇²⁻/H⁺, and the carboxylic acid an ester with an alcohol and an H₂SO₄ catalyst. On the right: the alkene can instead take HX to give a haloalkane, which gives the same primary alcohol with OH⁻(aq); and beside the primary alcohol, a secondary alcohol oxidises to a ketone with Cr₂O₇²⁻/H⁺.

Italian, new:

> Una mappa delle reazioni, da leggere dall’alto in basso. A sinistra: un alchene dà un alcol primario con H₂O e H₃PO₄ come catalizzatore; l’alcol primario dà un’aldeide con Cr₂O₇²⁻/H⁺, l’aldeide un acido carbossilico con Cr₂O₇²⁻/H⁺, e l’acido carbossilico un estere con un alcol e H₂SO₄ come catalizzatore. A destra: l’alchene può anche dare un alogenuro alchilico con HX, che con OH⁻(aq) dà lo stesso alcol primario; e accanto all’alcol primario, un alcol secondario si ossida a chetone con Cr₂O₇²⁻/H⁺.

- [ ] OK   Comment:

**Paragraph of section “Spotting groups in a spectrum”**

English:

> IR: a broad O–H stretch around 3200–3550 cm⁻¹ means alcohol (or, very broad and overlapping C–H, carboxylic acid); a strong C=O near 1670–1750 cm⁻¹ means aldehyde, ketone, acid, ester or amide. The VCE data book lists the exact ranges — use it.

Italian, new:

> IR: una banda larga di O–H verso 3200–3550 cm⁻¹ indica un alcol (oppure, se è molto larga e si sovrappone al C–H, un acido carbossilico); un C=O intenso vicino a 1670–1750 cm⁻¹ indica un’aldeide, un chetone, un acido, un estere o un’ammide. Gli intervalli esatti li trovi in una tabella IR: usala.

Italian, before:

> IR: una banda larga di O–H verso 3200–3550 cm⁻¹ indica un alcol (oppure, se è molto larga e si sovrappone al C–H, un acido carbossilico); un C=O intenso vicino a 1670–1750 cm⁻¹ indica un’aldeide, un chetone, un acido, un estere o un’ammide. Il libro dei dati di VCE dà gli intervalli esatti: usalo.

- [ ] OK   Comment:

**Common mistake 1**

English:

> Calling a molecule with –OH on a benzene ring an alcohol (it is a phenol) — a common trap.

Italian, new:

> Chiamare alcol una molecola con –OH su un anello benzenico (è un fenolo): è una trappola frequente.

Italian, before:

> Chiamare alcol una molecola con –OH su un anello benzenico (è un fenolo): è fuori dal programma di VCE, ma è una trappola frequente.

- [ ] OK   Comment:


---

## Russian (ru): 92 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-ru.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 лет*. Russian typesetting writes four-digit numbers solid and groups from five digits on (*65 000*). |
| universal indicator | **универсальный индикатор** | Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| pH scale | **шкала pH** | Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| the pH scale's everyday examples (diagram labels) | **желудочный сок** (1), **уксус** (3), **чистая вода** (7), **пищевая сода** (8), **средство для духовок** (13) | The words the sheet's own pH table uses, each at the same pH band as the English. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| particle | **частица** | Added 2026-09-25 for the States of Matter diagrams. |
| melting / boiling (a heating curve's plateaus) | **плавление / кипение** | As in the sheet's table of phase changes. Added 2026-09-25 for the States of Matter diagrams. |
| heating curve | **кривая нагревания** | Matches the sheet's section heading. Added 2026-09-25 for the States of Matter diagrams. |
| energy added (a graph's axis) | **полученная энергия** | Russian school physics speaks of the heat a body *receives* (*количество теплоты, полученное телом*). *Добавленная энергия* is a calque. Added 2026-09-25 for the States of Matter diagrams. |
| solid / liquid / gas as nouns in prose | **твёрдое тело / жидкость / газ** | The textbook nouns, used in the section *Частицы в разных агрегатных состояниях*. The diagram labels keep the adjectives *твёрдое / жидкое / газообразное*, which match the sheet's takeaways. Added 2026-09-25 for the States of Matter diagrams. |
| VSEPR shapes: linear, trigonal planar, tetrahedral, trigonal pyramidal, bent | **линейная форма, плоский треугольник, тетраэдр, тригональная пирамида, уголковая форма** | Added 2026-09-25 with the Lewis sheet's shape diagram (`lewis-structures/02-vsepr-shapes`). Russian names a shape by the figure (*молекула имеет форму тетраэдра*), and these are the words the sheet's paragraph already used. **Bent is *уголковая*, not *угловая***: both are in school books; the paragraph directly above the drawing says *уголковая*, so the drawing does too. The acronym VSEPR is not used on a Russian page (*теория отталкивания электронных пар* if it must be named). Angles: *109,5°*. |
| bond angle | **валентный угол** | Added 2026-09-25. The school term; *угол связи* is a calque. |
| wedge / hashed wedge (a bond towards / away from the viewer) | **сплошной клин / штрихованный клин** | Added 2026-09-25, for alt text. |
| lone-pair lobe (in a VSEPR drawing) | **электронное облако** | Added 2026-09-25, for alt text: Russian school books draw a lone pair as an *облако*, the word the atom sheets already use for electrons. |
| electron shell (the curriculum's word) | **электронная оболочка** | VC2S10U07 says "electron shells", so the sheet names *оболочка* once as the word the reader's teacher uses, and keeps *энергетический уровень* as its own term. Since 2026-09-25 the sentence credits the word to the teacher alone (*Учитель может называть их электронными оболочками*); it no longer mentions the программа. |
| valence electrons from the group number | **последняя цифра номера группы** (*Cl в группе 17 — 7 валентных электронов*), once with *в короткой таблице это VII группа* | Added 2026-09-25. Russian schools still teach from the short table (groups I–VIII with main and secondary subgroups), where the group number itself is the valence-electron count of a main-subgroup element. The site shows groups 1–18, so the bonding and Lewis sheets state the last-digit rule, and the bonding sheet names the short-table group once as the bridge to the textbook. *Главная подгруппа* is kept: it is the term a Russian student knows for main-group elements. |
| beta decay | **бета-распад** | Added 2026-09-25, for how reactors make neptunium and plutonium. Hyphenated like *бета-частица*. |
| shielding gamma ("reduces, never stops") | **ослаблять**: *свинец или толстый бетон лишь сильно его ослабляют* | Added 2026-09-24. *Ослабление гамма-излучения* is how Russian school physics puts it; alpha and beta keep *задерживать*. |
| electron cloud (diagram label) | **электронное облако** | Added 2026-09-25 with the redrawn atom diagrams. The standard school term. |
| not to scale (diagram caveat) | **Масштаб не соблюдён**, and the ratio as **в 100 000 раз меньше атома по диаметру** | Added 2026-09-25 with the redrawn atom diagrams. Localised, not translated: a Russian textbook writes a ratio as *в N раз меньше*, not as a fraction *1/100 000*, and *по диаметру* says what is compared (by volume the ratio is about 10⁻¹⁵). *Не в масштабе* is a calque. |
| the counting-model caveat (05) | **Схема для подсчёта электронов, а не рисунок атома.** | Added 2026-09-25 with the redrawn atom diagrams. *Схема* is the word Russian textbooks use for exactly this kind of drawing (*схема строения атома*), so it says "model, not picture" without a second noun. |
| heavier, but first / lighter, but second (06) | **тяжелее, но стоит первым** / **легче, но стоит вторым** | Added 2026-09-25 with the redrawn atom diagrams. *Стоять* for a place in the table. *Первым / вторым* agree with *теллур* and *иод*, not with the reader. |
| atomic number in the diagrams | **атомный номер** | Added 2026-09-25 with the redrawn atom diagrams. The review brief suggested *порядковый номер*; the row above keeps *атомный номер* until both sheets change together, and a diagram label that disagreed with its own heading would be worse than either term. |
| a cell of the periodic table | **клетка** (*клетка теллура*) | Added 2026-09-25 with the redrawn atom diagrams. |
| hydrogen-1, -2, -3 (03) | **водород-1**, **водород-2**, **водород-3** | Added 2026-09-25 with the redrawn isotope diagrams. Cyrillic with the number after a hyphen, per the typography note below. |
| protium / deuterium / tritium (03) | **протий** / **дейтерий** / **тритий** | Added 2026-09-25 with the redrawn isotope diagrams. Printed under the mass-number name. In a Russian textbook these names come first — *изотопы водорода: протий, дейтерий, тритий* — so they matter more here than in any other locale. |
| stable / radioactive, of one isotope (03) | **стабильный** / **радиоактивный** | Added 2026-09-25 with the redrawn isotope diagrams. Full adjectives, agreeing with *водород*; the short form *радиоактивен* would be a sentence, not a label. |
| undecayed nuclei (07, vertical axis) | **нераспавшиеся ядра** | Added 2026-09-25 with the redrawn isotope diagrams. The quantity Russian physics plots in the decay law (*число нераспавшихся ядер N(t)*). Replaces "how much is left", which suggests the sample disappears. |
| time in half-lives (07, horizontal axis) | **время в периодах полураспада** | Added 2026-09-25 with the redrawn isotope diagrams. Localised, not translated: a Russian axis says *величина в единицах*, as a German one does. |
| name order vs formula order | formula **cation first**, name **anion first**: *хлорид натрия*, NaCl | Added 2026-09-25. The English common mistake "writing the anion first because it sounds first" was removed, since in English the cation is said first. In Russian the trap is real, but an overlay must keep the English list lengths, so the point lives in takeaway 2 of *Writing Ionic Formulas* instead. |
| cross-over method (charges → subscripts) | **перекрёстное правило** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Already the sheet's term. |
| ionic / molecular (the kind of compound, as a label) | **ионное / молекулярное** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Neuter, agreeing with the implied *соединение*, exactly as the sheet's first takeaway writes them. |
| significant figures | **значащие цифры** | Added 2026-09-25. The stoichiometry sheet phrases the rule as *столько значащих цифр, сколько их в наименее точном из данных значений*, not a fixed three. Russian school chemistry drills this less than the English-speaking systems do, but the term and the rule are the physics-class ones. **Rated medium.** |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet (the sheets had called it *справочник VCE*). The IR sentence now points to *таблицы ИК-спектроскопии*, and the polyatomic-ion table is headed *Основные многоатомные ионы*. |
| standard laboratory conditions (SLC) | **withheld — spell out "при 25 °C и 100 кПа"** | Added 2026-09-25. The sheet used to say *при стандартных условиях*, which in Russian schools usually means 0 °C and 101,325 kPa — the wrong conditions for this VCE (Australian) value. Naming the actual conditions avoids both the untranslatable "SLC" and that false-friend phrase, keeping the English value (V_m = 24,8 л/моль). |
| a two-pan balance (the relative-mass picture) | **рычажные весы**, their pans **чаши**; level is **в равновесии** | The diagram's alt text says *весы с двумя чашами*. Added 2026-09-25 with the small cheat-sheet diagrams (task 10a). |
| mole ratio | **мольное соотношение** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Already the sheet's term. |
| number of particles (N) | **число частиц** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). |
| moles of reactant / product (mole-map boxes) | **количество вещества реагента / продукта** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). Built on the glossary's *количество вещества*; «моли реагента» is spoken, not written. |
| primary / secondary / tertiary alcohol | **первичный / вторичный / третичный спирт** | Added 2026-09-25 with the reaction-map diagram. |
| catalyst | **катализатор** | Added 2026-09-25. On the reaction map it comes before the formula: *катализатор H₃PO₄*. |
| skeletal formula | **скелетная формула** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). |
| methyl (group), as a diagram label | **метил** | Added 2026-09-25 with the cheat-sheet diagrams (task 10b). The sheet's worked example says *метил на третьем*; *метильная группа* is used in the alt text. |

### Diagram labels

Text drawn inside the diagrams. Labels must stay short: they sit in a fixed space. Text in {braces} is filled in with a number.

#### Atoms & the Periodic Table — diagram “What an atom is made of”

| Label | English | Russian | OK / comment |
|---|---|---|---|
| electronCloud | electron cloud | электронное облако | |
| nucleus | nucleus | ядро | |
| proton | proton | протон | |
| neutron | neutron | нейтрон | |
| scale | Not to scale: the nucleus is about 1/100,000 of the atom’s width. | Масштаб не соблюдён: ядро примерно в 100 000 раз меньше атома по диаметру. | |

#### Atoms & the Periodic Table — diagram “Atomic number and mass number”

| Label | English | Russian | OK / comment |
|---|---|---|---|
| massNumber | mass number = protons + neutrons | массовое число = протоны + нейтроны | |
| atomicNumber | atomic number = protons | атомный номер = протоны | |
| subtraction | {mass} − {atomic} = {neutrons} neutrons | {mass} − {atomic} = {neutrons} нейтронов | |

#### Atoms & the Periodic Table — diagram “Electrons, energy levels…” (sodium)

| Label | English | Russian | OK / comment |
|---|---|---|---|
| outerLevel | outer level | внешний уровень | |
| arrangement | {first}, {second}, {third} | {first}, {second}, {third} | |
| electrons | {count} electrons | {count} электронов | |
| countNote | A way to count electrons, not a picture of an atom. | Схема для подсчёта электронов, а не рисунок атома. | |

#### Atoms & the Periodic Table — diagram “Ordered by atomic number”

| Label | English | Russian | OK / comment |
|---|---|---|---|
| atomicNumber | atomic number | атомный номер | |
| relativeAtomicMass | relative atomic mass | относительная атомная масса | |
| telluriumName | Tellurium | Теллур | |
| telluriumMass | 127.60 | 127,60 | |
| telluriumRank | heavier, but first | тяжелее, но стоит первым | |
| iodineName | Iodine | Иод | |
| iodineMass | 126.90 | 126,90 | |
| iodineRank | lighter, but second | легче, но стоит вторым | |

#### Isotopes & Radioactivity — diagram “Isotopes” (hydrogen)

| Label | English | Russian | OK / comment |
|---|---|---|---|
| proton | proton | протон | |
| neutron | neutron | нейтрон | |
| electron | electron | электрон | |
| isotopeName | hydrogen-{mass} | водород-{mass} | |
| protium | protium | протий | |
| deuterium | deuterium | дейтерий | |
| tritium | tritium | тритий | |
| stable | stable | стабильный | |
| radioactive | radioactive | радиоактивный | |

#### Isotopes & Radioactivity — diagram “Half-life”

| Label | English | Russian | OK / comment |
|---|---|---|---|
| axisAmount | undecayed nuclei | нераспавшиеся ядра | |
| axisTime | time, in half-lives | время в периодах полураспада | |
| percent0 | 100% | 100 % | |
| percent1 | 50% | 50 % | |
| percent2 | 25% | 25 % | |
| percent3 | 12.5% | 12,5 % | |
| percent4 | 6.25% | 6,25 % | |

#### Diagram states-of-matter/01-particles-in-each-state

| Label | English | Russian | OK / comment |
|---|---|---|---|
| solid | solid | твёрдое | |
| liquid | liquid | жидкое | |
| gas | gas | газообразное | |

#### Diagram states-of-matter/02-heating-curve

| Label | English | Russian | OK / comment |
|---|---|---|---|
| axisTemperature | temperature | температура | |
| axisEnergy | energy added | полученная энергия | |
| degrees | {t} °C | {t} °C | |
| melting | melting | плавление | |
| boiling | boiling | кипение | |
| solid | solid | твёрдое | |
| liquid | liquid | жидкое | |
| gas | gas | газообразное | |

#### Diagram lewis-structures/01-lewis-structures

| Label | English | Russian | OK / comment |
|---|---|---|---|
| lonePair | lone pair | неподелённая электронная пара | |
| sharedPair | shared pair | общая электронная пара | |
| water | H₂O | H₂O | |
| ammonia | NH₃ | NH₃ | |
| carbonDioxide | CO₂ | CO₂ | |
| methane | CH₄ | CH₄ | |

#### Diagram lewis-structures/02-vsepr-shapes

| Label | English | Russian | OK / comment |
|---|---|---|---|
| carbonDioxide | CO₂ | CO₂ | |
| boronTrifluoride | BF₃ | BF₃ | |
| methane | CH₄ | CH₄ | |
| ammonia | NH₃ | NH₃ | |
| water | H₂O | H₂O | |
| linear | linear, 180° | линейная форма, 180° | |
| trigonalPlanar | trigonal planar, 120° | плоский треугольник, 120° | |
| tetrahedral | tetrahedral, 109.5° | тетраэдр, 109,5° | |
| trigonalPyramidal | trigonal pyramidal, 107° | тригональная пирамида, 107° | |
| bent | bent, 104.5° | уголковая форма, 104,5° | |

#### Diagram functional-groups/01-reaction-map

| Label | English | Russian | OK / comment |
|---|---|---|---|
| alkene | alkene | алкен | |
| haloalkane | haloalkane | галогеналкан | |
| primaryAlcohol | primary alcohol | первичный спирт | |
| secondaryAlcohol | secondary alcohol | вторичный спирт | |
| aldehyde | aldehyde | альдегид | |
| ketone | ketone | кетон | |
| carboxylicAcid | carboxylic acid | карбоновая кислота | |
| ester | ester | сложный эфир | |
| hydration | H2O, H3PO4 catalyst | H2O, катализатор H3PO4 | |
| addition | HX | HX | |
| substitution | OH− (aq) | OH− (aq) | |
| oxidation | Cr2O7 2−/H+ | Cr2O7 2−/H+ | |
| esterification | alcohol, H2SO4 catalyst | спирт, катализатор H2SO4 | |

#### Diagram relative-formula-mass/01-carbon-hydrogen-balance

| Label | English | Russian | OK / comment |
|---|---|---|---|
| carbonAtom | carbon atom | атом углерода | |
| hydrogenAtoms | hydrogen atoms | атомов водорода | |
| notToScale | Not to scale | Масштаб не соблюдён | |

#### Diagram balancing-equations/01-particle-equation

| Label | English | Russian | OK / comment |
|---|---|---|---|
| reactants | reactants | реагенты | |
| products | products | продукты | |
| hydrogen | 2H2 | 2H2 | |
| oxygen | O2 | O2 | |
| water | 2H2O | 2H2O | |

#### Diagram chemical-bonds/01-bonding-models

| Label | English | Russian | OK / comment |
|---|---|---|---|
| ionic | ionic | ионная связь | |
| covalent | covalent | ковалентная связь | |
| metallic | metallic | металлическая связь | |
| sharedPair | shared pair | общая электронная пара | |
| delocalised | delocalised electrons | свободные электроны | |

#### Diagram acids-and-bases/01-ph-scale

| Label | English | Russian | OK / comment |
|---|---|---|---|
| stomachAcid | stomach acid | желудочный сок | |
| vinegar | vinegar | уксус | |
| pureWater | pure water | чистая вода | |
| bakingSoda | baking soda | пищевая сода | |
| ovenCleaner | oven cleaner | средство для духовок | |

#### Diagram chemical-formulas/01-cross-over

| Label | English | Russian | OK / comment |
|---|---|---|---|
| cation | cation | катион | |
| anion | anion | анион | |
| cationFormula | Al 3+ | Al 3+ | |
| anionFormula | SO4 2− | SO4 2− | |
| formula | Al2(SO4)3 | Al2(SO4)3 | |
| positive | {count} × (+{charge}) = +{total} | {count} × (+{charge}) = +{total} | |
| negative | {count} × (−{charge}) = −{total} | {count} × (−{charge}) = −{total} | |

#### Diagram naming-compounds/01-which-system

| Label | English | Russian | OK / comment |
|---|---|---|---|
| metalNonMetal | metal + non-metal | металл + неметалл | |
| twoNonMetals | two non-metals | два неметалла | |
| hydrogenInWater | H first, in water | H впереди, в воде | |
| ionic | ionic | ионное | |
| molecular | molecular | молекулярное | |
| acid | acid | кислота | |
| ionicExample | sodium chloride | хлорид натрия | |
| molecularExample | sulfur dioxide | оксид серы(IV) | |
| acidExample | hydrochloric acid | соляная кислота | |

#### Diagram stoichiometry/01-mole-map

| Label | English | Russian | OK / comment |
|---|---|---|---|
| mass | mass | масса | |
| particles | particles | число частиц | |
| gasVolume | gas volume | объём газа | |
| solution | solution | раствор | |
| fromMass | n = m/M | n = m/M | |
| fromParticles | n = N/NA | n = N/NA | |
| fromGasVolume | n = V/Vm | n = V/Vm | |
| fromSolution | n = cV | n = cV | |
| reactantMoles | moles of reactant | количество вещества реагента | |
| moleRatio | mole ratio (coefficients) | мольное соотношение (коэффициенты) | |
| productMoles | moles of product | количество вещества продукта | |

#### Diagram organic-nomenclature/01-numbered-chain

| Label | English | Russian | OK / comment |
|---|---|---|---|
| hydroxyl | OH | OH | |
| methyl | methyl | метил | |
| name | {methylAt}-methylpentan-{hydroxylAt}-ol | {methylAt}-метилпентан-{hydroxylAt}-ол | |

### Atoms & the Periodic Table

**Key takeaway 3**

English:

> Electrons sit in energy levels, and how many are in the outer level decides which group (column) an element is in.

Russian, new:

> Электроны занимают энергетические уровни, и от того, сколько их на внешнем уровне, зависит, в какой группе (столбце) стоит элемент.

Russian, before:

> Электроны занимают энергетические уровни, и таблица выстроена по тому, сколько их на внешнем уровне.

- [ ] OK   Comment:

**Example card 1 (Cl-35): description**

English:

> 17 protons, 18 neutrons

Russian, new:

> 17 протонов, 18 нейтронов

- [ ] OK   Comment:

**Example card 2 (Cl-37): description**

English:

> 17 protons, 20 neutrons

Russian, new:

> 17 протонов, 20 нейтронов

- [ ] OK   Comment:

**Example card 3 (H+): description**

English:

> a hydrogen atom that has lost its one electron — a bare proton

Russian, new:

> атом водорода, потерявший свой единственный электрон, — это просто протон

- [ ] OK   Comment:

**Diagram description (alt text) in section “What an atom is made of”**

English:

> An atom: a nucleus of three protons (filled circles) and four neutrons (hollow circles), with an electron cloud around it that is densest right next to the nucleus and thins out, with no edge, further away. Three protons and four neutrons would make it lithium-7, but the picture stands for any atom. Labels name the electron cloud, the nucleus, a proton and a neutron. A note says it is not to scale: the nucleus is about 1/100,000 of the atom’s width.

Russian, new:

> Атом: ядро из трёх протонов (закрашенные кружки) и четырёх нейтронов (пустые кружки), вокруг — электронное облако, самое плотное у ядра и редеющее наружу без чёткой границы. Три протона и четыре нейтрона — это был бы литий-7, но рисунок изображает любой атом. Подписи указывают на электронное облако, ядро, один протон и один нейтрон. Внизу сказано, что масштаб не соблюдён: ядро примерно в 100 000 раз меньше атома по диаметру.

Russian, before:

> Ядро из протонов и нейтронов в центре, вокруг него размытое облако — область, где электроны встречаются вероятнее всего. Подпись предупреждает, что ядро нарисовано намного крупнее настоящего, иначе его вообще не было бы видно.

- [ ] OK   Comment:

**Paragraph of section “Atomic number and mass number”**

English:

> The atomic number is the number of protons, and it is what makes an atom that element. Every chlorine atom has 17 protons; anything with 17 protons is chlorine. The mass number is protons plus neutrons. Neutrons can vary without changing which element it is.

Russian, new:

> Атомный номер — это число протонов, и именно он делает атом данным элементом. У любого атома хлора 17 протонов; всё, у чего 17 протонов, — хлор. Массовое число — это протоны плюс нейтроны. Число нейтронов может меняться, а элемент остаётся прежним.

Russian, before:

> Атомный номер — это число протонов, и именно он делает атом данным элементом. У любого атома хлора 17 протонов; всё, у чего 17 протонов, — хлор. Массовое число — это протоны плюс нейтроны. Число нейтронов может меняться, а элемент остаётся прежним. Оба понятия здесь — расширение: школьная программа этих классов не называет ни одного из них, а без них не прочитать и клетку таблицы.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Atomic number and mass number”**

English:

> The symbol for chlorine-35: the mass number 35 above the atomic number 17, to the left of Cl. A line joins the 35 to “mass number = protons + neutrons” and another joins the 17 to “atomic number = protons”. Underneath: 35 − 17 = 18 neutrons.

Russian, new:

> Обозначение хлора-35: массовое число 35 над атомным номером 17, слева от Cl. Линия соединяет 35 с подписью «массовое число = протоны + нейтроны», другая соединяет 17 с подписью «атомный номер = протоны». Ниже: 35 − 17 = 18 нейтронов.

Russian, before:

> Обозначение хлора-35: массовое число 35 написано над атомным номером 17, стрелки поясняют — 17 протонов, а 35 минус 17 даёт 18 нейтронов.

- [ ] OK   Comment:

**Paragraph of section “Electrons, energy levels and the shape of the table”**

English:

> Electrons occupy energy levels around the nucleus. The first holds up to 2, the next up to 8, then 8 again for the first twenty elements. Your teacher may call these shells; it means the same thing. Counting electrons this way is called the Bohr model: it is useful, and it is not a picture of a real atom. The number in the outer level sets how an atom reacts. Elements are placed in the same group when they have the same outer count, which is why a group behaves alike.

Russian, new:

> Электроны занимают энергетические уровни вокруг ядра. На первом помещается до 2, на следующем до 8, затем снова 8 — у первых двадцати элементов. Учитель может называть их электронными оболочками: речь об одном и том же. Такой способ счёта называется моделью Бора: он удобен и не является изображением настоящего атома. Сколько их на внешнем уровне, так атом и реагирует. Элементы попадают в одну группу, когда снаружи у них одинаковое число. Поэтому группа и ведёт себя схоже.

Russian, before:

> Электроны занимают энергетические уровни вокруг ядра. На первом помещается до 2, на следующем до 8, затем снова 8 — у первых двадцати элементов. Учитель и программа могут называть их электронными оболочками: речь об одном и том же. Такой способ счёта называется моделью Бора: он удобен и не является изображением настоящего атома. Сколько их на внешнем уровне, так атом и реагирует. Элементы попадают в одну группу, когда снаружи у них одинаковое число. Поэтому группа и ведёт себя схоже.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Electrons, energy levels and the shape of the table”**

English:

> Sodium, Na, drawn as a model for counting electrons: a disc marked Na for the nucleus, inside three bands with visible edges that hold 2, 8 and 1 electrons at irregular angles. The single electron in the outer band is circled and labelled “outer level”. Below, the arrangement 2, 8, 1 and the total, 11 electrons. A note says it is a way to count electrons, not a picture of an atom.

Russian, new:

> Натрий, Na, в виде схемы для подсчёта электронов: диск с надписью Na на месте ядра, вокруг три полосы с видимыми границами, в них 2, 8 и 1 электрон под неправильными углами. Единственный электрон во внешней полосе обведён кружком и подписан «внешний уровень». Ниже — запись 2, 8, 1 и сумма, 11 электронов. Подпись внизу говорит, что это схема для подсчёта электронов, а не рисунок атома.

Russian, before:

> Ядро натрия из 11 протонов и 12 нейтронов, вокруг него три размытые полосы, на которых 2, 8 и 1 электрон, нарисованные как метки под неправильными углами, а не как точки на окружностях. Рядом — запись 2, 8, 1, внешний уровень последним. Сама схема говорит, что это способ пересчитать электроны, а не изображение атома, и что ядро нарисовано примерно в 100 000 раз крупнее настоящего.

- [ ] OK   Comment:

**Paragraph of section “Groups and periods”**

English:

> A group is a column of the table and a period is a row. Elements in one group have the same number of electrons in their outer level, so the column predicts how an element reacts. Group 1 is the alkali metals, group 17 the halogens and group 18 the noble gases. A period tells you how many energy levels are in use: an element in period 3 uses three of them. So atoms get bigger as you go down to a new row.

Russian, new:

> Группа — это столбец таблицы, а период — строка. У элементов одной группы на внешнем уровне одинаковое число электронов, поэтому по столбцу можно предсказать, как элемент будет реагировать. Группа 1 — щелочные металлы, группа 17 — галогены, группа 18 — благородные газы. Период говорит, сколько энергетических уровней задействовано: элемент периода 3 использует три. Поэтому с каждой новой строкой вниз атомы становятся крупнее.

Russian, before:

> Группа — это столбец таблицы, а период — строка. У элементов одной группы на внешнем уровне одинаковое число электронов, поэтому по столбцу можно предсказать, как элемент будет реагировать. Группа 1 — щелочные металлы, группа 17 — галогены, группа 18 — благородные газы. Период говорит, сколько энергетических уровней задействовано: элемент периода 3 использует три. Значит, по строке примерно виден и размер атома.

- [ ] OK   Comment:

**Paragraph of section “Metals and non-metals”**

English:

> Metals fill the left and the middle of the table, and non-metals sit in the top right corner. A metal conducts electricity and heat, has a shiny surface, and can be hammered into a sheet without shattering. Almost every metal is solid at room temperature; mercury is the liquid one. A non-metal is usually a poor conductor, dull, and brittle if it is solid at all. Many non-metals are gases. A few elements along the staircase between the two, such as silicon, behave partly like each. They are called metalloids.

Russian, new:

> Металлы занимают левую часть и середину таблицы, а неметаллы — верхний правый угол. Металл проводит электричество и тепло, имеет блестящую поверхность и расплющивается в лист, не раскалываясь. Почти все металлы при комнатной температуре твёрдые; жидкий среди них — ртуть. Неметалл обычно проводит плохо, тусклый и хрупкий, если он вообще твёрдый. Многие неметаллы — газы. Несколько элементов на «лесенке» между теми и другими, например кремний, ведут себя отчасти как одни и отчасти как другие. Их называют полуметаллами.

Russian, before:

> Металлы занимают левую часть и середину таблицы, а неметаллы — верхний правый угол. Металл проводит электричество и тепло, имеет блестящую поверхность и расплющивается в лист, не раскалываясь. Почти все металлы при комнатной температуре твёрдые; жидкий среди них — ртуть. Неметалл обычно проводит плохо, тусклый и хрупкий, если он вообще твёрдый. Многие неметаллы — газы. Расширение: несколько элементов на «лесенке» между теми и другими, например кремний, ведут себя отчасти как одни и отчасти как другие. Их называют полуметаллами — слова этого в программе нет.

- [ ] OK   Comment:

**Paragraph of section “Reactivity, and why a group behaves alike”**

English:

> You can test a group by reacting its elements with oxygen, water and acids, and they behave the same way as each other. Group 1 metals react with water and get more violent down the group: lithium fizzes, sodium darts about, potassium catches fire. The same metals with an acid give off hydrogen faster still, which is far too violent to try in a school lab. Group 17 elements run the other way and get less reactive down the group. Group 18 already has a full outer level, so the noble gases react with almost nothing.

Russian, new:

> Группу можно проверить, дав её элементам прореагировать с кислородом, водой и кислотами: между собой они ведут себя одинаково. Металлы группы 1 реагируют с водой, и вниз по группе всё бурнее: литий шипит, натрий носится по поверхности, калий загорается. Те же металлы с кислотой выделяют водород ещё быстрее — это слишком бурная реакция для школьного опыта. Элементы группы 17 идут в обратную сторону: вниз по группе они становятся менее активными. У группы 18 внешний уровень уже полон, поэтому благородные газы почти ни с чем не реагируют.

Russian, before:

> Группу можно проверить, дав её элементам прореагировать с кислородом, водой и кислотами: между собой они ведут себя одинаково. Металлы группы 1 реагируют с водой, и вниз по группе всё бурнее: литий шипит, натрий носится по поверхности, калий загорается. Те же металлы с кислотой выделяют водород, и ещё быстрее. Элементы группы 17 идут в обратную сторону: вниз по группе они становятся менее активными. У группы 18 внешний уровень уже полон, поэтому благородные газы почти ни с чем не реагируют.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Ordered by atomic number, not by mass”**

English:

> Two periodic-table cells side by side, with an arrow from the first to the second for the order in the table. Tellurium: atomic number 52, relative atomic mass 127.60, labelled “heavier, but first”. Iodine: atomic number 53, relative atomic mass 126.90, labelled “lighter, but second”. In the tellurium cell the two numbers are labelled atomic number and relative atomic mass.

Russian, new:

> Две клетки периодической таблицы рядом; стрелка от первой ко второй показывает порядок в таблице. Теллур: атомный номер 52, относительная атомная масса 127,60, подпись «тяжелее, но стоит первым». Иод: атомный номер 53, относительная атомная масса 126,90, подпись «легче, но стоит вторым». В клетке теллура оба числа подписаны: атомный номер и относительная атомная масса.

Russian, before:

> Теллур и иод рядом. У теллура относительная атомная масса больше, а атомный номер меньше, и таблица ставит его первым.

- [ ] OK   Comment:


### Isotopes & Radioactivity

**Example card 1 (H-3): name**

English:

> Hydrogen-3 (tritium)

Russian, new:

> Водород-3 (тритий)

Russian, before:

> Углерод-12

- [ ] OK   Comment:

**Example card 1 (H-3): description**

English:

> radioactive: half-life about 12 years

Russian, new:

> радиоактивен: период полураспада около 12 лет

- [ ] OK   Comment:

**Example card 2 (Rn-222): description**

English:

> decays by giving out an alpha particle

Russian, new:

> распадается, испуская альфа-частицу

- [ ] OK   Comment:

**Example card 3 (I-131): description**

English:

> decays by giving out a beta particle

Russian, new:

> распадается, испуская бета-частицу

- [ ] OK   Comment:

**Example card 4 (Co-60): description**

English:

> gives out beta and gamma radiation — used for its gamma

Russian, new:

> испускает бета- и гамма-излучение; применяют его ради гамма-излучения

- [ ] OK   Comment:

**Example card 5 (C-14): description**

English:

> half-life about 5730 years

Russian, new:

> период полураспада около 5730 лет

- [ ] OK   Comment:

**Example card 6 (U-238): description**

English:

> half-life about 4.5 billion years

Russian, new:

> период полураспада около 4,5 миллиарда лет

- [ ] OK   Comment:

**Paragraph of section “The two numbers this sheet needs”**

English:

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put. Why an element's relative atomic mass, such as chlorine's 35.5, is not a whole number is on the Relative Atomic & Formula Mass sheet.

Russian, new:

> Атомный номер — это сколько у атома протонов, и именно он задаёт элемент. Массовое число — это протоны плюс нейтроны. Вся эта шпаргалка про то, как меняется второе число, пока первое остаётся на месте. Почему относительная атомная масса элемента, например 35,5 у хлора, не целое число, объясняется на шпаргалке «Относительная атомная и формульная масса».

Russian, before:

> Атомный номер — это сколько у атома протонов, и именно он задаёт элемент. Массовое число — это протоны плюс нейтроны. Вся эта шпаргалка про то, как меняется второе число, пока первое остаётся на месте. Оба понятия — расширение: школьная программа этих классов не называет ни одного из них, а без них здесь ничего не сходится.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Isotopes”**

English:

> Three hydrogen atoms, one above another. Each has one proton (a filled circle) and one electron in a soft band around the nucleus. Hydrogen-1 (protium) has no neutrons, hydrogen-2 (deuterium) has one and hydrogen-3 (tritium) has two (hollow circles). Hydrogen-1 and hydrogen-2 are labelled stable, and hydrogen-3 radioactive. Labels name the electron, the proton and the neutron.

Russian, new:

> Три атома водорода один под другим. У каждого один протон (закрашенный кружок) и один электрон в размытой области вокруг ядра. У водорода-1 (протия) нейтронов нет, у водорода-2 (дейтерия) один, у водорода-3 (трития) два (пустые кружки). Водород-1 и водород-2 подписаны как стабильные, водород-3 — как радиоактивный. Подписи называют электрон, протон и нейтрон.

Russian, before:

> Три атома водорода рядом: один протон; протон и нейтрон; протон и два нейтрона. У всех трёх по одному электрону.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

Russian, new:

> Некоторые ядра неустойчивы. Они распадаются сами по себе, испускают излучение и оставляют после себя более устойчивый атом. Радон-222 выбрасывает альфа-частицу — это два протона и два нейтрона вместе. Иод-131 испускает бета-частицу — быстрый электрон, вылетевший из ядра. Кобальт-60 даёт бета- и гамма-излучение, а применяют его ради гамма-излучения — это энергия, а не частица. Альфа задерживается листом бумаги, бета — алюминиевой пластиной. Гамма-излучение полностью не задерживает ничто: свинец или толстый бетон лишь сильно его ослабляют.

Russian, before:

> Некоторые ядра неустойчивы. Они распадаются сами по себе, испускают излучение и оставляют после себя более устойчивый атом. Радон-222 выбрасывает альфа-частицу — это два протона и два нейтрона вместе. Иод-131 испускает бета-частицу — быстрый электрон, вылетевший из ядра. Кобальт-60 даёт гамма-излучение, а это энергия, а не частица. Альфа задерживается листом бумаги, бета — алюминиевой пластиной, а для гаммы нужен свинец или толстый бетон.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Half-life”**

English:

> A decay curve of undecayed nuclei against time, in half-lives. It falls from 100 per cent to 50, 25, 12.5 and 6.25 per cent at one, two, three and four half-lives, with a dashed line down to the time axis at each point, and keeps falling after the fourth without reaching zero.

Russian, new:

> Кривая распада: число нераспавшихся ядер в зависимости от времени в периодах полураспада. Она падает со 100 процентов до 50, 25, 12,5 и 6,25 процента за один, два, три и четыре периода полураспада, в каждой точке от неё идёт пунктир вниз к оси времени, и дальше она продолжает падать, не достигая нуля.

Russian, before:

> Кривая распада, которая падает со 100 процентов до 50, 25 и 12,5 процента за один, два и три периода полураспада, и в каждой точке от неё идёт пунктир вниз к оси. После трёх периодов остаётся одна восьмая. Один период полураспада — это 5730 лет у углерода-14 и около 4,5 миллиарда лет у урана-238.

- [ ] OK   Comment:

**Paragraph of section “Elements that had to be made”**

English:

> Elements past uranium have no stable isotopes and are not found in nature in any useful amount. The first few, such as plutonium, are made in nuclear reactors: uranium takes in neutrons, and beta decay then turns it into neptunium and plutonium. The heavier ones are built in accelerators by firing one nucleus at another, sometimes a few atoms at a time. Many last less than a second before they decay. Making them is how the bottom rows of the periodic table were filled in.

Russian, new:

> У элементов после урана устойчивых изотопов нет, и в природе в сколько-нибудь заметных количествах они не встречаются. Первые из них, например плутоний, получают в ядерных реакторах: там уран захватывает нейтроны, а затем бета-распад превращает его в нептуний и плутоний. Более тяжёлые собирают на ускорителях, разгоняя одно ядро навстречу другому, иногда по несколько атомов за раз. Многие живут меньше секунды, а потом распадаются. Именно так заполнялись нижние строки периодической таблицы.

Russian, before:

> У элементов после урана устойчивых изотопов нет, и в природе они не встречаются. Их собирают на ускорителях, разгоняя одно ядро навстречу другому, иногда по несколько атомов за раз. Многие живут меньше секунды, а потом распадаются. Это расширение: программа искусственно полученных элементов не требует. Они здесь потому, что именно так заполнялись нижние строки периодической таблицы.

- [ ] OK   Comment:


### States of Matter

**Key takeaway 3**

English:

> Gases: particles move freely and are far apart — fills any container, easily compressed.

Russian, new:

> Газообразное: частицы движутся свободно и находятся далеко друг от друга — заполняют любой сосуд и легко сжимаются.

Russian, before:

> Газообразное: частицы движутся свободно и быстро — заполняют любой сосуд и легко сжимаются.

- [ ] OK   Comment:

**Heading of section “Particles in each state”**

English:

> Particles in each state

Russian, new:

> Частицы в разных агрегатных состояниях

- [ ] OK   Comment:

**Paragraph of section “Particles in each state”**

English:

> In a solid the particles touch in a regular pattern and vibrate in place. In a liquid they still touch, but they are jumbled and slide past one another; in a gas they are far apart and move freely in every direction. The particles are the same size in all three states: only their arrangement and the spaces between them change.

Russian, new:

> В твёрдом теле частицы касаются друг друга, расположены в правильном порядке и колеблются на своих местах. В жидкости они тоже касаются друг друга, но расположены беспорядочно и скользят друг относительно друга; в газе они далеко друг от друга и свободно движутся во всех направлениях. Размер частиц во всех трёх состояниях одинаков: меняются только их расположение и промежутки между ними.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Particles in each state”**

English:

> Three boxes, one above another, with particles of the same size in each. Solid: particles touching in a regular block of rows and columns, resting on the floor of the box. Liquid: the same number of particles, still touching but jumbled, with small gaps, spread across the bottom of the box. Gas: five particles far apart across the whole box, each with two short marks behind it to show that it is moving.

Russian, new:

> Три коробки одна над другой, в каждой частицы одного и того же размера. Твёрдое: частицы касаются друг друга и образуют правильный блок из рядов и столбцов, который лежит на дне коробки. Жидкое: столько же частиц, они тоже касаются друг друга, но расположены беспорядочно, с небольшими промежутками, по дну коробки. Газообразное: пять частиц далеко друг от друга по всей коробке, у каждой сзади два коротких штриха — знак того, что она движется.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Heating and cooling curves”**

English:

> A heating curve for water: temperature up the side and energy added along the bottom, with no numbers on the energy axis. The line climbs steeply through the solid, stays flat at 0 °C for melting, climbs less steeply through the liquid, stays flat at 100 °C for boiling, then climbs steeply again through the gas. The boiling plateau is drawn to scale, almost seven times as long as the melting plateau: about 2260 J against 334 J for each gram.

Russian, new:

> Кривая нагревания воды: по вертикали температура, по горизонтали полученная энергия, на оси энергии чисел нет. Линия круто поднимается для твёрдого вещества, идёт горизонтально при 0 °C во время плавления, поднимается менее круто для жидкости, идёт горизонтально при 100 °C во время кипения и снова круто поднимается для газа. Горизонтальный участок кипения нарисован в масштабе, он почти в семь раз длиннее участка плавления: около 2260 Дж против 334 Дж на грамм.

- [ ] OK   Comment:


### Acids & Bases

**Key takeaway 2**

English:

> Base: a proton acceptor. Soluble bases (alkalis) release hydroxide ions, OH−, in water. pH > 7.

Russian, new:

> Основание — акцептор протона. Растворимые основания (щёлочи) дают в воде гидроксид-ионы, OH−. pH больше 7.

Russian, before:

> Основание — акцептор протона. Растворимые основания (щёлочи) дают в воде гидроксид-ионы, OH-. pH больше 7.

- [ ] OK   Comment:

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

Russian, new:

> Нейтральная среда: pH 7 при 25 °C — чистая вода и растворы таких солей, как NaCl.

Russian, before:

> Нейтральная среда: pH 7 при 25 °C — чистая вода и большинство солей.

- [ ] OK   Comment:

**Key takeaway 4**

English:

> Neutralisation: acid + base → salt + water. The ionic equation is always H+ + OH− → H2O.

Russian, new:

> Нейтрализация: кислота + основание → соль + вода. Сокращённое ионное уравнение всегда H+ + OH− → H2O.

Russian, before:

> Нейтрализация: кислота + основание → соль + вода. Сокращённое ионное уравнение всегда H+ + OH- → H2O.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

Russian, new:

> Каждая ступень шкалы pH — это изменение концентрации H+ в 10 раз: при pH 2 концентрация H+ в 100 раз больше, чем при pH 4.

Russian, before:

> Каждая ступень шкалы pH — это изменение концентрации H+ в 10 раз: при pH 2 кислотность в 100 раз выше, чем при pH 4.

- [ ] OK   Comment:

**Heading of section “The pH scale”**

English:

> The pH scale

Russian, new:

> Шкала pH

- [ ] OK   Comment:

**Paragraph of section “The pH scale”**

English:

> pH says how acidic or alkaline a solution is. At 25 °C, below 7 is acidic, 7 is neutral and above 7 is alkaline, and most solutions you will meet lie between 0 and 14. Universal indicator turns a different colour at each pH: red at the acidic end, green at 7 and purple at the alkaline end.

Russian, new:

> pH показывает, насколько раствор кислый или щелочной. При 25 °C раствор с pH меньше 7 кислый, с pH 7 — нейтральный, а с pH больше 7 — щелочной; почти все растворы, которые тебе встретятся, лежат между 0 и 14. Универсальный индикатор при каждом значении pH окрашивается по-своему: в красный цвет в кислой среде, в зелёный при pH 7 и в фиолетовый в щелочной.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The pH scale”**

English:

> The pH scale as a bar from 0 at the top to 14 at the bottom, each step in its universal-indicator colour with its number printed beside it: red at 0, orange at 1, yellow at 2 and 3, green from 4 to 8, blue-green at 9, blue at 10 and 11 and purple from 12 to 14. Five everyday solutions are marked at their pH: stomach acid at 1, vinegar at 3, pure water at 7, baking soda at 8 and oven cleaner at 13.

Russian, new:

> Шкала pH в виде полосы от 0 вверху до 14 внизу; каждая ступень окрашена в цвет универсального индикатора, рядом стоит её число: красный при 0, оранжевый при 1, жёлтый при 2 и 3, зелёный от 4 до 8, сине-зелёный при 9, синий при 10 и 11 и фиолетовый от 12 до 14. Пять привычных веществ отмечены при своём pH: желудочный сок при 1, уксус при 3, чистая вода при 7, пищевая сода при 8 и средство для духовок при 13.

- [ ] OK   Comment:


### Balancing Chemical Equations

**Example card 1 (H2 + O2 -> H2O): name**

English:

> Unbalanced (no states yet)

Russian, new:

> Не уравнено (пока без обозначений состояния)

Russian, before:

> Не уравнено

- [ ] OK   Comment:

**Diagram description (alt text) in section “A method that always works”**

English:

> The reaction 2H₂ + O₂ → 2H₂O drawn as particles. On the left, the reactants: two hydrogen molecules, each two touching atoms marked H, plus one oxygen molecule, two touching atoms marked O. An arrow points to the products: two water molecules, each an O atom with two H atoms. The equation is written under the particles, and under that the atoms are counted on each side: H 4 and 4, O 2 and 2.

Russian, new:

> Реакция 2H₂ + O₂ → 2H₂O в виде частиц. Слева реагенты: две молекулы водорода, каждая из двух соприкасающихся атомов H, и одна молекула кислорода из двух атомов O. Стрелка ведёт к продуктам: двум молекулам воды, в каждой атом O и два атома H. Под частицами записано уравнение, а под ним — подсчёт атомов в обеих частях: H 4 и 4, O 2 и 2.

- [ ] OK   Comment:


### Types of Chemical Reactions

**Key takeaway 3**

English:

> Combustion: fuel + oxygen → carbon dioxide + water (for a hydrocarbon fuel, burning completely) — releases heat.

Russian, new:

> Горение: топливо + кислород → оксид углерода(IV) + вода (для углеводородного топлива при полном сгорании) — выделяется теплота.

Russian, before:

> Горение: топливо + кислород → оксид углерода(IV) + вода (при полном сгорании) — выделяется теплота.

- [ ] OK   Comment:


### Chemical Bonds & Structure

**Key takeaway 1**

English:

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons; helium, in group 18, has only 2).

Russian, new:

> Атомы соединяются, чтобы получить устойчивый, заполненный внешний уровень — как у благородного газа. Последняя цифра номера группы говорит, сколько у элемента главной подгруппы валентных электронов (Cl в группе 17 — 7 валентных электронов; в короткой таблице это VII группа; у гелия в группе 18 их всего 2).

Russian, before:

> Атомы соединяются, чтобы получить устойчивый, заполненный внешний уровень — как у благородного газа. Номер группы говорит, сколько у элемента главной подгруппы валентных электронов.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Why ionic compounds conduct only when molten or dissolved”**

English:

> Three boxes, one above another. Ionic: a grid of small positive ions and large negative ions, alternating, each marked + or −. Covalent: one hydrogen molecule, two atoms marked H whose circles overlap, with two electron dots in the overlap, labelled shared pair. Metallic: a grid of positive metal ions with as many small electron dots scattered between them, labelled delocalised electrons.

Russian, new:

> Три рамки одна под другой. Ионная связь: решётка из чередующихся маленьких положительных и крупных отрицательных ионов, каждый со знаком + или −. Ковалентная связь: молекула водорода — два атома H, чьи круги перекрываются, и две точки (электроны) в области перекрывания с подписью «общая электронная пара». Металлическая связь: решётка положительных ионов металла и столько же точек (электронов) между ними с подписью «свободные электроны».

- [ ] OK   Comment:


### Writing Ionic Formulas

**Key takeaway 2**

English:

> Write the cation (metal or NH4+) first, then the anion.

Russian, new:

> Сначала пиши катион (металл или NH4+), потом анион — даже если в названии анион идёт первым: хлорид натрия, NaCl.

Russian, before:

> Сначала пиши катион (металл или NH4+), потом анион.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Worked example: aluminium sulfate”**

English:

> Aluminium sulfate by the cross-over method. At the top, the aluminium ion Al³⁺, labelled cation, and the sulfate ion SO₄²⁻, labelled anion. Two crossing arrows carry each charge number down to become the other ion’s subscript: the 3 of Al³⁺ becomes the 3 after the bracketed sulfate, and the 2 of SO₄²⁻ becomes the 2 after Al. At the bottom, the formula Al₂(SO₄)₃, and the check: 2 × (+3) = +6 and 3 × (−2) = −6.

Russian, new:

> Сульфат алюминия по перекрёстному правилу. Вверху ион алюминия Al³⁺ с подписью «катион» и сульфат-ион SO₄²⁻ с подписью «анион». Две перекрещивающиеся стрелки переносят каждое число заряда вниз, где оно становится индексом другого иона: 3 от Al³⁺ — индексом 3 после сульфата в скобках, 2 от SO₄²⁻ — индексом 2 после Al. Внизу формула Al₂(SO₄)₃ и проверка: 2 × (+3) = +6 и 3 × (−2) = −6.

- [ ] OK   Comment:


### Polyatomic Ions

**Key takeaway 2**

English:

> The only common polyatomic cation is ammonium, NH4+ (apart from hydronium, H3O+, which you meet in acids). All the rest are anions.

Russian, new:

> Единственный распространённый многоатомный катион — аммоний, NH4+ (не считая иона гидроксония H3O+, который встречается в кислотах). Все остальные анионы.

Russian, before:

> Единственный распространённый многоатомный катион — аммоний, NH4+. Все остальные анионы.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Adding H+ to an anion makes its charge one less negative and adds "hydrogen" to the name: carbonate CO3 2− → hydrogen carbonate HCO3−.

Russian, new:

> Добавить H+ к аниону — значит сделать его заряд на единицу менее отрицательным и добавить к названию «гидро-»: карбонат CO3 2− → гидрокарбонат HCO3−.

Russian, before:

> Добавить H+ к аниону — значит поднять его заряд на единицу и добавить к названию «гидро-»: карбонат CO3 2− → гидрокарбонат HCO3−.

- [ ] OK   Comment:

**Paragraph of section “Where they show up”**

English:

> Acids: sulfuric acid is H2SO4 because sulfate is 2−; nitric acid is HNO3 because nitrate is 1−. Precipitation: all nitrates and all ammonium salts are soluble, so they are the usual "spectator" partners. Redox: permanganate and dichromate are the classic oxidising agents.

Russian, new:

> Кислоты: серная кислота — H2SO4, потому что сульфат 2−; азотная — HNO3, потому что нитрат 1−. Осаждение: все нитраты и все соли аммония растворимы, поэтому они и оказываются обычными ионами-наблюдателями. Окисление и восстановление: перманганат и дихромат — классические окислители.

Russian, before:

> Кислоты: серная кислота — H2SO4, потому что сульфат 2−; азотная — HNO3, потому что нитрат 1−. Осаждение: почти все нитраты и все соли аммония растворимы, поэтому они и оказываются обычными ионами-наблюдателями. Окисление и восстановление: перманганат и дихромат — классические окислители.

- [ ] OK   Comment:

**Heading of table “Polyatomic ions (VCE data book set)”**

English:

> Polyatomic ions (VCE data book set)

Russian, new:

> Основные многоатомные ионы

Russian, before:

> Многоатомные ионы (набор из справочника VCE)

- [ ] OK   Comment:

**Common mistake 3**

English:

> Confusing the charge (2−) with the number of oxygens — sulfate has 4 O and charge 2−.

Russian, new:

> Путать заряд (2−) с числом атомов кислорода: у сульфата 4 O и заряд 2−.

Russian, before:

> Путать заряд (−2) с числом атомов кислорода: у сульфата 4 O и заряд 2−.

- [ ] OK   Comment:


### Naming Inorganic Compounds

**Heading of section “Which naming system?”**

English:

> Which naming system?

Russian, new:

> Какая система названий?

- [ ] OK   Comment:

**Paragraph of section “Which naming system?”**

English:

> Look at what the compound is made of before you name it. A metal (or NH4+) with a non-metal is ionic: the cation, then the anion, with no prefixes. Two non-metals make a molecular compound, named with Greek prefixes — but if H comes first and it is dissolved in water, it is an acid, and acids have names of their own.

Russian, new:

> Сначала посмотри, из чего состоит вещество. Металл (или NH4+) с неметаллом — ионное соединение: сначала анион, потом катион в родительном падеже, без приставок (хлорид натрия). Два неметалла — молекулярное соединение, и у оксида обычно указывают валентность римской цифрой (оксид серы(IV)); а если впереди стоит H и вещество растворено в воде, это кислота, и у неё своё название, например соляная кислота.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Which naming system?”**

English:

> A flowchart for choosing a naming system. Metal + non-metal leads to ionic, for example sodium chloride. Two non-metals leads to molecular, for example sulfur dioxide. An arrow down from two non-metals leads to H first, in water, and from there to acid, for example hydrochloric acid.

Russian, new:

> Блок-схема выбора системы названий. От блока «металл + неметалл» стрелка ведёт к «ионное», пример — хлорид натрия. От блока «два неметалла» стрелка ведёт к «молекулярное», пример — оксид серы(IV). От того же блока «два неметалла» стрелка идёт вниз к «H впереди, в воде», а оттуда к «кислота», пример — соляная кислота.

- [ ] OK   Comment:


### Relative Atomic & Formula Mass

**Example card 1 (H2O): description**

English:

> 2 × 1 + 16 = 18

Russian, new:

> 2 × 1 + 16 = 18

- [ ] OK   Comment:

**Example card 2 (CO2): description**

English:

> 12 + 2 × 16 = 44

Russian, new:

> 12 + 2 × 16 = 44

- [ ] OK   Comment:

**Example card 3 (CaCO3): description**

English:

> 40 + 12 + 3 × 16 = 100

Russian, new:

> 40 + 12 + 3 × 16 = 100

- [ ] OK   Comment:

**Example card 4 (Mg(OH)2): description**

English:

> 24 + 2 × (16 + 1) = 58

Russian, new:

> 24 + 2 × (16 + 1) = 58

- [ ] OK   Comment:

**Example card 5 (Ca(NO3)2): description**

English:

> 40 + 2 × (14 + 3 × 16) = 164

Russian, new:

> 40 + 2 × (14 + 3 × 16) = 164

- [ ] OK   Comment:

**Diagram description (alt text) in section “What "relative" actually means”**

English:

> A balance with two hanging pans, level. On the left pan is one carbon atom, a circle marked C. On the right pan are twelve hydrogen atoms, smaller circles marked H, piled in rows of five, four and three. Carbon is drawn bigger than hydrogen, but nowhere near twelve times the size. Labels under the pans say 1 carbon atom and 12 hydrogen atoms, and a note says the picture is not to scale.

Russian, new:

> Весы с двумя подвешенными чашами в равновесии. На левой чаше — один атом углерода, кружок с буквой C. На правой — двенадцать атомов водорода, кружки поменьше с буквой H, сложенные рядами по пять, четыре и три. Углерод нарисован крупнее водорода, но далеко не в двенадцать раз. Под чашами подписано «1 атом углерода» и «12 атомов водорода», а пометка говорит, что масштаб не соблюдён.

- [ ] OK   Comment:

**Example card 1 in section “Adding the atoms up”: description**

English:

> 14 + 3 × 1 = 17

Russian, new:

> 14 + 3 × 1 = 17

- [ ] OK   Comment:

**Example card 2 in section “Adding the atoms up”: description**

English:

> 12 + 4 × 1 = 16

Russian, new:

> 12 + 4 × 1 = 16

- [ ] OK   Comment:

**Example card 3 in section “Adding the atoms up”: description**

English:

> 2 × 1 + 32 + 4 × 16 = 98

Russian, new:

> 2 × 1 + 32 + 4 × 16 = 98

- [ ] OK   Comment:

**Example card 1 in section “Subscripts and brackets”: description**

English:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

Russian, new:

> 2 × 27 + 3 × (32 + 4 × 16) = 342

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 9, column 3**

English:

> 35.5

Russian, new:

> 35,5

Russian, before:

> 35.5

- [ ] OK   Comment:

**Table “The values a Year 10 class uses”, row 13, column 3**

English:

> 63.5

Russian, new:

> 63,5

Russian, before:

> 63.5

- [ ] OK   Comment:

**Table “Worked examples”, row 1, column 2**

English:

> 2 × 1

Russian, new:

> 2 × 1

Russian, before:

> 2 x 1

- [ ] OK   Comment:

**Table “Worked examples”, row 2, column 2**

English:

> 2 × 16

Russian, new:

> 2 × 16

Russian, before:

> 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 3, column 2**

English:

> 2 × 1 + 16

Russian, new:

> 2 × 1 + 16

Russian, before:

> 2 x 1 + 16

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 2**

English:

> 23 + 35.5

Russian, new:

> 23 + 35,5

Russian, before:

> 23 + 35.5

- [ ] OK   Comment:

**Table “Worked examples”, row 4, column 3**

English:

> 58.5

Russian, new:

> 58,5

Russian, before:

> 58.5

- [ ] OK   Comment:

**Table “Worked examples”, row 6, column 2**

English:

> 12 + 2 × 16

Russian, new:

> 12 + 2 × 16

Russian, before:

> 12 + 2 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 7, column 2**

English:

> 40 + 12 + 3 × 16

Russian, new:

> 40 + 12 + 3 × 16

Russian, before:

> 40 + 12 + 3 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 8, column 2**

English:

> 2 × 1 + 32 + 4 × 16

Russian, new:

> 2 × 1 + 32 + 4 × 16

Russian, before:

> 2 x 1 + 32 + 4 x 16

- [ ] OK   Comment:

**Table “Worked examples”, row 9, column 2**

English:

> 24 + 2 × (16 + 1)

Russian, new:

> 24 + 2 × (16 + 1)

Russian, before:

> 24 + 2 x (16 + 1)

- [ ] OK   Comment:

**Table “Worked examples”, row 10, column 2**

English:

> 40 + 2 × (14 + 3 × 16)

Russian, new:

> 40 + 2 × (14 + 3 × 16)

Russian, before:

> 40 + 2 x (14 + 3 x 16)

- [ ] OK   Comment:

**Common mistake 1**

English:

> Saying an atom of carbon "weighs 12" — 12 what? Ar is a comparison and has no unit. Grams only appear once you scale up to a real amount.

Russian, new:

> Говорить, что атом углерода «весит 12». Двенадцать чего? Ar — это сравнение, и единицы у неё нет. Граммы появляются только при переходе к настоящему количеству.

- [ ] OK   Comment:


### The Mole & Stoichiometry

**Diagram description (alt text) in section “Worked example: mass → mass”**

English:

> The mole map. Four boxes down the left, mass, particles, gas volume and solution, are each joined to a tall box, moles of reactant, by a two-way arrow carrying its formula: n = m/M, n = N/N_A, n = V/V_m and n = cV. From moles of reactant, an arrow labelled mole ratio (coefficients) leads down to moles of product.

Russian, new:

> Схема переходов через количество вещества. Слева друг под другом четыре блока — масса, число частиц, объём газа и раствор; каждый соединён с высоким блоком «количество вещества реагента» двусторонней стрелкой со своей формулой: n = m/M, n = N/N_A, n = V/V_m и n = cV. От количества вещества реагента вниз идёт стрелка с подписью «мольное соотношение (коэффициенты)» к количеству вещества продукта.

- [ ] OK   Comment:

**Table “The conversion formulas”, row 4, column 2**

English:

> volume of a gas at SLC

Russian, new:

> объём газа при 25 °C и 100 кПа

Russian, before:

> объём газа при стандартных условиях

- [ ] OK   Comment:

**Common mistake 4**

English:

> Rounding early — keep full precision until the final answer, then round to the same number of significant figures as the least precise value you were given.

Russian, new:

> Округлять рано: держи полную точность до самого конца, а в ответе оставь столько значащих цифр, сколько их в наименее точном из данных значений.

Russian, before:

> Округлять рано: держи полную точность до самого конца, а в ответе оставь три значащие цифры.

- [ ] OK   Comment:


### Lewis Structures

**Key takeaway 1**

English:

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17; helium, in group 18, has only 2). Add one electron per negative charge, remove one per positive charge.

Russian, new:

> Число валентных электронов у элементов главных подгрупп равно последней цифре номера группы (H 1, C 4, N 5, O 6, галогены 7; азот стоит в группе 15, хлор — в группе 17; у гелия в группе 18 их всего 2). За каждый минус заряда прибавь электрон, за каждый плюс отними.

Russian, before:

> Валентных электронов столько же, сколько номер группы, — для элементов главных подгрупп (H 1, C 4, N 5, O 6, галогены 7). За каждый минус заряда прибавь электрон, за каждый плюс отними.

- [ ] OK   Comment:

**Paragraph of section “Year 10 essentials”**

English:

> Every atom brings its outer electrons as dots. A dot on its own is an unpaired electron (a "loner"); two loners from two different atoms make a shared pair, which is one bond (drawn as a line). Pairs that stay on one atom are lone pairs. An atom is full at 8 dots around it (an octet) — hydrogen is full at 2 (a duet). Share twice between the same two atoms for a double bond, three times for a triple. The number of loners tells you how many bonds an atom makes: H 1, C 4, N 3, O 2, Cl 1. Sulfur behaves like oxygen and phosphorus like nitrogen because they are in the same groups. Everything below this section (formal charge, VSEPR shapes, octet exceptions) is Senior content.

Russian, new:

> Каждый атом приносит свои внешние электроны точками. Точка сама по себе — это неспаренный электрон; два неспаренных электрона от разных атомов дают общую пару, а это одна связь (её рисуют линией). Пары, которые остаются на одном атоме, — неподелённые. Атом заполнен, когда вокруг него 8 точек (октет); водороду хватает 2 (дублет). Подели дважды между одними и теми же атомами — выйдет двойная связь, трижды — тройная. Число неспаренных электронов и говорит, сколько связей образует атом: H 1, C 4, N 3, O 2, Cl 1. Сера ведёт себя как кислород, а фосфор как азот, потому что стоят в тех же группах. Всё, что ниже этого раздела (формальный заряд, формы молекул, исключения из октета), — материал старших классов.

Russian, before:

> Каждый атом приносит свои внешние электроны точками. Точка сама по себе — это одиночка; две одиночки от разных атомов дают общую пару, а это одна связь (её рисуют линией). Пары, которые остаются на одном атоме, — неподелённые. Атом заполнен, когда вокруг него 8 точек (октет); водороду хватает 2 (дублет). Подели дважды между одними и теми же атомами — выйдет двойная связь, трижды — тройная. Число одиночек и говорит, сколько связей образует атом: H 1, C 4, N 3, O 2, Cl 1. Сера ведёт себя как кислород, а фосфор как азот, потому что стоят в тех же группах. Всё, что ниже этого раздела (формальный заряд, формы молекул, исключения из октета), — материал старших классов.

- [ ] OK   Comment:

**Diagram description (alt text) in section “Year 10 essentials”**

English:

> Lewis structures of four molecules, each with its formula underneath. Water, H₂O: H–O–H with two lone pairs on the oxygen, one above it and one below. Ammonia, NH₃: nitrogen with single bonds to three hydrogens and one lone pair. Carbon dioxide, CO₂: O=C=O, two double bonds, with two lone pairs on each oxygen and none on the carbon. Methane, CH₄: carbon with single bonds to four hydrogens and no lone pairs. Bonds are lines and lone pairs are pairs of dots. Labels point to one lone pair, on the oxygen in water, and to one shared pair, a bond in ammonia.

Russian, new:

> Формулы Льюиса четырёх молекул, под каждой её формула. Вода, H₂O: H–O–H, у кислорода две неподелённые электронные пары, одна сверху и одна снизу. Аммиак, NH₃: азот связан с тремя атомами водорода одинарными связями, у него одна неподелённая пара. Оксид углерода(IV), CO₂: O=C=O, две двойные связи, у каждого кислорода по две неподелённые пары, у углерода ни одной. Метан, CH₄: углерод связан с четырьмя атомами водорода одинарными связями, неподелённых пар нет. Связи — линии, неподелённые пары — пары точек. Подписи указывают на одну неподелённую пару у кислорода в воде и на одну общую электронную пару — связь в аммиаке.

- [ ] OK   Comment:

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

Russian, new:

> Метан — углерод делится всеми четырьмя неспаренными электронами

Russian, before:

> Метан — углерод делится всеми четырьмя одиночками

- [ ] OK   Comment:

**Diagram description (alt text) in section “From Lewis structure to shape (VSEPR)”**

English:

> The five VSEPR shapes, each with its formula, shape and bond angle underneath, drawn in 3D: a solid wedge is a bond coming out of the page and a hashed wedge a bond going behind it. CO₂ is linear, 180°. BF₃ is trigonal planar, 120°. CH₄ is tetrahedral, 109.5°. NH₃ is trigonal pyramidal, 107°, with its lone pair drawn as a lobe on the nitrogen. H₂O is bent, 104.5°, with two lone-pair lobes on the oxygen. NH₃ and H₂O are drawn like CH₄ with one, then two, of its bonds replaced by a lone pair. A small arc marks the angle between the two bonds that lie in the page.

Russian, new:

> Пять форм молекул, под каждой формула, форма и валентный угол; молекулы нарисованы объёмно: сплошной клин — связь, выходящая из плоскости к нам, штрихованный клин — связь, уходящая за плоскость. CO₂ — линейная форма, 180°. BF₃ — плоский треугольник, 120°. CH₄ — тетраэдр, 109,5°. NH₃ — тригональная пирамида, 107°, неподелённая пара у азота показана электронным облаком. H₂O — уголковая форма, 104,5°, у кислорода два таких облака. NH₃ и H₂O нарисованы как CH₄, у которого одну, а затем две связи заменила неподелённая пара. Маленькая дуга отмечает угол между двумя связями, лежащими в плоскости страницы.

- [ ] OK   Comment:


### Naming Organic Compounds

**Diagram description (alt text) in section “Worked example”**

English:

> The skeletal structure of 3-methylpentan-2-ol: a zigzag chain of five carbons, numbered 1 to 5 from left to right, with OH at the end of a bond up from carbon 2 and a methyl group as a short line down from carbon 3, labelled methyl. Underneath, the name 3-methylpentan-2-ol.

Russian, new:

> Скелетная формула 3-метилпентан-2-ола: зигзагообразная цепь из пяти атомов углерода, пронумерованных от 1 до 5 слева направо. От углерода 2 вверх идёт связь к OH, от углерода 3 вниз — короткая черта: это метильная группа с подписью «метил». Внизу название 3-метилпентан-2-ол.

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 1**

English:

> Amide

Russian, new:

> Амид

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 2**

English:

> -amide

Russian, new:

> -амид

- [ ] OK   Comment:

**Table “Suffix priority (highest first)”, row 3, column 3**

English:

> ethanamide

Russian, new:

> этанамид

- [ ] OK   Comment:

**Common mistake 4**

English:

> Forgetting the locant for -ene, -ol or -one whenever the group could sit in more than one position (propan-1-ol vs propan-2-ol).

Russian, new:

> Забывать номер у -ен, -ол, -он, если группа может стоять в цепи в разных местах (пропан-1-ол и пропан-2-ол).

Russian, before:

> Забывать номер у -ен, -ол, -он, когда в цепи 4 углерода или больше.

- [ ] OK   Comment:


### Functional Groups

**Paragraph of section “The reaction pathway you must know”**

English:

> Alkene → (H₂O, H₃PO₄ catalyst) → alcohol. Alkene → (HX) → haloalkane → (OH⁻(aq)) → alcohol → (Cr₂O₇²⁻/H⁺) → aldehyde → (further oxidation) → carboxylic acid → (alcohol, H₂SO₄ catalyst) → ester. Primary alcohols oxidise twice, secondary alcohols oxidise once to ketones, tertiary alcohols do not oxidise.

Russian, new:

> Алкен → (H₂O, катализатор H₃PO₄) → спирт. Алкен → (HX) → галогеналкан → (OH⁻(aq)) → спирт → (Cr₂O₇²⁻/H⁺) → альдегид → (дальнейшее окисление) → карбоновая кислота → (спирт, катализатор H₂SO₄) → сложный эфир. Первичные спирты окисляются дважды, вторичные — один раз до кетона, третичные не окисляются.

Russian, before:

> Алкен → (H2O, катализатор H+) → спирт. Алкен → (HX) → галогеналкан → (OH−) → спирт → (Cr2O7 2−/H+) → альдегид → (дальнейшее окисление) → карбоновая кислота → (спирт, катализатор H2SO4) → сложный эфир. Первичные спирты окисляются дважды, вторичные — один раз до кетона, третичные не окисляются.

- [ ] OK   Comment:

**Diagram description (alt text) in section “The reaction pathway you must know”**

English:

> A reaction map, read from the top down. Down the left: an alkene gives a primary alcohol with H₂O and an H₃PO₄ catalyst; the primary alcohol gives an aldehyde with Cr₂O₇²⁻/H⁺, the aldehyde a carboxylic acid with Cr₂O₇²⁻/H⁺, and the carboxylic acid an ester with an alcohol and an H₂SO₄ catalyst. On the right: the alkene can instead take HX to give a haloalkane, which gives the same primary alcohol with OH⁻(aq); and beside the primary alcohol, a secondary alcohol oxidises to a ketone with Cr₂O₇²⁻/H⁺.

Russian, new:

> Схема превращений, читается сверху вниз. Слева: алкен с H₂O (катализатор H₃PO₄) даёт первичный спирт, первичный спирт с Cr₂O₇²⁻/H⁺ — альдегид, альдегид с Cr₂O₇²⁻/H⁺ — карбоновую кислоту, а карбоновая кислота со спиртом (катализатор H₂SO₄) — сложный эфир. Справа: алкен может вместо этого присоединить HX и дать галогеналкан, который с OH⁻(aq) даёт тот же первичный спирт; а рядом с первичным спиртом вторичный спирт окисляется Cr₂O₇²⁻/H⁺ до кетона.

- [ ] OK   Comment:

**Paragraph of section “Spotting groups in a spectrum”**

English:

> IR: a broad O–H stretch around 3200–3550 cm⁻¹ means alcohol (or, very broad and overlapping C–H, carboxylic acid); a strong C=O near 1670–1750 cm⁻¹ means aldehyde, ketone, acid, ester or amide. The VCE data book lists the exact ranges — use it.

Russian, new:

> ИК: широкая полоса O–H около 3200–3550 см⁻¹ — спирт (а если она очень широкая и накладывается на C–H, то карбоновая кислота); сильная полоса C=O около 1670–1750 см⁻¹ — альдегид, кетон, кислота, сложный эфир или амид. Точные интервалы есть в таблицах ИК-спектроскопии — пользуйся ими.

Russian, before:

> ИК: широкая полоса O–H около 3200–3550 см⁻¹ — спирт (а если она очень широкая и накладывается на C–H, то карбоновая кислота); сильная полоса C=O около 1670–1750 см⁻¹ — альдегид, кетон, кислота, сложный эфир или амид. Точные интервалы есть в справочнике VCE — пользуйся им.

- [ ] OK   Comment:

**Common mistake 1**

English:

> Calling a molecule with –OH on a benzene ring an alcohol (it is a phenol) — a common trap.

Russian, new:

> Называть спиртом молекулу с –OH на бензольном кольце (это фенол) — частая ловушка.

Russian, before:

> Называть спиртом молекулу с –OH на бензольном кольце (это фенол) — за рамками программы VCE, но ловушка частая.

- [ ] OK   Comment:

