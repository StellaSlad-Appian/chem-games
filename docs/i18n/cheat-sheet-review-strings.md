# Cheat sheet translations to review

**For:** a native speaker of German, French, Spanish, Italian or Russian, ideally
one who teaches or studied chemistry. You only need your own language's section.

**What this is:** every piece of cheat-sheet text that was written or changed during
the cheat sheet review of 24–25 September 2026. That covers steps 1–3 (the example
cards, and the science fixes on all 15 sheets) and step 5 (the four redrawn diagrams
on *Atoms & the Periodic Table*: their labels, in a table at the top of each
language, and their descriptions for screen readers). The isotope diagrams and the
new diagrams will be added in later updates of this file.

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
- **German:** *2, 8, 1* is kept, although some German textbooks write shells as
  letters (K2 L8 M1). Please check.

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

## German (de): 69 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-de.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 Jahre*. A no-break space groups from five digits on (*65 000*), which is how the sheets already write it. DIN 5008 allows either for four digits; unseparated matches the isotopes prose. |
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
| significant figures | **gültige Ziffern** | Added 2026-09-25. The phrase German physics and chemistry lessons use for the rounding rule (*so viele gültige Ziffern wie die ungenaueste Angabe*). *Signifikante Stellen*, which the stoichiometry sheet used before, is understood but reads like a translation. |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet. The IR sentence on the functional-groups sheet now points to *eine IR-Tabelle*, and the polyatomic-ion table is headed *Die wichtigsten mehratomigen Ionen*. The *Tafelwerk* is the German equivalent for most data, but it was not named for IR ranges because not every Tafelwerk prints them. |

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

**Example card 1 (C-12): description**

English:

> the standard all other masses are measured against

German, new:

> der Standard, an dem alle anderen Massen gemessen werden

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

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put.

German, new:

> Die Ordnungszahl ist die Zahl der Protonen, und sie legt fest, welches Element es ist. Die Massenzahl ist Protonen plus Neutronen. Auf diesem Spickzettel geht es überall darum, dass sich die zweite Zahl ändert und die erste bleibt.

German, before:

> Die Ordnungszahl ist die Zahl der Protonen, und sie legt fest, welches Element es ist. Die Massenzahl ist Protonen plus Neutronen. Auf diesem Spickzettel geht es überall darum, dass sich die zweite Zahl ändert und die erste bleibt. Beide Begriffe sind eine Erweiterung: Der Lehrplan dieser Jahrgänge nennt keinen von beiden, und ohne sie funktioniert hier nichts.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

German, new:

> Manche Kerne sind instabil. Sie zerfallen von selbst, geben Strahlung ab und lassen ein stabileres Atom zurück. Radon-222 schleudert ein Alphateilchen heraus, also zwei Protonen und zwei Neutronen zusammen. Iod-131 gibt ein Betateilchen ab, also ein schnelles Elektron aus dem Kern. Cobalt-60 gibt Beta- und Gammastrahlung ab und wird wegen der Gammastrahlung eingesetzt. Sie ist Energie statt eines Teilchens. Papier hält Alpha auf, ein Blech aus Aluminium hält Beta auf. Gammastrahlung lässt sich nie ganz aufhalten: Blei oder dicker Beton schwächen sie stark ab.

German, before:

> Manche Kerne sind instabil. Sie zerfallen von selbst, geben Strahlung ab und lassen ein stabileres Atom zurück. Radon-222 schleudert ein Alphateilchen heraus, also zwei Protonen und zwei Neutronen zusammen. Iod-131 gibt ein Betateilchen ab, also ein schnelles Elektron aus dem Kern. Cobalt-60 gibt Gammastrahlung ab, und das ist Energie statt eines Teilchens. Papier hält Alpha auf, ein Blech aus Aluminium hält Beta auf, und für Gamma braucht man Blei oder dicken Beton.

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


### Acids & Bases

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

German, new:

> Neutral: pH 7 bei 25 °C – reines Wasser und Lösungen von Salzen wie NaCl.

German, before:

> Neutral: pH 7 bei 25 °C – reines Wasser und die meisten Salze.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

German, new:

