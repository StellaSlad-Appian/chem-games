// src/i18n/cheat-sheets/de.ts
//
// German prose for the cheat sheets. See src/i18n/cheat-sheets.ts for how this
// overlays onto the English structure and why it is shaped this way.
//
// Terminology follows docs/i18n/glossary-de.md. The decisions that matter most
// here, because they recur:
//
//   Aggregatzustand (state of matter) · Edukte / Produkte (reactants /
//   products) · eine Gleichung ausgleichen (to balance an equation) ·
//   Koeffizient vs. Index (coefficient vs. subscript — German "Index" is the
//   subscript, which is exactly the distinction this topic turns on) ·
//   Atombindung (covalent bond) · Ionenbindung · Metallbindung ·
//   Verhältnisformel (the formula of an ionic compound — German school
//   chemistry insists this is not a "Molekülformel") · freies Elektronenpaar
//   (lone pair) · Lewis-Formel (Lewis structure) · mehratomiges Ion
//   (polyatomic ion) · relative Atommasse · molare Masse · Stoffmenge (amount
//   of substance, n) · Ausbeute (yield).
//
// Register: informal "du", school-level vocabulary, German typography („…“,
// – for parenthetical dashes, non-breaking space before units).
//
// Not translated anywhere in this file: formulae, element symbols, state
// symbols, charges, and IUPAC suffixes/prefixes (-ol, -al, hypo-, per-) where
// the point of the sentence *is* the English-language IUPAC affix.
//
// **This file carries no `curriculumRef` and no resource descriptions.** Both
// were here until 2026-09-20 and both were translated: the curriculum line
// cites one Australian state's syllabus, and every linked resource is an
// English-language page. Translating them put material in front of a student
// that the student cannot use. `src/i18n/cheat-sheets.ts` now withholds both
// from every locale but English, and the note there says why; the follow-up
// research is in docs/i18n/README.md § Locale-appropriate content.

import { POLYATOMIC_ION_TABLE } from '@/lib/cheat-sheet-data';
import type { CheatSheetOverlaySet } from '../cheat-sheets';

// ---------------------------------------------------------------------------
// The polyatomic-ion table is generated from the ion registry, so its German
// rows are generated too rather than transcribed — that way adding an ion in
// the registry cannot leave a half-translated table behind.
// ---------------------------------------------------------------------------

const POLYATOMIC_ION_NAMES_DE: Record<string, string> = {
  Ammonium: 'Ammonium',
  Acetate: 'Acetat',
  'Ethanoate (acetate)': 'Ethanoat (Acetat)',
  Hydroxide: 'Hydroxid',
  Nitrate: 'Nitrat',
  Nitrite: 'Nitrit',
  Sulfate: 'Sulfat',
  Sulfite: 'Sulfit',
  Carbonate: 'Carbonat',
  Phosphate: 'Phosphat',
  'Dihydrogen Phosphate': 'Dihydrogenphosphat',
  'Hydrogen Phosphate': 'Hydrogenphosphat',
  Perchlorate: 'Perchlorat',
  Chlorate: 'Chlorat',
  Chlorite: 'Chlorit',
  Hypochlorite: 'Hypochlorit',
  Permanganate: 'Permanganat',
  Chromate: 'Chromat',
  Dichromate: 'Dichromat',
  Thiosulfate: 'Thiosulfat',
  Peroxide: 'Peroxid',
  Oxalate: 'Oxalat',
  Cyanide: 'Cyanid',
  'Dihydrogen Borate': 'Dihydrogenborat',
  'Trihydrogen Silicate': 'Trihydrogensilicat',
  Hydrosulfide: 'Hydrogensulfid',
  'Hydrogen carbonate (bicarbonate)': 'Hydrogencarbonat',
  'Hydrogen sulfite (bisulfite)': 'Hydrogensulfit',
  'Hydrogen sulfate (bisulfate)': 'Hydrogensulfat',
};

const polyatomicIonRowsDe = POLYATOMIC_ION_TABLE.rows.map((row) => [
  POLYATOMIC_ION_NAMES_DE[row[0]] ?? row[0],
  // Column 1 is the formula (listed in formulaColumns) and column 2 is the
  // charge; both are notation and are passed through untouched.
  row[1],
  row[2],
]);

// ---------------------------------------------------------------------------