> Jede Stufe auf der pH-Skala bedeutet den Faktor 10 in der H+-Konzentration: Bei pH 2 ist die H+-Konzentration 100-mal so groß wie bei pH 4.

German, before:

> Jede Stufe auf der pH-Skala bedeutet den Faktor 10 in der H+-Konzentration: pH 2 ist 100-mal saurer als pH 4.

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

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons).

German, new:

> Atome gehen Bindungen ein, um eine stabile, volle Außenschale zu erreichen (Edelgaskonfiguration). Bei den Hauptgruppenelementen sagt dir die letzte Ziffer der Gruppennummer, wie viele Valenzelektronen ein Atom hat (Cl steht in Gruppe 17: 7 Valenzelektronen). Das ist dieselbe Zahl wie die Nummer der Hauptgruppe (Cl: VII. Hauptgruppe).

German, before:

> Atome gehen Bindungen ein, um eine stabile, volle Außenschale zu erreichen (Edelgaskonfiguration). Bei den Hauptgruppenelementen sagt dir die Hauptgruppennummer, wie viele Valenzelektronen ein Atom hat.

- [ ] OK   Comment:


### Writing Ionic Formulas

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

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17). Add one electron per negative charge, remove one per positive charge.

German, new:

> Valenzelektronen = letzte Ziffer der Gruppennummer bei den Hauptgruppenelementen (H 1, C 4, N 5, O 6, Halogene 7 – Stickstoff steht in Gruppe 15, Chlor in Gruppe 17). Pro negativer Ladung kommt ein Elektron dazu, pro positiver Ladung fällt eins weg.

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

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

German, new:

> Methan – Kohlenstoff teilt alle vier ungepaarten Elektronen

German, before:

> Methan – Kohlenstoff teilt alle vier Einzelelektronen

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

## French (fr): 71 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-fr.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 ans*, while *65 000* keeps its space. The SI brochure lets a four-digit number stand unseparated, and it is what the isotopes prose already printed. **Rated medium**: many French textbooks write *5 730 ans*; if a native reviewer prefers that, change the prose and the example card together. |
| electron shell (the curriculum's word) | **couche électronique** | VC2S10U07 says "electron shells", so the sheet names *couche* once as the word the reader's teacher uses, and keeps *niveau d'énergie* as its own term. Since 2026-09-25 the sentence credits the word to the teacher alone (*Ton prof parle peut-être de couches*); it no longer mentions the programme. |
| valence electrons from the group number | **le chiffre des unités du numéro du groupe** (*Cl est dans le groupe 17 : 7 électrons de valence*) | Added 2026-09-25. With groups numbered 1–18, *numéro du groupe = électrons de valence* is only true for groups 1 and 2, so the bonding and Lewis sheets state the last-digit rule. *Chiffre des unités* is plain school French for "last digit". **Numbered, it is always *groupe*, never *colonne*** (owner's decision, 2026-09-25): *groupe 17*, *le groupe 1*, and the Lewis table is headed *Électrons de valence par groupe*. *Colonne* stays only where a sentence explains what a group is (*un groupe est une colonne*). |
| beta decay | **désintégration bêta** | Added 2026-09-25, for how reactors make neptunium and plutonium. Matches *particule bêta*, with the circumflex. |
| shielding gamma ("reduces, never stops") | **atténuer**: *le plomb ou le béton épais l'atténuent fortement* | Added 2026-09-24. *Atténuation* is the word French physique-chimie uses for gamma passing through matter; alpha and beta keep *arrêter*. |
| electron cloud (diagram label) | **nuage électronique** | Added 2026-09-25 with the redrawn atom diagrams. The standard term in French teaching. |
| not to scale (diagram caveat) | **Échelle non respectée**, and the ratio as **1/100 000 du diamètre de l’atome** | Added 2026-09-25 with the redrawn atom diagrams. *Échelle non respectée* is the caption French textbooks print under a schematic; *pas à l’échelle* is a calque. Says *diamètre*, because by volume the ratio is about 10⁻¹⁵. |
| heavier, but first / lighter, but second (06) | **plus lourd, mais placé avant** / **plus léger, mais placé après** | Added 2026-09-25 with the redrawn atom diagrams. Masculine to agree with *tellure* and *iode*, not with the reader. |
| a cell of the periodic table | **case** (*la case du tellure*) | Added 2026-09-25 with the redrawn atom diagrams. |
| name order vs formula order | formula **cation first**, name **anion first**: *chlorure de sodium*, NaCl | Added 2026-09-25. The English common mistake "writing the anion first because it sounds first" was removed, since in English the cation is said first. In French the trap is real, but an overlay must keep the English list lengths, so the point lives in takeaway 2 of *Writing Ionic Formulas* instead. |
| significant figures | **chiffres significatifs** | Added 2026-09-25. The lycée rule is *autant de chiffres significatifs que la donnée la moins précise*, and the stoichiometry sheet now says that rather than a fixed three. |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet. The IR sentence now points to *une table de données IR*, which is what a French exercise supplies, and the polyatomic-ion table is headed *Les principaux ions polyatomiques*. |

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

**Example card 1 (C-12): description**

English:

> the standard all other masses are measured against

French, new:

> l’étalon auquel on compare toutes les autres masses

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

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put.

French, new:

> Le numéro atomique est le nombre de protons, et c’est lui qui fixe l’élément. Le nombre de masse, c’est les protons plus les neutrons. Toute cette antisèche parle du deuxième nombre qui change pendant que le premier reste en place.

French, before:

> Le numéro atomique est le nombre de protons, et c’est lui qui fixe l’élément. Le nombre de masse, c’est les protons plus les neutrons. Toute cette antisèche parle du deuxième nombre qui change pendant que le premier reste en place. Les deux mots sont un prolongement : le programme de ces années-là n’en nomme aucun, et sans eux rien ici ne fonctionne.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

French, new:

> Certains noyaux sont instables. Ils se désintègrent tout seuls, émettent un rayonnement et laissent derrière eux un atome plus stable. Le radon 222 éjecte une particule alpha, c’est-à-dire deux protons et deux neutrons ensemble. L’iode 131 émet une particule bêta, c’est-à-dire un électron rapide parti du noyau. Le cobalt 60 émet des rayonnements bêta et gamma, et on l’utilise pour son rayonnement gamma, qui est de l’énergie et pas une particule. Une feuille de papier arrête l’alpha et une plaque d’aluminium arrête le bêta. Rien n’arrête complètement le gamma : le plomb ou le béton épais l’atténuent fortement.

French, before:

> Certains noyaux sont instables. Ils se désintègrent tout seuls, émettent un rayonnement et laissent derrière eux un atome plus stable. Le radon 222 éjecte une particule alpha, c’est-à-dire deux protons et deux neutrons ensemble. L’iode 131 émet une particule bêta, c’est-à-dire un électron rapide parti du noyau. Le cobalt 60 émet un rayonnement gamma, qui est de l’énergie et pas une particule. Une feuille de papier arrête l’alpha, une plaque d’aluminium arrête le bêta, et le gamma demande du plomb ou du béton épais.

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


### Acids & Bases

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

French, new:

> Neutre : pH 7 à 25 °C – l’eau pure, et les solutions de sels comme NaCl.

French, before:

> Neutre : pH 7 à 25 °C – l’eau pure et la plupart des sels.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

French, new:

> Chaque graduation de l’échelle de pH correspond à un facteur 10 sur la concentration en H+ : à pH 2, la concentration en H+ est 100 fois plus grande qu’à pH 4.

French, before:

> Chaque graduation de l’échelle de pH correspond à un facteur 10 sur la concentration en H+ : un pH 2 est 100 fois plus acide qu’un pH 4.

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

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons).

French, new:

> Les atomes se lient pour atteindre une couche externe stable et complète (la configuration d’un gaz noble). Pour un élément d’un groupe principal, le chiffre des unités du numéro du groupe donne le nombre d’électrons de valence (Cl est dans le groupe 17 : 7 électrons de valence).

French, before:

> Les atomes se lient pour atteindre une couche externe stable et complète (la configuration d’un gaz noble). Pour un élément d’un groupe principal, le numéro de colonne donne le nombre d’électrons de valence.

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

**Paragraph of section “Working out a Roman numeral”**

English:

> For Fe2(SO4)3: sulfate is 2−, and there are three, so the anions total −6. Two iron ions must total +6, so each is +3 → iron(III) sulfate. Only metals with more than one common charge (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni) need the numeral; Group 1, Group 2, Al, Zn and Ag never do.

French, new:

> Pour Fe2(SO4)3 : le sulfate porte 2−, et il y en a trois, donc les anions totalisent −6. Les deux ions fer doivent totaliser +6, chacun est donc en +3 → sulfate de fer(III). Seuls les métaux qui ont plus d’une charge courante (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni) ont besoin du chiffre ; le groupe 1, le groupe 2, Al, Zn et Ag n’en ont jamais besoin.

French, before:

> Pour Fe2(SO4)3 : le sulfate porte 2−, et il y en a trois, donc les anions totalisent −6. Les deux ions fer doivent totaliser +6, chacun est donc en +3 → sulfate de fer(III). Seuls les métaux qui ont plus d’une charge courante (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni) ont besoin du chiffre ; la colonne 1, la colonne 2, Al, Zn et Ag n’en ont jamais besoin.

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

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17). Add one electron per negative charge, remove one per positive charge.