export const CHEAT_SHEET_OVERLAY_DE: CheatSheetOverlaySet = {
  'atomic-structure': {
    title: 'Atome und das Periodensystem',
    summary:
      'Woraus ein Atom besteht, warum die Ordnungszahl das Element festlegt und was die Anordnung des Periodensystems vorhersagt.',
    keyTakeaways: [
      'Ein Atom besteht aus einem Kern aus Protonen und Neutronen, um den herum sich Elektronen verteilen.',
      'Die Zahl der Protonen – die Ordnungszahl – macht ein Atom zu diesem Element. Ändere sie, und du hast ein anderes Element.',
      'Elektronen sitzen in Energiestufen. Wie viele in der äußersten sitzen, entscheidet, in welcher Gruppe (Spalte) ein Element steht.',
      'Eine Gruppe ist eine Spalte, eine Periode eine Zeile. Elemente einer Gruppe haben außen gleich viele Elektronen und reagieren deshalb ähnlich.',
      'Metalle stehen links, Nichtmetalle rechts. Atome werden nach rechts kleiner und nach unten größer.',
      'Ein Atom ist fast vollständig leerer Raum. Jedes Bild davon stimmt im Maßstab nicht, auch die hier.',
    ],
    formulaExampleNames: [
      'Chlor-35',
      'Chlor-37',
      'Wasserstoff-Ion',
    ],
    formulaExampleDescriptions: [
      '17 Protonen, 18 Neutronen',
      '17 Protonen, 20 Neutronen',
      'ein Wasserstoffatom, das sein einziges Elektron abgegeben hat – also nur noch ein Proton',
    ],
    sections: [
      {
        heading: 'Woraus ein Atom besteht',
        content:
          'Ein Atom hat einen Kern aus Protonen und Neutronen, um den herum Elektronen sind. Protonen tragen eine positive Ladung, Elektronen eine gleich große negative. Ein neutrales Atom hat deshalb von beiden gleich viele. Neutronen tragen keine Ladung. Fast die ganze Masse steckt im Kern, denn ein Elektron wiegt neben einem Proton so gut wie nichts.',
        imageAlt:
          'Ein Atom: ein Kern aus drei Protonen (gefüllte Kreise) und vier Neutronen (hohle Kreise), darum eine Elektronenwolke, die direkt am Kern am dichtesten ist und nach außen ohne Rand immer dünner wird. Mit drei Protonen und vier Neutronen wäre es Lithium-7, die Abbildung steht aber für jedes Atom. Beschriftet sind die Elektronenwolke, der Atomkern, ein Proton und ein Neutron. Ein Hinweis sagt, dass nichts maßstabsgetreu ist: Der Kern hat nur etwa 1/100 000 des Atomdurchmessers.',
      },
      {
        heading: 'Ordnungszahl und Massenzahl',
        content:
          'Die Ordnungszahl ist die Zahl der Protonen, und sie macht ein Atom zu diesem Element. Jedes Chloratom hat 17 Protonen; alles mit 17 Protonen ist Chlor. Die Massenzahl ist Protonen plus Neutronen. Die Zahl der Neutronen kann sich ändern, ohne dass sich das Element ändert.',
        exampleNames: ['Chlor-35', 'Chlor-37'],
        imageAlt:
          'Das Symbol für Chlor-35: die Massenzahl 35 über der Ordnungszahl 17, links neben Cl. Eine Linie verbindet die 35 mit „Massenzahl = Protonen + Neutronen“, eine zweite die 17 mit „Ordnungszahl = Protonen“. Darunter steht 35 − 17 = 18 Neutronen.',
      },
      {
        heading: 'Elektronen, Energiestufen und die Form des Periodensystems',
        content:
          'Elektronen besetzen Energiestufen um den Kern. Die erste fasst bis zu 2, die nächste bis zu 8, dann wieder 8 bei den ersten zwanzig Elementen. Deine Lehrkraft sagt dazu vielleicht Schalen – gemeint ist dasselbe. Elektronen so zu zählen heißt bohrsches Atommodell: nützlich, und kein Bild eines echten Atoms. Wie viele in der äußersten Stufe sitzen, bestimmt, wie ein Atom reagiert. Elemente stehen in derselben Gruppe, wenn sie außen gleich viele haben. Deshalb verhält sich eine Gruppe ähnlich.',
        imageAlt:
          'Natrium als Zählmodell: eine Scheibe mit der Aufschrift Na als Kern, darum drei Bänder mit sichtbarem Rand, in denen 2, 8 und 1 Elektronen in unregelmäßigen Winkeln sitzen. Das einzelne Elektron im äußersten Band ist eingekreist und mit „äußerste Stufe“ beschriftet. Darunter die Anordnung 2, 8, 1 und die Summe, 11 Elektronen. Ein Hinweis sagt, dass es eine Art ist, Elektronen zu zählen, und kein Bild eines Atoms.',
      },
      {
        heading: 'Gruppen und Perioden',
        content:
          'Eine Gruppe ist eine Spalte des Periodensystems, eine Periode eine Zeile. Elemente einer Gruppe haben gleich viele Elektronen in der äußersten Stufe. Die Spalte sagt dir also vorher, wie ein Element reagiert. Gruppe 1 sind die Alkalimetalle, Gruppe 17 die Halogene und Gruppe 18 die Edelgase. Die Periode sagt, wie viele Energiestufen benutzt werden: Ein Element der 3. Periode benutzt drei davon. Mit jeder neuen Zeile nach unten werden die Atome deshalb größer.',
      },
      {
        heading: 'Metalle und Nichtmetalle',
        content:
          'Metalle füllen die linke Seite und die Mitte des Periodensystems, Nichtmetalle stehen oben rechts. Ein Metall leitet Strom und Wärme, hat eine glänzende Oberfläche und lässt sich zu einem Blech hämmern, ohne zu zerspringen. Fast jedes Metall ist bei Raumtemperatur fest; Quecksilber ist das flüssige. Ein Nichtmetall leitet meist schlecht, ist matt und zerbricht, wenn es überhaupt fest ist. Viele Nichtmetalle sind Gase. Ein paar Elemente auf der Treppe dazwischen, zum Beispiel Silicium, verhalten sich teils wie das eine und teils wie das andere. Man nennt sie Halbmetalle.',
      },
      {
        heading: 'Atomradius',
        content:
          'Innerhalb einer Periode werden Atome von links nach rechts kleiner. Jeder Schritt bringt ein Proton dazu, und die größere positive Ladung zieht dieselbe äußerste Stufe enger heran. Innerhalb einer Gruppe werden Atome nach unten größer, denn jeder Schritt nach unten beginnt eine neue Energiestufe weiter außen. Die größten Atome stehen also unten links im Periodensystem und die kleinsten oben rechts.',
      },
      {
        heading: 'Reaktivität, und warum sich eine Gruppe ähnlich verhält',
        content:
          'Du kannst eine Gruppe prüfen, indem du ihre Elemente mit Sauerstoff, Wasser und Säuren reagieren lässt. Untereinander verhalten sie sich gleich. Die Metalle der Gruppe 1 reagieren mit Wasser und werden nach unten heftiger: Lithium zischt, Natrium flitzt herum, Kalium fängt Feuer. Dieselben Metalle geben mit einer Säure Wasserstoff ab, und das noch schneller – viel zu heftig für einen Schulversuch. Die Elemente der Gruppe 17 laufen andersherum und werden nach unten reaktionsträger. Gruppe 18 hat die äußerste Stufe schon voll, deshalb reagieren die Edelgase mit fast nichts.',
      },
      {
        heading: 'Geordnet nach der Ordnungszahl, nicht nach der Masse',
        content:
          'Mendelejew ordnete das Periodensystem nach der Masse, und einige Elemente landeten am falschen Platz. 1913 maß Henry Moseley die Ladung des Kerns und fand die Ordnung, die funktioniert: die Ordnungszahl. Tellur ist schwerer als Iod, steht aber davor, weil es ein Proton weniger hat.',
        imageAlt:
          'Zwei Felder des Periodensystems nebeneinander, mit einem Pfeil vom ersten zum zweiten für die Reihenfolge im Periodensystem. Tellur: Ordnungszahl 52, relative Atommasse 127,60, darunter „schwerer, steht aber vorn“. Iod: Ordnungszahl 53, relative Atommasse 126,90, darunter „leichter, steht aber dahinter“. Im Tellur-Feld sind die beiden Zahlen als Ordnungszahl und relative Atommasse beschriftet.',
      },
    ],
    tables: [
      {
        heading: 'Die drei Kernbausteine und das Elektron',
        columns: ['Teilchen', 'Ladung', 'Relative Masse', 'Wo es sitzt'],
        rows: [
          ['Proton', '+1', '1', 'im Kern'],
          ['Neutron', '0', '1', 'im Kern'],
          ['Elektron', '−1', 'etwa 1/1836', 'um den Kern herum'],
        ],
      },
    ],
    commonMistakes: [
      'Ordnungszahl und Massenzahl verwechseln. Die Ordnungszahl sind die Protonen und benennt das Element. Die Massenzahl sind Protonen plus Neutronen.',
      'Ein Ion für ein anderes Element halten. Ein Elektron abzugeben oder aufzunehmen ändert die Ladung, nicht die Zahl der Protonen. Natrium und Na+ sind beides Natrium.',
    ],
  },
  'isotopes-and-radioactivity': {
    title: 'Isotope und Radioaktivität',
    summary:
      'Was sich ändert, wenn sich die Neutronenzahl ändert: Isotope, Zerfall, Halbwertszeit und die Elemente, die gemacht werden mussten.',
    keyTakeaways: [
      'Isotope sind Atome desselben Elements mit unterschiedlich vielen Neutronen. Chemisch verhalten sie sich gleich.',
      'Ein instabiler Kern zerfällt und gibt Strahlung ab. Zurück bleibt ein stabileres Atom.',
      'Es gibt drei Arten – Alpha, Beta und Gamma. Sie unterscheiden sich darin, was herauskommt und was sie aufhält.',
      'Die Halbwertszeit ist die Zeit, in der die Hälfte einer Probe zerfällt. Nach drei Halbwertszeiten ist ein Achtel übrig.',
      'Halbwertszeiten reichen von Sekunden bis zu Milliarden Jahren. Genau das macht es möglich, die ferne Vergangenheit zu datieren.',
    ],
    formulaExampleNames: [
      'Kohlenstoff-12',
      'Radon-222',
      'Iod-131',
      'Cobalt-60',
      'Kohlenstoff-14',
      'Uran-238',
    ],
    formulaExampleDescriptions: [
      'der Standard, an dem alle anderen Massen gemessen werden',
      'zerfällt und gibt dabei ein Alphateilchen ab',
      'zerfällt und gibt dabei ein Betateilchen ab',
      'gibt Beta- und Gammastrahlung ab – genutzt wird die Gammastrahlung',
      'Halbwertszeit etwa 5730 Jahre',
      'Halbwertszeit etwa 4,5 Milliarden Jahre',
    ],
    sections: [
      {
        heading: 'Die zwei Zahlen, die dieser Spickzettel braucht',
        content:
          'Die Ordnungszahl ist die Zahl der Protonen, und sie legt fest, welches Element es ist. Die Massenzahl ist Protonen plus Neutronen. Auf diesem Spickzettel geht es überall darum, dass sich die zweite Zahl ändert und die erste bleibt.',
      },
      {
        heading: 'Isotope',
        content:
          'Isotope sind Atome eines Elements mit unterschiedlich vielen Neutronen. Chemie machen die Elektronen, und davon haben Isotope gleich viele. Sie reagieren also gleich. Unterschiedlich sind die Masse und manchmal die Stabilität: Manche Isotope sind radioaktiv, andere nicht.',
        imageAlt:
          'Drei Wasserstoffatome untereinander. Jedes hat ein Proton (gefüllter Kreis) und ein Elektron in einem unscharfen Bereich um den Kern. Wasserstoff-1 (Protium) hat kein Neutron, Wasserstoff-2 (Deuterium) eines und Wasserstoff-3 (Tritium) zwei (leere Kreise). Wasserstoff-1 und Wasserstoff-2 sind als stabil beschriftet, Wasserstoff-3 als radioaktiv. Beschriftungen benennen Elektron, Proton und Neutron.',
      },
      {
        heading: 'Instabile Kerne und die drei Arten von Strahlung',
        content:
          'Manche Kerne sind instabil. Sie zerfallen von selbst, geben Strahlung ab und lassen ein stabileres Atom zurück. Radon-222 schleudert ein Alphateilchen heraus, also zwei Protonen und zwei Neutronen zusammen. Iod-131 gibt ein Betateilchen ab, also ein schnelles Elektron aus dem Kern. Cobalt-60 gibt Beta- und Gammastrahlung ab und wird wegen der Gammastrahlung eingesetzt. Sie ist Energie statt eines Teilchens. Papier hält Alpha auf, ein Blech aus Aluminium hält Beta auf. Gammastrahlung lässt sich nie ganz aufhalten: Blei oder dicker Beton schwächen sie stark ab.',
      },
      {
        heading: 'Halbwertszeit',
        content:
          'Die Halbwertszeit ist die Zeit, in der die Hälfte einer Probe zerfällt. Nach einer Halbwertszeit ist die Hälfte übrig, nach zweien ein Viertel und nach dreien ein Achtel. Für jedes Isotop liegt sie fest: Erhitzen oder eine Reaktion ändern nichts daran. Kohlenstoff-14 hat eine Halbwertszeit von etwa 5730 Jahren. Uran-238 hat eine von etwa 4,5 Milliarden Jahren, und deshalb steckt überhaupt noch Uran im Boden.',
        imageAlt:
          'Eine Zerfallskurve: die noch nicht zerfallenen Kerne gegen die Zeit in Halbwertszeiten. Sie fällt von 100 Prozent auf 50, 25, 12,5 und 6,25 Prozent nach einer, zwei, drei und vier Halbwertszeiten, mit einer gestrichelten Linie hinunter zur Zeitachse an jedem Punkt, und fällt danach weiter, ohne null zu erreichen.',
      },
      {
        heading: 'Die Vergangenheit datieren, und 65 000 Jahre in Australien',
        content:
          'Kohlenstoff-14 entsteht hoch oben in der Luft und landet in jedem Lebewesen. Stirbt etwas, nimmt es keinen mehr auf, und der vorhandene Kohlenstoff-14 zerfällt. Wie viel davon übrig ist, datiert den Fund – bis etwa 50 000 Jahre zurück. Älteres braucht eine andere Methode. Die optisch stimulierte Lumineszenz datiert, wann ein Sandkorn zuletzt Tageslicht gesehen hat, und sie reicht viel weiter zurück. In Madjedbebe, einem Felsdach auf Mirarr Country im Northern Territory, wurden beide Methoden an denselben Schichten angewendet. Sie belegen, dass die indigenen Völker Australiens und die Torres-Strait-Insulaner seit mindestens 65 000 Jahren auf dem australischen Kontinent leben.',
      },
      {
        heading: 'Radioaktivität in Medizin und Technik',
        content:
          'Strahlung ist nützlich, weil sie durch feste Dinge hindurchgeht und sich richten lässt. In der Medizin verfolgt man eine kleine Menge eines kurzlebigen Isotops durch den Körper, um einen Tumor zu finden. Eine große, gebündelte Dosis tötet Krebszellen ab, und Cobalt-60 ist eine der Quellen dafür. In der Technik durchleuchtet man Teile für Flugzeuge und Raumfahrzeuge mit Gammastrahlung. Ein Riss zeigt sich auf dem Film dahinter, ohne dass jemand das Teil aufschneiden muss.',
      },
      {
        heading: 'Elemente, die gemacht werden mussten',
        content:
          'Elemente nach Uran haben keine stabilen Isotope und kommen in der Natur höchstens in winzigen Spuren vor. Die ersten, zum Beispiel Plutonium, entstehen in Kernreaktoren: Uran fängt dort Neutronen ein, und durch Betazerfall wird daraus erst Neptunium, dann Plutonium. Die schwereren werden in Beschleunigern gebaut, indem man einen Kern auf einen anderen schießt, manchmal wenige Atome auf einmal. Viele halten weniger als eine Sekunde durch und zerfallen dann. So wurden die unteren Zeilen des Periodensystems gefüllt.',
      },
    ],
  },
  'states-of-matter': {
    title: 'Aggregatzustände',
    summary: 'Teilchenanordnung, kinetische Energie und die sechs Zustandsänderungen.',
    keyTakeaways: [
      'Feststoffe: Die Teilchen schwingen an festen Plätzen – feste Form und festes Volumen.',
      'Flüssigkeiten: Die Teilchen gleiten aneinander vorbei – festes Volumen, die Form passt sich dem Gefäß an.',
      'Gase: Die Teilchen bewegen sich frei und sind weit voneinander entfernt – sie füllen jedes Gefäß und lassen sich leicht zusammendrücken.',
      'Die Temperatur ist ein Maß für die mittlere kinetische Energie der Teilchen.',
      'Während einer Zustandsänderung bleibt die Temperatur konstant: Die Energie wird gebraucht, um Anziehungskräfte zwischen den Teilchen zu lösen oder zu bilden, nicht um die Teilchen schneller zu machen.',
    ],
    formulaExampleNames: [
      'Eis (fest)',
      'Wasser (flüssig)',
      'Wasserdampf (gasförmig)',
      'Gelöstes Salz (in Wasser gelöst)',
    ],
    sections: [
      {
        heading: 'Zustandssymbole in Gleichungen',
        content:
          'Jeder Stoff in einer chemischen Gleichung trägt ein Zustandssymbol: (s) fest, (l) flüssig, (g) gasförmig, (aq) in Wasser gelöst. „Wässrig“ ist kein vierter Aggregatzustand – es bedeutet, dass ein Stoff in flüssigem Wasser gelöst ist.',
      },
      {
        heading: 'Erwärmungs- und Abkühlkurven',
        content:
          'In einer Erwärmungskurve sind die waagerechten Abschnitte die Zustandsänderungen (Schmelzen, Sieden). Die ansteigenden Abschnitte zeigen einen Aggregatzustand, der sich erwärmt. Der waagerechte Abschnitt beim Sieden ist länger als beim Schmelzen, weil das vollständige Trennen der Teilchen mehr Energie braucht als das bloße Lockern.',
      },
    ],
    tables: [
      {
        heading: 'Die sechs Zustandsänderungen',
        columns: ['Änderung', 'Von → Nach', 'Energie'],
        rows: [
          ['Schmelzen', 'fest → flüssig', 'wird aufgenommen'],
          ['Erstarren', 'flüssig → fest', 'wird frei'],
          ['Verdunsten / Sieden', 'flüssig → gasförmig', 'wird aufgenommen'],
          ['Kondensieren', 'gasförmig → flüssig', 'wird frei'],
          ['Sublimieren', 'fest → gasförmig', 'wird aufgenommen'],
          ['Resublimieren', 'gasförmig → fest', 'wird frei'],
        ],
      },
    ],
    commonMistakes: [
      '„Teilchen dehnen sich beim Erwärmen aus“ – die Teilchen bleiben gleich groß; nur die Abstände zwischen ihnen werden größer.',
      'Zu glauben, die Blasen in kochendem Wasser seien Luft – es ist Wasserdampf.',
      'Verdunsten (an der Oberfläche, bei jeder Temperatur) mit Sieden (im ganzen Volumen, am Siedepunkt) zu verwechseln.',
    ],
  },

  'acids-and-bases': {
    title: 'Säuren und Basen',
    summary: 'pH-Wert, Protonendonatoren und -akzeptoren, stark gegen schwach, und die Neutralisation.',
    keyTakeaways: [
      'Säure: ein Protonendonator (gibt H+ ab). In Wasser entstehen Oxonium-Ionen, H3O+. pH < 7.',
      'Base: ein Protonenakzeptor. Lösliche Basen (Laugen) geben in Wasser Hydroxid-Ionen, OH-, ab. pH > 7.',
      'Neutral: pH 7 bei 25 °C – reines Wasser und Lösungen von Salzen wie NaCl.',
      'Neutralisation: Säure + Base → Salz + Wasser. Die Ionengleichung ist immer H+ + OH- → H2O.',
      'Jede Stufe auf der pH-Skala bedeutet den Faktor 10 in der H+-Konzentration: Bei pH 2 ist die H+-Konzentration 100-mal so groß wie bei pH 4.',
    ],
    formulaExampleNames: [
      'Salzsäure (stark)',
      'Essigsäure (schwach)',
      'Natriumhydroxid (starke Base)',
      'Ammoniak (schwache Base)',
    ],
    sections: [
      {
        heading: 'Stark und schwach ist nicht dasselbe wie konzentriert und verdünnt',
        content:
          'Starke Säuren sind in Wasser vollständig protolysiert (HCl, HNO3, H2SO4). Schwache Säuren nur teilweise (CH3COOH, H2CO3). „Konzentriert“ und „verdünnt“ sagen, wie viel Säure gelöst ist, nicht wie viel davon protolysiert – es gibt verdünnte starke Säuren und konzentrierte schwache Säuren.',
        exampleNames: ['Protolyse einer starken Säure', 'Neutralisation'],
      },
      {
        heading: 'Reaktionen von Säuren, die du erkennen musst',
        content:
          'Säure + Metall → Salz + Wasserstoff. Säure + Metallcarbonat → Salz + Wasser + Kohlenstoffdioxid. Säure + Metalloxid oder -hydroxid → Salz + Wasser. Das Salz bekommt seinen Namen vom Metall und von der Säure (Salzsäure → Chlorid, Schwefelsäure → Sulfat, Salpetersäure → Nitrat).',
        exampleNames: ['Säure + Metall', 'Säure + Carbonat'],
      },
    ],
    tables: [
      {
        heading: 'Orientierungspunkte auf der pH-Skala',
        columns: ['pH', 'Beispiel', 'Farbe des Universalindikators'],
        rows: [
          ['0–2', 'Magensäure, Batteriesäure', 'Rot'],
          ['3–6', 'Essig, Zitronensaft, Limonade', 'Orange → Gelb'],
          ['7', 'Reines Wasser', 'Grün'],
          ['8–11', 'Natron, Meerwasser, Seife', 'Blau'],
          ['12–14', 'Backofenreiniger, Rohrreiniger', 'Violett'],
        ],
      },
    ],
    commonMistakes: [
      'Zu schreiben, Säuren „enthalten“ H+ – sie geben H+ (als H3O+) erst ab, wenn sie in Wasser gelöst sind.',
      'Anzunehmen, alle Basen enthielten OH – Ammoniak (NH3) ist eine Base, weil es ein Proton aufnimmt.',
      'Zu glauben, die pH-Skala höre bei 0 und 14 auf – sehr konzentrierte Lösungen liegen auch darüber hinaus.',
    ],
  },

  'balancing-equations': {
    title: 'Chemische Gleichungen ausgleichen',
    summary:
      'Erhaltung der Masse: gleiche Atome hinein, gleiche Atome heraus – ändere Koeffizienten, niemals Indizes.',
    keyTakeaways: [
      'Bei einer Reaktion werden Atome nur neu angeordnet, nie erzeugt oder vernichtet – von jedem Element muss auf beiden Seiten die gleiche Anzahl stehen.',
      'Koeffizienten (die großen Zahlen davor) gelten für die ganze Formel. Indizes (die kleinen tiefgestellten Zahlen darin) legen den Stoff fest und dürfen nie verändert werden.',
      'Gleiche ein Element nach dem anderen aus; lass Wasserstoff und Sauerstoff zum Schluss; behandle ein mehratomiges Ion als Einheit, wenn es auf beiden Seiten unverändert vorkommt.',
      'Die Koeffizienten sollen das kleinstmögliche ganzzahlige Verhältnis sein.',
      'Schreib in die fertige Gleichung immer die Zustandssymbole.',
    ],
    formulaExampleNames: [
      'Nicht ausgeglichen (noch ohne Zustandssymbole)',
      'Ausgeglichen',
      'Mit einem mehratomigen Ion als Einheit',
    ],
    sections: [
      {
        heading: 'Ein Verfahren, das immer funktioniert',
        content:
          '1. Schreib für jedes Edukt und jedes Produkt die richtige Formel auf. 2. Zähle für jedes Element die Atome auf beiden Seiten. 3. Fang mit dem Element an, das in den wenigsten Formeln vorkommt. 4. Ändere nur die Koeffizienten. 5. Wenn ein Bruch herauskommt (z. B. 7/2 O2), multipliziere alles mit 2. 6. Zähle jedes Element noch einmal nach. 7. Ergänze die Zustandssymbole.',
        exampleNames: ['Verbrennung von Propan'],
      },
    ],
    commonMistakes: [
      'H2O zu H2O2 zu machen, um „mehr Sauerstoff zu bekommen“ – das ist ein anderer Stoff.',
      'Zu vergessen, dass ein Koeffizient für jedes Atom der Formel gilt (2Ca(OH)2 enthält 4 H).',
      'Aufzuhören, bevor jedes Element ein zweites Mal geprüft wurde.',
    ],
  },

  'reaction-types': {
    title: 'Reaktionstypen',
    summary:
      'Synthese, Zersetzung, Verbrennung, Verdrängung, Fällung und Neutralisation an ihrem Muster erkennen.',
    keyTakeaways: [
      'Synthese (Vereinigung): Zwei oder mehr Stoffe verbinden sich – A + B → AB.',
      'Zersetzung: Ein Stoff zerfällt – AB → A + B (braucht oft Wärme oder Strom).',
      'Verbrennung: Brennstoff + Sauerstoff → Kohlenstoffdioxid + Wasser (bei einem Kohlenwasserstoff als Brennstoff und vollständiger Verbrennung) – dabei wird Wärme frei.',
      'Einfache Verdrängung: Ein reaktionsfreudigeres Element nimmt den Platz eines weniger reaktionsfreudigen ein – A + BC → AC + B.',
      'Doppelte Verdrängung: Die Ionen tauschen die Partner – AB + CD → AD + CB (Fällung und Neutralisation sind Sonderfälle davon).',
    ],
    formulaExampleNames: [
      'Synthese',
      'Zersetzung',
      'Verbrennung',
      'Einfache Verdrängung',
      'Fällung',
      'Neutralisation',
    ],
    sections: [
      {
        heading: 'So unterscheidest du sie schnell',
        content:
          'Zähle Edukte und Produkte. Ein Produkt aus mehreren Edukten → Synthese. Mehrere Produkte aus einem Edukt → Zersetzung. O2 links, CO2 und H2O rechts → Verbrennung. Ein Element und eine Verbindung tauschen → einfache Verdrängung. Zwei Verbindungen tauschen Ionen → doppelte Verdrängung; entsteht dabei ein Feststoff, ist es eine Fällung; entsteht Wasser aus Säure und Base, ist es eine Neutralisation.',
      },
    ],
    tables: [
      {
        heading: 'Allgemeine Formen',
        columns: ['Typ', 'Allgemeine Form', 'Erkennungszeichen'],
        rows: [
          ['Synthese', 'A + B → AB', 'Weniger Produkte als Edukte'],
          ['Zersetzung', 'AB → A + B', 'Nur ein Edukt'],
          ['Verbrennung', 'Brennstoff + O₂ → CO₂ + H₂O', 'Sauerstoff als Edukt, Wärme wird frei'],
          ['Einfache Verdrängung', 'A + BC → AC + B', 'Element + Verbindung'],
          ['Doppelte Verdrängung', 'AB + CD → AD + CB', 'Zwei Verbindungen tauschen Ionen'],
          ['Fällung', 'Ionen (aq) → Feststoff', 'Ein Produkt (s) aus Edukten (aq)'],
          ['Neutralisation', 'Säure + Base → Salz + Wasser', 'H⁺ + OH⁻ → H₂O'],
        ],
      },
    ],
    commonMistakes: [
      'Jede Reaktion mit Sauerstoff „Verbrennung“ zu nennen – Rosten ist eine langsame Oxidation, keine Verbrennung.',
      'Zu vergessen, dass bei unvollständiger Verbrennung CO oder C (Ruß) statt CO2 entsteht.',
    ],
  },

  'chemical-bonds': {
    title: 'Chemische Bindungen und Strukturen',
    summary:
      'Ionenbindung, Atombindung und Metallbindung – und wie die Struktur die Eigenschaften erklärt.',
    keyTakeaways: [
      'Atome gehen Bindungen ein, um eine stabile, volle Außenschale zu erreichen (Edelgaskonfiguration). Bei den Hauptgruppenelementen sagt dir die letzte Ziffer der Gruppennummer, wie viele Valenzelektronen ein Atom hat (Cl steht in Gruppe 17: 7 Valenzelektronen). Das ist dieselbe Zahl wie die Nummer der Hauptgruppe (Cl: VII. Hauptgruppe).',
      'Ionenbindung: Metall + Nichtmetall. Elektronen werden übertragen; die entstehenden Ionen werden im dreidimensionalen Ionengitter durch elektrostatische Anziehung zusammengehalten.',
      'Atombindung (kovalente Bindung): Nichtmetall + Nichtmetall. Elektronen werden paarweise geteilt; jedes gemeinsame Paar ist eine Bindung.',
      'Metallbindung: Metall-Atomrümpfe in einem Gitter aus Kationen, umgeben von einem „See“ frei beweglicher Elektronen.',
      'Die Eigenschaften folgen aus der Struktur: Gitter sind hart und haben hohe Schmelztemperaturen; kleine Moleküle haben niedrige Schmelztemperaturen, weil zwischen den Molekülen nur schwache Kräfte wirken.',
    ],
    formulaExampleNames: [
      'Ionenverbindung',
      'Molekül mit Atombindungen',
      'Atomgitter (Netzwerk)',
      'Metall',
    ],
    sections: [
      {
        heading: 'Warum Ionenverbindungen erst geschmolzen oder gelöst leiten',
        content:
          'Im festen Gitter sitzen die Ionen fest an ihrem Platz, also kann sich kein geladenes Teilchen bewegen. Beim Schmelzen oder Lösen werden die Ionen frei, und die Flüssigkeit leitet. Metalle leiten in jedem Aggregatzustand, weil ihre frei beweglichen Elektronen immer beweglich sind.',
      },
    ],
    tables: [
      {
        heading: 'Struktur → Eigenschaften',
        columns: ['Typ', 'Teilchen', 'Schmelztemperatur', 'Leitfähig?', 'Beispiel'],
        rows: [
          ['Ionengitter', 'Kationen + Anionen', 'Hoch', 'Nur geschmolzen oder (aq)', 'NaCl, MgO'],
          ['Molekülgitter', 'Moleküle', 'Niedrig', 'Nein', 'H₂O, CO₂'],
          [
            'Atomgitter (Netzwerk)',
            'Atome (alle gebunden)',
            'Sehr hoch',
            'Nein (außer Graphit)',
            'Diamant, SiO₂',
          ],
          [
            'Metallgitter',
            'Kationen + freie e⁻',
            'Hoch (unterschiedlich)',
            'Ja, in jedem Zustand',
            'Cu, Fe, Al',
          ],
        ],
      },
    ],
    commonMistakes: [
      'NaCl ein „Molekül“ zu nennen – es ist ein Gitter; die Formel ist eine Verhältnisformel, kein Molekül.',
      'Atombindungen für schwach zu halten, weil molekulare Stoffe leicht schmelzen – die Bindungen im Molekül sind stark; schwach sind nur die Kräfte zwischen den Molekülen.',
      'Anzunehmen, eine Bindung sei entweder rein ionisch oder rein kovalent – die Differenz der Elektronegativität macht daraus ein fließendes Spektrum.',
    ],
  },

  'chemical-formulas': {
    title: 'Verhältnisformeln von Ionenverbindungen aufstellen',
    summary:
      'Gleiche die Ladungen aus: Kation zuerst, Ladungen über Kreuz, Klammern um mehrfach vorkommende mehratomige Ionen.',
    keyTakeaways: [
      'Eine Ionenverbindung ist insgesamt ungeladen: Die gesamte positive Ladung ist so groß wie die gesamte negative.',
      'Schreib das Kation (Metall oder NH4+) zuerst, dann das Anion.',
      'Kreuzregel: Der Betrag der Ladung des einen Ions wird zum Index des anderen; danach auf das kleinste Verhältnis kürzen.',
      'Ein mehratomiges Ion ist eine Einheit. Brauchst du mehr als eins, setz es in Klammern: Ca(OH)2, nicht CaOH2.',
      'Metalle mit mehreren möglichen Ladungen (Fe, Cu, Pb, Sn) bekommen die Ladung als römische Ziffer in den Namen: Eisen(III) = Fe 3+.',
    ],
    formulaExampleNames: [
      'Aluminiumoxid (3+ und 2−)',
      'Calciumhydroxid (mit Klammern)',
      'Ammoniumsulfat',
      'Eisen(III)-chlorid',
      'Magnesiumoxid (2+ und 2− lässt sich kürzen)',
    ],
    sections: [
      {
        heading: 'Beispiel Schritt für Schritt: Aluminiumsulfat',
        content:
          'Al 3+ und SO4 2−. Über Kreuz: Al bekommt den Index 2, Sulfat den Index 3. Sulfat ist mehratomig und kommt mehrfach vor, also braucht es Klammern: Al2(SO4)3. Probe: 2 × (+3) = +6 und 3 × (−2) = −6. Insgesamt ungeladen.',
        exampleNames: ['Aluminiumsulfat'],
      },
      {
        heading: 'Häufige Ionenladungen aus dem Periodensystem',
        content:
          'Gruppe 1 → +1, Gruppe 2 → +2, Al → +3, Gruppe 17 → −1, Gruppe 16 → −2, N und P → −3. Bei den Nebengruppenmetallen wechselt die Ladung – der Name sagt sie dir. Für mehratomige Ionen benutzt du die Nachschlagetabelle.',
      },
    ],
    commonMistakes: [
      'Zu vergessen zu kürzen: Aus Mg2O2 muss MgO werden.',
      'Klammern um ein einzelnes mehratomiges Ion: NaOH, nicht Na(OH).',
    ],
  },

  'polyatomic-ions': {
    title: 'Mehratomige Ionen',
    summary:
      'Die Nachschlagetabelle – und die Namensmuster, dank derer du viel weniger auswendig lernen musst, als du denkst.',
    keyTakeaways: [
      'Ein mehratomiges Ion ist eine Gruppe von Atomen, die durch Atombindungen zusammenhängt, insgesamt eine Ladung trägt und in Reaktionen als Einheit auftritt.',
      'Das einzige häufige mehratomige Kation ist Ammonium, NH4+ (abgesehen vom Oxonium-Ion H3O+, das dir bei den Säuren begegnet). Alle anderen sind Anionen.',
      'Die Endung „-at“ bedeutet mehr Sauerstoff als „-it“: Sulfat SO4 2− gegenüber Sulfit SO3 2−; Nitrat NO3− gegenüber Nitrit NO2−. Die Ladung bleibt gleich.',
      '„Per-…-at“ hat ein Sauerstoffatom mehr als „-at“, „Hypo-…-it“ eines weniger als „-it“ (Perchlorat ClO4−, Chlorat ClO3−, Chlorit ClO2−, Hypochlorit ClO−).',
      'Ein zusätzliches H+ am Anion macht dessen Ladung um eins weniger negativ und setzt „Hydrogen“ vor den Namen: Carbonat CO3 2− → Hydrogencarbonat HCO3−.',
    ],
    formulaExampleNames: [
      'Natriumnitrat',
      'Kupfer(II)-sulfat',
      'Ammoniumcarbonat',
      'Kaliumpermanganat',
    ],
    sections: [
      {
        heading: 'So lernst du sie',
        content:
          'Lern zuerst die „-at“-Ionen (Sulfat, Nitrat, Carbonat, Phosphat, Chlorat) – jedes andere Sauerstoff-Anion ist nur ein Muster, das darauf angewendet wird. Lern dann die vier, die aus dem Muster fallen: Hydroxid OH−, Cyanid CN−, Ammonium NH4+ und Peroxid O2 2−.',
      },
      {
        heading: 'Wo sie dir begegnen',
        content:
          'Säuren: Schwefelsäure ist H2SO4, weil Sulfat 2− trägt; Salpetersäure ist HNO3, weil Nitrat 1− trägt. Fällung: Alle Nitrate und alle Ammoniumsalze sind löslich, deshalb sind sie die üblichen Zuschauer-Ionen. Redox: Permanganat und Dichromat sind die klassischen Oxidationsmittel.',
      },
    ],
    tables: [
      {
        heading: 'Die wichtigsten mehratomigen Ionen',
        caption:
          'Zuerst die Kationen, dann die Anionen nach Ladung gruppiert. Namen in Klammern sind ältere Bezeichnungen, die dir noch begegnen können.',
        columns: ['Name', 'Formel', 'Ladung'],
        rows: polyatomicIonRowsDe,
      },
    ],
    commonMistakes: [
      'Das Ion in der Formel auseinanderzureißen (Ca(OH)2 als CaO2H2 zu schreiben) – es bleibt zusammen.',
      'Die Ladung nur dem letzten Atom zuzuschreiben – sie gehört zur ganzen Gruppe.',
      'Die Ladung (2−) mit der Anzahl der Sauerstoffatome zu verwechseln – Sulfat hat 4 O und die Ladung 2−.',
    ],
  },

  'naming-compounds': {
    title: 'Anorganische Verbindungen benennen',
    summary:
      'Drei Systeme – Ionenverbindungen, molekulare Stoffe, Säuren – und woran du erkennst, welches gilt.',
    keyTakeaways: [
      'Bestimm zuerst den Typ: Metall + Nichtmetall (oder NH4+) → ionisch; zwei Nichtmetalle → molekular; H vorn und in Wasser gelöst → Säure.',
      'Ionisch: Name des Kations + Name des Anions. Einatomige Anionen enden auf -id (Chlorid, Oxid); mehratomige Anionen behalten ihren eigenen Namen (Sulfat). Keine Zahlwortpräfixe – das Verhältnis ergibt sich aus den Ladungen.',
      'Metalle mit mehreren Ladungen bekommen eine römische Ziffer für die Ladung des Kations: FeCl2 = Eisen(II)-chlorid, FeCl3 = Eisen(III)-chlorid. Rechne sie aus dem Anion aus.',
      'Molekular: Griechische Zahlwörter geben die Atomanzahl an (CO2 = Kohlenstoffdioxid, N2O4 = Distickstofftetroxid). Beim ersten Element wird „Mono-“ weggelassen.',
      'Säuren: Im Deutschen heißen sie nach dem Säurerest – Chlorid → Salzsäure (HCl), Sulfat → Schwefelsäure (H2SO4), Sulfit → schweflige Säure (H2SO3), Nitrat → Salpetersäure (HNO3), Nitrit → salpetrige Säure (HNO2). Die englischen Endungen -ic und -ous entsprechen „-säure“ und „-ige Säure“.',
    ],
    formulaExampleNames: [
      'Magnesiumnitrid (ionisch)',
      'Kupfer(I)-oxid (ionisch, römische Ziffer)',
      'Phosphorpentachlorid (molekular)',
      'Salpetrige Säure (Säure, vom Nitrit)',
    ],
    sections: [
      {
        heading: 'Eine römische Ziffer bestimmen',
        content:
          'Für Fe2(SO4)3: Sulfat trägt 2−, und es kommt dreimal vor, also bringen die Anionen zusammen −6. Zwei Eisen-Ionen müssen also +6 ergeben, jedes einzelne +3 → Eisen(III)-sulfat. Nur Metalle mit mehr als einer häufigen Ladung (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni) brauchen die Ziffer; Hauptgruppe 1, Hauptgruppe 2, Al, Zn und Ag nie.',
      },
    ],
    tables: [
      {
        heading: 'Griechische Zahlwörter für molekulare Verbindungen',
        columns: ['Anzahl', 'Zahlwort', 'Beispiel'],
        rows: [
          ['1', 'Mono- (nur beim zweiten Element)', 'CO Kohlenstoffmonoxid'],
          ['2', 'Di-', 'CO₂ Kohlenstoffdioxid'],
          ['3', 'Tri-', 'SO₃ Schwefeltrioxid'],
          ['4', 'Tetra-', 'CCl₄ Tetrachlormethan'],
          ['5', 'Penta-', 'PCl₅ Phosphorpentachlorid'],
          ['6', 'Hexa-', 'SF₆ Schwefelhexafluorid'],
          ['7', 'Hepta-', 'Cl₂O₇ Dichlorheptoxid'],
          ['8–10', 'Octa-, Nona-, Deca-', 'P₄O₁₀ Tetraphosphordecoxid'],
        ],
      },
      {
        heading: 'Säurenamen aus den Namen der Säurereste',
        columns: ['Endung des Anions', 'Name der Säure', 'Beispiel'],
        rows: [
          ['-id', 'Name nach dem Säurerest', 'Cl⁻ Chlorid → HCl Salzsäure'],
          ['-at', '…-säure', 'SO₄²⁻ Sulfat → H₂SO₄ Schwefelsäure'],
          ['-it', '…-ige Säure', 'NO₂⁻ Nitrit → HNO₂ salpetrige Säure'],
        ],
      },
    ],
    commonMistakes: [
      'Zahlwortpräfixe bei Ionenverbindungen zu verwenden: „Calciumdichlorid“ ist falsch – CaCl2 ist Calciumchlorid.',
      'Den Selbstlaut stehen zu lassen: Es heißt Monoxid, Tetroxid, Pentoxid – nicht „Monooxid“.',
      'Natrium, Zink oder Aluminium eine römische Ziffer zu geben – sie haben nur eine Ladung.',
    ],
  },

  'relative-formula-mass': {
    title: 'Relative Atom- und Formelmasse',
    summary:
      'Was Ar wirklich bedeutet und wie du Atome zur Mr einer Formel zusammenzählst – Indizes und Klammern inbegriffen.',
    keyTakeaways: [
      'Die relative Atommasse (Ar) ist ein Vergleich, kein Gewicht in Gramm: Ein Kohlenstoffatom wiegt ungefähr so viel wie 12 Wasserstoffatome. Die Ar wird an Kohlenstoff-12 gemessen und ist dort genau 12.',
      'Weil es ein Verhältnis ist, hat die Ar keine Einheit. Nichts auf diesem Blatt wird in Gramm gemessen, bis du es auf eine echte Menge hochrechnest.',
      'Die relative Formelmasse (Mr) ist die Summe aller Atome der Formel. Mehr nicht: nichts multiplizieren, nichts mitteln.',
      'Ein Index gilt für das Atom davor. Eine Klammer gilt für alles, was in ihr steht.',
      'Lies die Ar im Periodensystem ab. Du musst sie nicht auswendig können, und eine Schultabelle rundet – H 1, C 12, O 16, Cl 35,5.',
      'Für eine Ionenverbindung gilt dasselbe wie für ein Molekül – deshalb heißt es Formelmasse und nicht Molekülmasse: An NaCl gibt es kein Molekül zu wiegen.',
    ],
    formulaExampleNames: [
      'Wasser',
      'Kohlenstoffdioxid',
      'Calciumcarbonat',
      'Magnesiumhydroxid',
      'Calciumnitrat',
    ],
    formulaExampleDescriptions: [
      '2 × 1 + 16 = 18',
      '12 + 2 × 16 = 44',
      '40 + 12 + 3 × 16 = 100',
      '24 + 2 × (16 + 1) = 58',
      '40 + 2 × (14 + 3 × 16) = 164',
    ],
    sections: [
      {
        heading: 'Was „relativ“ wirklich heißt',
        content:
          'Atome sind viel zu leicht, um sie einzeln zu wiegen, also vergleichen Chemikerinnen und Chemiker sie. Leg ein Kohlenstoffatom auf die eine Waagschale und Wasserstoffatome auf die andere: Es braucht 12 Wasserstoffatome, bis die Waage gerade steht. Das ist die ganze Idee – Kohlenstoff ist 12-mal so schwer wie Wasserstoff, also sagen wir, seine relative Atommasse ist 12. Die Zahl beantwortet die Frage „wie viele Wasserstoffatome?“, und genau deshalb hat sie keine Einheit: Sie ist ein Vergleich, keine Messung. Genau genommen ist der Standard Kohlenstoff-12, nicht Wasserstoff: Jede relative Atommasse vergleicht ein Atom mit einem Zwölftel eines Kohlenstoff-12-Atoms. Wasserstoff kommt dabei auf fast genau 1, und deshalb geht das Bild mit der Waage auf.',
      },
      {
        heading: 'Die Atome zusammenzählen',
        content:
          'Die relative Formelmasse (Mr) ist die Ar jedes Atoms der Formel, addiert. Arbeite von links nach rechts, ein Element nach dem anderen, und schreib den Rechenweg auf: H2O sind 2 Wasserstoff zu je 1, dazu 1 Sauerstoff mit 16, also 2 + 16 = 18. Die Reihenfolge ist egal, und am Ende wird nichts multipliziert – wenn du für mehr als eine Summe zum Taschenrechner greifst, ist etwas schiefgegangen.',
        exampleNames: ['Ammoniak', 'Methan', 'Schwefelsäure'],
        exampleDescriptions: [
          '14 + 3 × 1 = 17',
          '12 + 4 × 1 = 16',
          '2 × 1 + 32 + 4 × 16 = 98',
        ],
      },
      {
        heading: 'Indizes und Klammern',
        content:
          'Ein Index gilt nur für das Atom davor: Die 2 in CO2 bedeutet zwei Sauerstoff, nicht zwei von allem. Eine Klammer gilt für die ganze Gruppe darin: Mg(OH)2 ist ein Magnesium plus zwei OH-Einheiten, also 24 + 2 × 17 = 58, nicht 24 + 16 + 1. Wenn du eine Klammer siehst, rechne die Gruppe einmal aus und multipliziere dann.',
        exampleNames: ['Aluminiumsulfat'],
        exampleDescriptions: [
          '2 × 27 + 3 × (32 + 4 × 16) = 342',
        ],
      },
      {
        heading: 'Warum die Tabelle im Unterricht nicht zum Internet passt',
        content:
          'Ein Tafelwerk gibt Chlor mit 35,45 an und Wasserstoff mit 1,008, weil eine echte Probe ein Gemisch aus Isotopen ist. Eine Tabelle für Klasse 10 rundet: H 1, C 12, N 14, O 16, Cl 35,5. Beides stimmt – die gerundete Fassung lässt sich leichter addieren und ist für jede Aufgabe genau genug, die dir gestellt wird. Nimm die Tabelle, die deine Klasse benutzt, und schreib dazu, welche es war, wenn das Ergebnis knapp an einer Grenze liegt.',
      },
      {
        heading: 'Wozu das gut ist',
        content:
          'Sobald du die Mr beider Seiten einer Gleichung bestimmen kannst, kannst du die Massenerhaltung in Zahlen zeigen und ein Rezept hochrechnen: Wenn 4 g Wasserstoff 36 g Wasser ergeben, dann ergeben 8 g eben 72 g. Das ist Masse zu Masse über das Verhältnis, ganz ohne Mol. Das Mol kommt später – als Abkürzung für dieselbe Überlegung.',
      },
    ],
    tables: [
      {
        heading: 'Die Werte, die eine Klasse 10 benutzt',
        caption:
          'So gerundet, wie eine Schultabelle rundet. Chlor und Kupfer behalten eine Hälfte, weil das Runden auf eine ganze Zahl ein Ergebnis sichtbar verfälschen würde.',
        columns: ['Element', 'Symbol', 'Ar'],
        rows: [
          ['Wasserstoff', 'H', '1'],
          ['Kohlenstoff', 'C', '12'],
          ['Stickstoff', 'N', '14'],
          ['Sauerstoff', 'O', '16'],
          ['Natrium', 'Na', '23'],
          ['Magnesium', 'Mg', '24'],
          ['Aluminium', 'Al', '27'],
          ['Schwefel', 'S', '32'],
          ['Chlor', 'Cl', '35,5'],
          ['Kalium', 'K', '39'],
          ['Calcium', 'Ca', '40'],
          ['Eisen', 'Fe', '56'],
          ['Kupfer', 'Cu', '63,5'],
        ],
      },
      {
        heading: 'Gerechnete Beispiele',
        columns: ['Formel', 'Rechenweg', 'Mr'],
        rows: [
          ['H2', '2 × 1', '2'],
          ['O2', '2 × 16', '32'],
          ['H2O', '2 × 1 + 16', '18'],
          ['NaCl', '23 + 35,5', '58,5'],
          ['MgO', '24 + 16', '40'],
          ['CO2', '12 + 2 × 16', '44'],
          ['CaCO3', '40 + 12 + 3 × 16', '100'],
          ['H2SO4', '2 × 1 + 32 + 4 × 16', '98'],
          ['Mg(OH)2', '24 + 2 × (16 + 1)', '58'],
          ['Ca(NO3)2', '40 + 2 × (14 + 3 × 16)', '164'],
        ],
      },
    ],
    commonMistakes: [
      'Zu sagen, ein Kohlenstoffatom „wiegt 12“ – 12 was? Die Ar ist ein Vergleich und hat keine Einheit. Gramm kommen erst ins Spiel, wenn du auf eine echte Menge hochrechnest.',
      'Den Index auf die ganze Formel anzuwenden: In CO2 gehört die 2 allein zum Sauerstoff.',
      'Eine Klammer zu übersehen, sodass für Mg(OH)2 41 statt 58 herauskommt.',
      'Die Mr bei NaCl oder MgO „Molekülmasse“ zu nennen. Dort gibt es kein Molekül – genau deshalb heißt sie Formelmasse.',
    ],
  },

  stoichiometry: {
    title: 'Stoffmenge und Stöchiometrie',
    summary:
      'Umrechnungen mit der Stoffmenge, Stoffmengenverhältnisse, begrenzendes Edukt und prozentuale Ausbeute an einem Ort.',
    keyTakeaways: [
      'Ein Mol sind 6,02 × 10²³ Teilchen (Avogadro-Konstante, N_A). Die molare Masse M (g/mol) ist die Masse eines Mols – addiere dazu die Atommassen aus dem Periodensystem.',
      'Alle Wege führen über die Stoffmenge: Rechne das Gegebene in Mol um, benutze das Stoffmengenverhältnis aus der ausgeglichenen Gleichung und rechne dann zurück in die gesuchte Größe.',
      'Das Stoffmengenverhältnis ist das Verhältnis der Koeffizienten – sonst nichts.',
      'Begrenzendes Edukt: Der Ausgangsstoff, der zuerst aufgebraucht ist, bestimmt, wie viel Produkt entsteht. Bestimm die Stoffmenge jedes Edukts und teile sie durch seinen Koeffizienten; der kleinste Wert gehört zum begrenzenden Edukt.',
      'Prozentuale Ausbeute = (tatsächliche Ausbeute ÷ theoretische Ausbeute) × 100. Die theoretische Ausbeute ergibt sich aus dem begrenzenden Edukt.',
    ],
    formulaExampleNames: ['Verbrennung von Methan', 'Ammoniaksynthese'],
    tables: [
      {
        heading: 'Die Umrechnungsformeln',
        columns: ['Formel', 'Benutze sie, wenn du kennst …', 'Einheiten'],
        rows: [
          ['n = m ÷ M', 'die Masse', 'n in mol, m in g, M in g/mol'],
          ['n = N ÷ N_A', 'die Teilchenzahl', 'N_A = 6,02 × 10²³ mol⁻¹'],
          ['n = c × V', 'die Konzentration einer Lösung', 'c in mol/L, V in L'],
          [
            'n = V ÷ V_m',
            'das Volumen eines Gases bei SLC',
            'V_m = 24,8 L/mol bei 25 °C und 100 kPa',
          ],
          ['PV = nRT', 'ein Gas unter anderen Bedingungen', 'P in kPa, V in L, T in K, R = 8,31'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Beispiel Schritt für Schritt: Masse → Masse',
        content:
          'Welche Masse Wasser entsteht, wenn 8,0 g Wasserstoff vollständig verbrennen? 2H2 + O2 → 2H2O. n(H2) = 8,0 ÷ 2,0 = 4,0 mol. Verhältnis H2 : H2O = 2 : 2, also n(H2O) = 4,0 mol. m(H2O) = 4,0 × 18,0 = 72 g.',
      },
      {
        heading: 'Beispiel Schritt für Schritt: begrenzendes Edukt',
        content:
          '4,0 mol H2 reagieren mit 1,0 mol O2. Teile durch die Koeffizienten: H2 → 4,0 ÷ 2 = 2,0; O2 → 1,0 ÷ 1 = 1,0. Sauerstoff ist das begrenzende Edukt. n(H2O) = 2 × n(O2) = 2,0 mol; 2,0 mol H2 bleiben übrig (im Überschuss).',
      },
    ],
    commonMistakes: [
      'Das Massenverhältnis statt des Stoffmengenverhältnisses zu benutzen – 2 g H2 reagieren nicht mit 1 g O2.',
      'Das Edukt mit der kleineren Masse als begrenzend anzunehmen, ohne in Mol umzurechnen.',
      'Einheiten zu mischen: Volumen in mL zusammen mit c in mol/L ergibt eine 1000-mal zu große Stoffmenge.',
      'Zu früh zu runden – rechne bis zum Schluss mit voller Genauigkeit und runde dann auf so viele gültige Ziffern, wie die ungenaueste gegebene Größe hat.',
    ],
  },

  'lewis-structures': {
    title: 'Lewis-Formeln',
    summary:
      'Valenzelektronen zählen, so verteilen, dass die Oktettregel erfüllt ist, und mit der Formalladung prüfen.',
    keyTakeaways: [
      'Valenzelektronen = letzte Ziffer der Gruppennummer bei den Hauptgruppenelementen (H 1, C 4, N 5, O 6, Halogene 7 – Stickstoff steht in Gruppe 15, Chlor in Gruppe 17). Pro negativer Ladung kommt ein Elektron dazu, pro positiver Ladung fällt eins weg.',
      'Jede Bindung ist ein gemeinsames Elektronenpaar (2 Elektronen). Einfachbindung = 1 Paar, Doppelbindung = 2, Dreifachbindung = 3. Elektronen, die nicht binden, sitzen als freie Elektronenpaare am Atom.',
      'Oktettregel: Die meisten Atome streben 8 Valenzelektronen an. Wasserstoff kommt mit 2 aus (Duett).',
      'Fehlt dem Zentralatom nach dem Verteilen aller Elektronen noch etwas zum Oktett, mach aus freien Elektronenpaaren der äußeren Atome zusätzliche Bindungen.',
      'Formalladung = Valenzelektronen − Elektronen in freien Paaren − die Hälfte der bindenden Elektronen. Die beste Struktur hat Formalladungen möglichst nahe null, und eine negative Ladung sitzt am elektronegativsten Atom.',
    ],
    formulaExampleNames: [
      'Wasser – 2 Bindungen, 2 freie Elektronenpaare am O',
      'Kohlenstoffdioxid – zwei Doppelbindungen',
      'Stickstoff – Dreifachbindung',
      'Ammonium-Ion – 8 Elektronen (5 + 4 − 1)',
    ],
    sections: [
      {
        heading: 'Grundlagen für Klasse 10',
        content:
          'Jedes Atom bringt seine Außenelektronen als Punkte mit. Ein Punkt, der allein steht, ist ein ungepaartes Elektron; zwei ungepaarte Elektronen aus zwei verschiedenen Atomen ergeben ein bindendes Elektronenpaar, also eine Bindung (gezeichnet als Strich). Paare, die an einem Atom bleiben, sind freie Elektronenpaare. Ein Atom ist mit 8 Punkten um sich herum voll (ein Oktett) – Wasserstoff ist schon mit 2 voll (ein Duett). Teilst du zwischen denselben zwei Atomen zweimal, wird daraus eine Doppelbindung, dreimal eine Dreifachbindung. Die Zahl der ungepaarten Elektronen sagt dir, wie viele Bindungen ein Atom eingeht: H 1, C 4, N 3, O 2, Cl 1. Schwefel verhält sich wie Sauerstoff und Phosphor wie Stickstoff, weil sie in denselben Hauptgruppen stehen. Alles unterhalb dieses Abschnitts (Formalladung, VSEPR-Formen, Ausnahmen von der Oktettregel) ist Stoff der Oberstufe.',
        exampleNames: [
          'Wasser – Sauerstoff teilt zweimal und behält 2 freie Elektronenpaare',
          'Methan – Kohlenstoff teilt alle vier ungepaarten Elektronen',
          'Sauerstoff – zwei bindende Elektronenpaare ergeben eine Doppelbindung',
        ],
      },
      {
        heading: 'Die fünf Schritte',
        content:
          '1. Zähle alle Valenzelektronen (Ladung berücksichtigen). 2. Setz das am wenigsten elektronegative Atom in die Mitte (nie H). 3. Verbinde jedes äußere Atom mit einer Einfachbindung zum Zentrum. 4. Verteile die übrigen Elektronen als freie Elektronenpaare, zuerst an den äußeren Atomen, dann am Zentrum. 5. Fehlt dem Zentrum das Oktett, mach Doppel- oder Dreifachbindungen daraus. Prüfe zum Schluss, ob die Gesamtzahl der Elektronen zu Schritt 1 passt.',
      },
      {
        heading: 'Von der Lewis-Formel zur Molekülform (VSEPR)',
        content:
          'Zähle die Elektronenbereiche um das Zentralatom (jede Bindung zählt einmal, egal ob einfach oder mehrfach; jedes freie Elektronenpaar zählt einmal). 4 Bereiche → tetraedrisch (109,5°); mit 1 freien Paar → trigonal-pyramidal (NH3); mit 2 freien Paaren → gewinkelt (H2O). 3 Bereiche → trigonal-planar (120°). 2 Bereiche → linear (180°).',
      },
      {
        heading: 'Ausnahmen von der Oktettregel',
        content:
          'Be und B sind oft schon mit weniger als 8 stabil (BF3 hat 6). Ab der 3. Periode sind mehr als 8 möglich (PCl5 hat 10, SF6 hat 12). NO und NO2 haben eine ungerade Elektronenzahl, deshalb kann ein Atom kein Oktett erreichen.',
      },
    ],
    tables: [
      {
        heading: 'Valenzelektronen nach Gruppe',
        columns: ['Gruppe', 'Valenz-e⁻', 'Übliche Bindungszahl', 'Beispiele'],
        rows: [
          ['1 (H)', '1', '1', 'H'],
          ['14', '4', '4', 'C, Si'],
          ['15', '5', '3 (+1 freies Paar)', 'N, P'],
          ['16', '6', '2 (+2 freie Paare)', 'O, S'],
          ['17', '7', '1 (+3 freie Paare)', 'F, Cl, Br, I'],
          ['18', '8', '0', 'Ne, Ar'],
        ],
      },
    ],
    commonMistakes: [
      'Elektronen wie Planeten auf Bahnen zu zeichnen – die Punkte zeigen, wie viele es sind, nicht wo sie sind.',
      'Zu vergessen, für ein negatives Ion Elektronen zu ergänzen (oder für ein positives welche wegzunehmen).',
      'Wasserstoff mehr als eine Bindung zu geben.',
      'Das Zentralatom mit weniger als 8 Elektronen zu lassen, obwohl eine Doppelbindung das lösen würde (CO2, HCN).',
    ],
  },

  'organic-nomenclature': {
    title: 'Organische Verbindungen benennen',
    summary:
      'IUPAC-Namen Schritt für Schritt: längste Kette, kleinste Nummern, Substituenten alphabetisch, Endung nach der funktionellen Gruppe.',
    keyTakeaways: [
      'Such die längste durchgehende Kohlenstoffkette, die die ranghöchste funktionelle Gruppe enthält – sie kann in der Zeichnung um Ecken laufen.',
      'Nummeriere die Kette von dem Ende aus, das der funktionellen Gruppe die kleinere Nummer gibt; gibt es keine funktionelle Gruppe, bekommt der erste Substituent die kleinere Nummer.',
      'Substituenten stehen als Vorsilben mit ihrer Nummer davor: 2-Methyl, 3-Chlor. Für Wiederholungen nimmst du Di-, Tri- und sortierst alphabetisch (die Vervielfachungssilben zählen dabei nicht mit: Ethyl vor Dimethyl).',
      'Der Stamm gibt die Kettenlänge an, die Endung die wichtigste funktionelle Gruppe: -an, -en, -in, -ol, -al, -on, -säure, -amin.',
      'Zahlen werden durch Bindestriche von Wörtern und durch Kommas voneinander getrennt: 2,2-Dimethylpropan-1-ol.',
    ],
    formulaExampleNames: ['Propan-2-ol', 'But-1-en', '2-Methylpropan', 'Essigsäure (Ethansäure)'],
    tables: [
      {
        heading: 'Stammnamen',
        columns: ['Kohlenstoffatome', 'Stamm', 'Alkan'],
        rows: [
          ['1', 'Meth-', 'Methan CH₄'],
          ['2', 'Eth-', 'Ethan C₂H₆'],
          ['3', 'Prop-', 'Propan C₃H₈'],
          ['4', 'But-', 'Butan C₄H₁₀'],
          ['5', 'Pent-', 'Pentan C₅H₁₂'],
          ['6', 'Hex-', 'Hexan C₆H₁₄'],
          ['7', 'Hept-', 'Heptan C₇H₁₆'],
          ['8', 'Oct-', 'Octan C₈H₁₈'],
          ['9', 'Non-', 'Nonan C₉H₂₀'],
          ['10', 'Dec-', 'Decan C₁₀H₂₂'],
        ],
      },
      {
        heading: 'Rangfolge der Endungen (höchste zuerst)',
        columns: ['Gruppe', 'Endung', 'Beispiel'],
        rows: [
          ['Carbonsäure', '-säure', 'Propansäure'],
          ['Ester', '-yl …-oat', 'Ethansäuremethylester'],
          ['Amid', '-amid', 'Ethanamid'],
          ['Aldehyd', '-al', 'Ethanal'],
          ['Keton', '-on', 'Propan-2-on'],
          ['Alkohol', '-ol', 'Butan-2-ol'],
          ['Amin', '-amin', 'Ethanamin'],
          ['Alken / Alkin', '-en / -in', 'But-2-en'],
          ['Halogenalkan', 'Vorsilbe: Fluor-, Chlor-, Brom-, Iod-', '2-Chlorpropan'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Beispiel Schritt für Schritt',
        content:
          'Eine Kette aus 5 Kohlenstoffatomen mit einer OH-Gruppe am Kohlenstoff 2 und einer Methylgruppe am Kohlenstoff 3. Stamm: Pent-. Endung: -ol mit der Nummer 2 (gezählt von dem Ende, das der OH-Gruppe am nächsten liegt). Substituent: 3-Methyl. Name: 3-Methylpentan-2-ol.',
      },
    ],
    commonMistakes: [
      'Die waagerecht gezeichnete Kette zu nehmen statt der längsten Kette.',
      'Vom falschen Ende zu nummerieren – die funktionelle Gruppe hat Vorrang vor den Substituenten.',
      'Nach der Vervielfachungssilbe zu sortieren: „Dimethyl“ steht unter M, nicht unter D.',
      'Die Nummer für -en, -ol oder -on zu vergessen, wenn die Gruppe an mehr als einer Stelle sitzen könnte (Propan-1-ol oder Propan-2-ol).',
    ],
  },

  'functional-groups': {
    title: 'Funktionelle Gruppen',
    summary:
      'Wie jede Gruppe aussieht, wie sie benannt wird und welche Reaktionen sie eingeht.',
    keyTakeaways: [
      'Eine funktionelle Gruppe ist das Atom oder die Atomgruppe, die einem Molekül seine typischen Reaktionen gibt. Moleküle mit derselben Gruppe reagieren auf dieselbe Weise.',
      'Eine homologe Reihe ist eine Familie mit derselben funktionellen Gruppe und einer allgemeinen Formel; benachbarte Mitglieder unterscheiden sich um CH2. Die physikalischen Eigenschaften ändern sich entlang der Reihe allmählich.',
      'Kohlenwasserstoffe: Alkane (nur C–C, gesättigt), Alkene (C=C), Alkine (C≡C). Nur Alkene und Alkine gehen Additionsreaktionen ein.',
      'Sauerstoffhaltige Gruppen: Alkohol (–OH), Aldehyd (–CHO, am Kettenende), Keton (C=O innerhalb der Kette), Carbonsäure (–COOH), Ester (–COO–).',
      'Stickstoff- und Halogengruppen: Amin (–NH2), Amid (–CONH2), Halogenalkan (–F, –Cl, –Br, –I).',
    ],
    formulaExampleNames: [
      'Ethanol (Alkohol)',
      'Ethanal (Aldehyd)',
      'Propanon (Keton)',
      'Essigsäure (Carbonsäure)',
      'Essigsäureethylester (Ester)',
      'Ethanamin (Amin)',
    ],
    tables: [
      {
        heading: 'Übersicht der funktionellen Gruppen',
        columns: ['Gruppe', 'Struktur', 'Endung / Vorsilbe', 'Allgemeine Formel', 'Typische Reaktion'],
        rows: [
          ['Alkan', 'nur C–C, C–H', '-an', 'CₙH₂ₙ₊₂', 'Verbrennung; Substitution mit Halogenen (UV)'],
          ['Alken', 'C=C', '-en', 'CₙH₂ₙ', 'Addition (H₂, X₂, HX, H₂O)'],
          ['Halogenalkan', 'C–X', 'Halogen-', 'CₙH₂ₙ₊₁X', 'Substitution mit OH⁻ oder NH₃'],
          [
            'Alkohol',
            'C–OH',
            '-ol',
            'CₙH₂ₙ₊₁OH',
            'Oxidation (primär → Aldehyd → Säure; sekundär → Keton); Veresterung',
          ],
          ['Aldehyd', '–CHO', '-al', 'CₙH₂ₙO', 'Wird zur Carbonsäure oxidiert'],
          ['Keton', 'C=O (innen)', '-on', 'CₙH₂ₙO', 'Lässt sich kaum oxidieren'],
          ['Carbonsäure', '–COOH', '-säure', 'CₙH₂ₙO₂', 'Schwache Säure; Veresterung mit Alkohol'],
          ['Ester', '–COO–', '…-ester', 'CₙH₂ₙO₂', 'Hydrolyse zurück zu Säure + Alkohol'],
          ['Amin', '–NH₂', '-amin', 'CₙH₂ₙ₊₁NH₂', 'Schwache Base; bildet mit Säuren Amide'],
          ['Amid', '–CONH₂', '-amid', '—', 'Hydrolyse'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Der Reaktionsweg, den du kennen musst',
        content:
          'Alken → (H₂O, H₃PO₄ als Katalysator) → Alkohol. Alken → (HX) → Halogenalkan → (OH⁻(aq)) → Alkohol → (Cr₂O₇²⁻/H⁺) → Aldehyd → (weitere Oxidation) → Carbonsäure → (Alkohol, H₂SO₄ als Katalysator) → Ester. Primäre Alkohole werden zweimal oxidiert, sekundäre einmal zum Keton, tertiäre gar nicht.',
        imageAlt:
          'Eine Reaktionsübersicht, von oben nach unten zu lesen. Links untereinander: Aus einem Alken wird mit H₂O und H₃PO₄ als Katalysator ein primärer Alkohol, daraus mit Cr₂O₇²⁻/H⁺ ein Aldehyd, daraus mit Cr₂O₇²⁻/H⁺ eine Carbonsäure und daraus mit einem Alkohol und H₂SO₄ als Katalysator ein Ester. Rechts: Das Alken kann stattdessen mit HX zu einem Halogenalkan reagieren, das mit OH⁻(aq) denselben primären Alkohol ergibt; neben dem primären Alkohol wird ein sekundärer Alkohol mit Cr₂O₇²⁻/H⁺ zum Keton oxidiert.',
      },
      {
        heading: 'Gruppen im Spektrum erkennen',
        content:
          'IR: Eine breite O–H-Bande um 3200–3550 cm⁻¹ bedeutet Alkohol (oder, sehr breit und über die C–H-Banden gelegt, Carbonsäure); eine starke C=O-Bande bei 1670–1750 cm⁻¹ bedeutet Aldehyd, Keton, Säure, Ester oder Amid. Die genauen Bereiche findest du in einer IR-Tabelle – benutz sie.',
      },
    ],
    commonMistakes: [
      'Ein Molekül mit –OH am Benzolring Alkohol zu nennen (es ist ein Phenol) – eine häufige Falle.',
      'Einen Aldehyd (C=O am Ende) mit einem Keton (C=O in der Mitte) zu verwechseln.',
      'Ester für Säuren zu halten, weil sie –COO– enthalten – sie haben kein saures H.',
    ],
  },
};