French, new:

> Électrons de valence = chiffre des unités du numéro du groupe pour les éléments des groupes principaux (H 1, C 4, N 5, O 6, halogènes 7 – l’azote est dans le groupe 15, le chlore dans le groupe 17). Ajoute un électron par charge négative, enlève-en un par charge positive.

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

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

French, new:

> Méthane – le carbone partage ses quatre électrons célibataires

French, before:

> Méthane – le carbone partage ses quatre solitaires

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

## Spanish (es): 67 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-es.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 años*. The RAE (*Ortografía*, 2010) writes four-digit numbers without the space; it starts at five digits (*65 000*). |
| billion (10⁹) | **mil millones**, so 4.5 billion years is *4500 millones de años*. Never *billón*, which in Spanish is 10¹² — a thousand times too old for uranium-238. |
| electron shell (the curriculum's word) | **capa electrónica** | VC2S10U07 says "electron shells", so the sheet names *capa* once as the word the reader's teacher uses, and keeps *nivel de energía* as its own term. Since 2026-09-25 the sentence is *Puede que en clase oigas llamarlos capas*: it credits the word to the classroom alone, no longer to the curriculum, and it avoids a gendered *tu profesor*. |
| valence electrons from the group number | **la última cifra del número de grupo** (*el Cl está en el grupo 17: 7 electrones de valencia*) | Added 2026-09-25. Spanish textbooks number the groups 1–18, where *número de grupo = electrones de valencia* only holds for groups 1 and 2. The bonding and Lewis sheets now state the last-digit rule. |
| beta decay | **desintegración beta** | Added 2026-09-25, for how reactors make neptunium and plutonium. Matches *partícula beta*. |
| shielding gamma ("reduces, never stops") | **atenuar**: *el plomo o el hormigón grueso la atenúan mucho* | Added 2026-09-24. *Atenuación* is the textbook word for gamma passing through matter; alpha and beta keep *detener*. |
| electron cloud (diagram label) | **nube electrónica** | Added 2026-09-25 with the redrawn atom diagrams. The standard term in ESO textbooks. |
| not to scale (diagram caveat) | **No está a escala**, and the ratio as **1/100 000 del diámetro del átomo** | Added 2026-09-25 with the redrawn atom diagrams. Says *diámetro*, because by volume the ratio is about 10⁻¹⁵. *100 000 veces menor* was rejected: common, but it does not say what is compared, and *veces menor* is a construction style guides object to. |
| heavier, but first / lighter, but second (06) | **más pesado, pero va antes** / **más ligero, pero va después** | Added 2026-09-25 with the redrawn atom diagrams. *Ir antes / después* is how a Spanish classroom says where an element sits in the table. |
| a cell of the periodic table | **casilla** | Added 2026-09-25 with the redrawn atom diagrams. |
| name order vs formula order | formula **cation first**, name **anion first**: *cloruro de sodio*, NaCl | Added 2026-09-25. The English common mistake "writing the anion first because it sounds first" was removed, since in English the cation is said first. In Spanish the trap is real, but an overlay must keep the English list lengths, so the point lives in takeaway 2 of *Writing Ionic Formulas* instead. |
| significant figures | **cifras significativas** | Added 2026-09-25. The rule is phrased *al mismo número de cifras significativas que el dato menos preciso*, not a fixed three. |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet. The IR sentence now points to *una tabla de IR*, and the polyatomic-ion table is headed *Los iones poliatómicos más habituales*. |

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

**Example card 1 (C-12): description**

English:

> the standard all other masses are measured against

Spanish, new:

> el patrón con el que se comparan todas las demás masas

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

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put.

Spanish, new:

> El número atómico es cuántos protones tiene un átomo, y es lo que fija de qué elemento se trata. El número másico es protones más neutrones. Toda esta chuleta va de que el segundo número cambia mientras el primero se queda quieto.

Spanish, before:

> El número atómico es cuántos protones tiene un átomo, y es lo que fija de qué elemento se trata. El número másico es protones más neutrones. Toda esta chuleta va de que el segundo número cambia mientras el primero se queda quieto. Los dos términos son una ampliación: el currículo de estos cursos no nombra ninguno, y sin ellos aquí no funciona nada.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

Spanish, new:

> Algunos núcleos son inestables. Se desintegran por su cuenta, emiten radiación y dejan detrás un átomo más estable. El radón-222 expulsa una partícula alfa, que son dos protones y dos neutrones juntos. El yodo-131 emite una partícula beta, que es un electrón rápido salido del núcleo. El cobalto-60 emite radiación beta y gamma, y se usa por su radiación gamma, que es energía y no una partícula. Un papel detiene la alfa y una lámina de aluminio detiene la beta. Nada detiene del todo la gamma: el plomo o el hormigón grueso la atenúan mucho.

Spanish, before:

> Algunos núcleos son inestables. Se desintegran por su cuenta, emiten radiación y dejan detrás un átomo más estable. El radón-222 expulsa una partícula alfa, que son dos protones y dos neutrones juntos. El yodo-131 emite una partícula beta, que es un electrón rápido salido del núcleo. El cobalto-60 emite radiación gamma, que es energía y no una partícula. Un papel detiene la alfa, una lámina de aluminio detiene la beta, y la gamma necesita plomo u hormigón grueso.

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


### Acids & Bases

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

Spanish, new:

> Neutro: pH 7 a 25 °C; el agua pura y las disoluciones de sales como el NaCl.

Spanish, before:

> Neutro: pH 7 a 25 °C; el agua pura y la mayoría de las sales.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

Spanish, new:

> Cada escalón de la escala de pH es un factor 10 en la concentración de H+: a pH 2 la concentración de H+ es 100 veces la de pH 4.

Spanish, before:

> Cada escalón de la escala de pH es un factor 10 en la concentración de H+: un pH 2 es 100 veces más ácido que un pH 4.

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

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons).

Spanish, new:

> Los átomos se enlazan para conseguir una capa externa completa y estable (una configuración de gas noble). En un elemento representativo, la última cifra del número de grupo te dice cuántos electrones de valencia tiene (el Cl está en el grupo 17: 7 electrones de valencia).

Spanish, before:

> Los átomos se enlazan para conseguir una capa externa completa y estable (una configuración de gas noble). El número del grupo te dice cuántos electrones de valencia tiene un elemento representativo.

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

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17). Add one electron per negative charge, remove one per positive charge.

Spanish, new:

> Electrones de valencia = última cifra del número de grupo para los elementos representativos (H 1, C 4, N 5, O 6, halógenos 7; el nitrógeno está en el grupo 15 y el cloro en el 17). Suma un electrón por cada carga negativa y quita uno por cada carga positiva.

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

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

Spanish, new:

> Metano: el carbono comparte sus cuatro electrones desapareados

Spanish, before:

> Metano: el carbono comparte sus cuatro impares

- [ ] OK   Comment:


### Naming Organic Compounds

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

## Italian (it): 67 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-it.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 anni*. The SI space starts at five digits (*65 000*); a four-digit number may stand unseparated, and it is what the isotopes prose already printed. |
| electron shell (the curriculum's word) | **guscio elettronico** | VC2S10U07 says "electron shells", so the sheet names *guscio* once as the word the reader's teacher uses, and keeps *livello di energia* as its own term. Since 2026-09-25 the sentence credits the word to the teacher alone (*Chi ti insegna può chiamarli gusci*); it no longer mentions the programma. |
| valence electrons from the group number | **l’ultima cifra del numero del gruppo** (*il Cl è nel gruppo 17: 7 elettroni di valenza*) | Added 2026-09-25. The sheets number the groups 1–18, where *numero del gruppo = elettroni di valenza* only holds for groups 1 and 2. Some Italian textbooks still print the I–VIII A-group numbering, where the plain rule works; the last-digit rule is correct in both. **Rated medium**: a teacher using an older book may prefer to name the Roman numeral too. |
| beta decay | **decadimento beta** | Added 2026-09-25, for how reactors make neptunium and plutonium. Matches *particella beta*; *decadimento* is the school word, not *disintegrazione*. |
| shielding gamma ("reduces, never stops") | **attenuare**: *il piombo o il cemento spesso la attenuano molto* | Added 2026-09-24. *Attenuazione* is the textbook word for gamma passing through matter; alpha and beta keep *fermare*. |
| electron cloud (diagram label) | **nube elettronica** | Added 2026-09-25 with the redrawn atom diagrams. *Nuvola elettronica* is also in circulation; *nube* is the textbook form and is shorter. The old alt text said *nuvola sfumata*; the new one follows the label. |
| not to scale (diagram caveat) | **Non in scala**, and the ratio as **1/100 000 del diametro dell’atomo** | Added 2026-09-25 with the redrawn atom diagrams. Says *diametro*, because by volume the ratio is about 10⁻¹⁵. |
| heavier, but first / lighter, but second (06) | **più pesante, ma viene prima** / **più leggero, ma viene dopo** | Added 2026-09-25 with the redrawn atom diagrams. *Venire prima / dopo* is the natural Italian for a place in a sequence. |
| a cell of the periodic table | **casella** | Added 2026-09-25 with the redrawn atom diagrams. |
| name order vs formula order | formula **cation first**, name **anion first**: *cloruro di sodio*, NaCl | Added 2026-09-25. The English common mistake "writing the anion first because it sounds first" was removed, since in English the cation is said first. In Italian the trap is real, but an overlay must keep the English list lengths, so the point lives in takeaway 2 of *Writing Ionic Formulas* instead. |
| significant figures | **cifre significative** | Added 2026-09-25. The rule is phrased *allo stesso numero di cifre significative del dato meno preciso*, not a fixed three. |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet. The IR sentence now points to *una tabella IR*, and the polyatomic-ion table is headed *Gli ioni poliatomici più comuni*. |

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

**Example card 1 (C-12): description**

English:

> the standard all other masses are measured against

Italian, new:

> lo standard con cui si confrontano tutte le altre masse

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

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put.

Italian, new:

> Il numero atomico è quanti protoni ha un atomo, ed è ciò che fissa di quale elemento si tratta. Il numero di massa è protoni più neutroni. Tutto questo bigino parla del secondo numero che cambia mentre il primo resta fermo.

Italian, before:

> Il numero atomico è quanti protoni ha un atomo, ed è ciò che fissa di quale elemento si tratta. Il numero di massa è protoni più neutroni. Tutto questo bigino parla del secondo numero che cambia mentre il primo resta fermo. I due termini sono un ampliamento: il programma di questi anni non ne nomina nessuno, e senza di essi qui non funziona niente.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

Italian, new:

> Alcuni nuclei sono instabili. Decadono da soli, emettono radiazione e lasciano dietro di sé un atomo più stabile. Il radon-222 scaglia fuori una particella alfa, cioè due protoni e due neutroni insieme. Lo iodio-131 emette una particella beta, cioè un elettrone veloce uscito dal nucleo. Il cobalto-60 emette radiazione beta e gamma, e si usa per la gamma, che è energia e non una particella. Un foglio di carta ferma l’alfa e una lamina di alluminio ferma la beta. Niente ferma del tutto la gamma: il piombo o il cemento spesso la attenuano molto.

Italian, before:

> Alcuni nuclei sono instabili. Decadono da soli, emettono radiazione e lasciano dietro di sé un atomo più stabile. Il radon-222 scaglia fuori una particella alfa, cioè due protoni e due neutroni insieme. Lo iodio-131 emette una particella beta, cioè un elettrone veloce uscito dal nucleo. Il cobalto-60 emette radiazione gamma, che è energia e non una particella. Un foglio di carta ferma l’alfa, una lamina di alluminio ferma la beta, e la gamma richiede piombo o cemento spesso.

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


### Acids & Bases

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

Italian, new:

> Neutro: pH 7 a 25 °C; l’acqua pura e le soluzioni di sali come NaCl.

Italian, before:

> Neutro: pH 7 a 25 °C; l’acqua pura e quasi tutti i sali.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

Italian, new:

> Ogni gradino della scala del pH è un fattore 10 nella concentrazione di H+: a pH 2 la concentrazione di H+ è 100 volte quella a pH 4.

Italian, before:

> Ogni gradino della scala del pH è un fattore 10 nella concentrazione di H+: un pH 2 è 100 volte più acido di un pH 4.

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

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons).

Italian, new:

> Gli atomi si legano per raggiungere un guscio esterno completo e stabile (una configurazione da gas nobile). In un elemento rappresentativo, l’ultima cifra del numero del gruppo ti dice quanti elettroni di valenza ha (il Cl è nel gruppo 17: 7 elettroni di valenza).

Italian, before:

> Gli atomi si legano per raggiungere un guscio esterno completo e stabile (una configurazione da gas nobile). Il numero del gruppo ti dice quanti elettroni di valenza ha un elemento rappresentativo.

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

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17). Add one electron per negative charge, remove one per positive charge.

Italian, new:

> Elettroni di valenza = ultima cifra del numero del gruppo per gli elementi rappresentativi (H 1, C 4, N 5, O 6, alogeni 7; l’azoto è nel gruppo 15 e il cloro nel 17). Aggiungi un elettrone per ogni carica negativa e togline uno per ogni carica positiva.

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

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

Italian, new:

> Metano: il carbonio condivide i suoi quattro elettroni spaiati

Italian, before:

> Metano: il carbonio condivide i suoi quattro dispari

- [ ] OK   Comment:


### Naming Organic Compounds

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

## Russian (ru): 66 strings

### New or changed glossary decisions

These are the word choices the text follows. They are in `docs/i18n/glossary-ru.md`.

| English | Choice | Reason |
|---|---|---|
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 лет*. Russian typesetting writes four-digit numbers solid and groups from five digits on (*65 000*). |
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
| name order vs formula order | formula **cation first**, name **anion first**: *хлорид натрия*, NaCl | Added 2026-09-25. The English common mistake "writing the anion first because it sounds first" was removed, since in English the cation is said first. In Russian the trap is real, but an overlay must keep the English list lengths, so the point lives in takeaway 2 of *Writing Ionic Formulas* instead. |
| significant figures | **значащие цифры** | Added 2026-09-25. The stoichiometry sheet phrases the rule as *столько значащих цифр, сколько их в наименее точном из данных значений*, not a fixed three. Russian school chemistry drills this less than the English-speaking systems do, but the term and the rule are the physics-class ones. **Rated medium.** |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet (the sheets had called it *справочник VCE*). The IR sentence now points to *таблицы ИК-спектроскопии*, and the polyatomic-ion table is headed *Основные многоатомные ионы*. |

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

**Example card 1 (C-12): description**

English:

> the standard all other masses are measured against

Russian, new:

> эталон, с которым сравнивают все остальные массы

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

> The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put.

Russian, new:

> Атомный номер — это сколько у атома протонов, и именно он задаёт элемент. Массовое число — это протоны плюс нейтроны. Вся эта шпаргалка про то, как меняется второе число, пока первое остаётся на месте.

Russian, before:

> Атомный номер — это сколько у атома протонов, и именно он задаёт элемент. Массовое число — это протоны плюс нейтроны. Вся эта шпаргалка про то, как меняется второе число, пока первое остаётся на месте. Оба понятия — расширение: школьная программа этих классов не называет ни одного из них, а без них здесь ничего не сходится.

- [ ] OK   Comment:

**Paragraph of section “Unstable nuclei, and the three kinds of radiation”**

English:

> Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out beta and gamma radiation, and it is used for its gamma, which is energy rather than a particle. Paper stops alpha and a sheet of aluminium stops beta. Nothing stops gamma completely: lead or thick concrete cuts it down a long way.

Russian, new:

> Некоторые ядра неустойчивы. Они распадаются сами по себе, испускают излучение и оставляют после себя более устойчивый атом. Радон-222 выбрасывает альфа-частицу — это два протона и два нейтрона вместе. Иод-131 испускает бета-частицу — быстрый электрон, вылетевший из ядра. Кобальт-60 даёт бета- и гамма-излучение, а применяют его ради гамма-излучения — это энергия, а не частица. Альфа задерживается листом бумаги, бета — алюминиевой пластиной. Гамма-излучение полностью не задерживает ничто: свинец или толстый бетон лишь сильно его ослабляют.

Russian, before:

> Некоторые ядра неустойчивы. Они распадаются сами по себе, испускают излучение и оставляют после себя более устойчивый атом. Радон-222 выбрасывает альфа-частицу — это два протона и два нейтрона вместе. Иод-131 испускает бета-частицу — быстрый электрон, вылетевший из ядра. Кобальт-60 даёт гамма-излучение, а это энергия, а не частица. Альфа задерживается листом бумаги, бета — алюминиевой пластиной, а для гаммы нужен свинец или толстый бетон.

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


### Acids & Bases

**Key takeaway 3**

English:

> Neutral: pH 7 at 25 °C — pure water, and solutions of salts like NaCl.

Russian, new:

> Нейтральная среда: pH 7 при 25 °C — чистая вода и растворы таких солей, как NaCl.

Russian, before:

> Нейтральная среда: pH 7 при 25 °C — чистая вода и большинство солей.

- [ ] OK   Comment:

**Key takeaway 5**

English:

> Each step on the pH scale is a ×10 change in H+ concentration: pH 2 has 100× the H+ concentration of pH 4.

Russian, new:

> Каждая ступень шкалы pH — это изменение концентрации H+ в 10 раз: при pH 2 концентрация H+ в 100 раз больше, чем при pH 4.

Russian, before:

> Каждая ступень шкалы pH — это изменение концентрации H+ в 10 раз: при pH 2 кислотность в 100 раз выше, чем при pH 4.

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

> Atoms bond to reach a stable, full outer shell (a noble-gas configuration). For a main-group element, the last digit of the group number tells you how many valence electrons it has (Cl is in group 17: 7 valence electrons).

Russian, new:

> Атомы соединяются, чтобы получить устойчивый, заполненный внешний уровень — как у благородного газа. Последняя цифра номера группы говорит, сколько у элемента главной подгруппы валентных электронов (Cl в группе 17 — 7 валентных электронов; в короткой таблице это VII группа).

Russian, before:

> Атомы соединяются, чтобы получить устойчивый, заполненный внешний уровень — как у благородного газа. Номер группы говорит, сколько у элемента главной подгруппы валентных электронов.

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

> Valence electrons = the last digit of the group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7 — nitrogen is in group 15, chlorine in group 17). Add one electron per negative charge, remove one per positive charge.

Russian, new:

> Число валентных электронов у элементов главных подгрупп равно последней цифре номера группы (H 1, C 4, N 5, O 6, галогены 7; азот стоит в группе 15, хлор — в группе 17). За каждый минус заряда прибавь электрон, за каждый плюс отними.

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

**Example card 2 in section “Year 10 essentials”: name**

English:

> Methane — carbon shares all four loners

Russian, new:

> Метан — углерод делится всеми четырьмя неспаренными электронами

Russian, before:

> Метан — углерод делится всеми четырьмя одиночками

- [ ] OK   Comment:


### Naming Organic Compounds

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

