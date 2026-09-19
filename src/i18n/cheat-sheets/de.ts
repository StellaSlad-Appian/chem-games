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
// symbols, charges, IUPAC suffixes/prefixes (-ol, -al, hypo-, per-) where the
// point of the sentence *is* the English-language IUPAC affix, and the names of
// English-language linked resources.

import { POLYATOMIC_ION_TABLE } from '@/lib/cheat-sheet-data';
import type { CheatSheetOverlaySet, ResourceDescriptions } from '../cheat-sheets';

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

export const RESOURCE_DESCRIPTIONS_DE: ResourceDescriptions = {
  'https://www.vcaa.vic.edu.au/sites/default/files/2026-02/2026-ChemistryDataBook.pdf':
    'Genau die Tabellen, die du in der Prüfung bekommst: Periodensystem, mehratomige Ionen, IR-/NMR-Daten, Konstanten. (Auf Englisch.)',
  'https://www.vcaa.vic.edu.au/curriculum/vce/vce-study-designs/chemistry/Pages/index.aspx':
    'Offizielle Lerninhalte und Kompetenzen für die Units 1–4 (2023–2027). (Auf Englisch.)',
  'https://www.khanacademy.org/science/hs-chemistry':
    'Kurze Videos und Übungsaufgaben; gut für eine zweite Erklärung zu jedem Thema hier. (Auf Englisch.)',
  'https://chem.libretexts.org/':
    'Kostenloses offenes Lehrbuch; such dir jeden Begriff für eine ausführlichere Erklärung auf Prüfungsniveau. (Auf Englisch.)',
  'https://www.chemguide.co.uk/':
    'Klare, unaufgeregte Erklärungen, besonders stark bei organischen Mechanismen und der Bindungslehre. (Auf Englisch.)',
  'https://ptable.com/':
    'Klick auf ein Element und du siehst Elektronenkonfiguration, Elektronegativität und häufige Ionen.',
  'https://www.rsc.org/periodic-table':
    'Verlässliche Elementdaten mit Geschichte und Verwendung – gut für Referate. (Auf Englisch.)',
  'https://molview.org/':
    'Zeichne ein Molekül und sieh es in 3D; zeigt Bindungen, Geometrie und den IUPAC-Namen.',
  'https://pubchem.ncbi.nlm.nih.gov/':
    'Schlag jede Verbindung nach: Struktur, IUPAC-Name, molare Masse, Eigenschaften. (Auf Englisch.)',
  'https://goldbook.iupac.org/':
    'Die maßgeblichen Definitionen chemischer Fachbegriffe. (Auf Englisch.)',
  'https://phet.colorado.edu/en/simulations/states-of-matter':
    'Erwärme, kühle und komprimiere Atome und Moleküle und beobachte den Zustandswechsel.',
  'https://phet.colorado.edu/en/simulations/ph-scale':
    'Miss den pH-Wert von Alltagsflüssigkeiten und sieh das Verhältnis von H3O+ zu OH-.',
  'https://phet.colorado.edu/en/simulations/acid-base-solutions':
    'Vergleiche starke und schwache Säuren auf Teilchenebene.',
  'https://phet.colorado.edu/en/simulations/balancing-chemical-equations':
    'Zieh Koeffizienten zurecht und beobachte, wie sich die Atomanzahl auf einer Waage ändert.',
  'https://phet.colorado.edu/en/simulations/build-a-molecule':
    'Bau Moleküle aus Atomen zusammen und sieh ihre Formeln und 3D-Formen.',
  'https://phet.colorado.edu/en/simulations/molecule-shapes':
    'Füge einem Zentralatom Bindungen und freie Elektronenpaare hinzu und beobachte, wie sich die VSEPR-Form ändert.',
  'https://phet.colorado.edu/en/simulations/reactants-products-and-leftovers':
    'Erst belegte Brötchen, dann echte Reaktionen – die anschaulichste Darstellung des begrenzenden Edukts, die es gibt.',
  'https://www.compoundchem.com/2020/02/21/functional-groups/':
    'Eine einseitige Infografik zu jeder funktionellen Gruppe mit Struktur und Beispiel – zum Ausdrucken. (Auf Englisch.)',
  'https://www.compoundchem.com/2014/02/17/organic-chemistry-reaction-map/':
    'Die Reaktionswege zwischen den funktionellen Gruppen auf einer Seite. (Auf Englisch.)',
  'https://sdbs.db.aist.go.jp/':
    'Echte IR- und NMR-Spektren für Tausende organischer Verbindungen. (Auf Englisch.)',
  'https://webbook.nist.gov/chemistry/':
    'Referenzspektren und thermochemische Daten. (Auf Englisch.)',
};

export const CHEAT_SHEET_OVERLAY_DE: CheatSheetOverlaySet = {
  'states-of-matter': {
    title: 'Aggregatzustände',
    summary: 'Teilchenanordnung, kinetische Energie und die sechs Zustandsänderungen.',
    curriculumRef:
      'Victorian Curriculum Science: Teilchenmodell (Level 7–8), vertieft in Klasse 9–10 (chemische Grundlagen).',
    keyTakeaways: [
      'Feststoffe: Die Teilchen schwingen an festen Plätzen – feste Form und festes Volumen.',
      'Flüssigkeiten: Die Teilchen gleiten aneinander vorbei – festes Volumen, die Form passt sich dem Gefäß an.',
      'Gase: Die Teilchen bewegen sich frei und schnell – sie füllen jedes Gefäß und lassen sich leicht zusammendrücken.',
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
    curriculumRef:
      'Victorian Curriculum Science Level 10 (chemische Reaktionen inkl. Säuren); VCE Unit 2 AoS 1 (Brønsted-Lowry).',
    keyTakeaways: [
      'Säure: ein Protonendonator (gibt H+ ab). In Wasser entstehen Oxonium-Ionen, H3O+. pH < 7.',
      'Base: ein Protonenakzeptor. Lösliche Basen (Laugen) geben in Wasser Hydroxid-Ionen, OH-, ab. pH > 7.',
      'Neutral: pH 7 bei 25 °C – reines Wasser und die meisten Salze.',
      'Neutralisation: Säure + Base → Salz + Wasser. Die Ionengleichung ist immer H+ + OH- → H2O.',
      'Jede Stufe auf der pH-Skala bedeutet den Faktor 10 in der H+-Konzentration: pH 2 ist 100-mal saurer als pH 4.',
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
    curriculumRef:
      'Victorian Curriculum Science Level 10; VCE Unit 1–2 (ausgeglichene Gleichungen mit Zustandssymbolen).',
    keyTakeaways: [
      'Bei einer Reaktion werden Atome nur neu angeordnet, nie erzeugt oder vernichtet – von jedem Element muss auf beiden Seiten die gleiche Anzahl stehen.',
      'Koeffizienten (die großen Zahlen davor) gelten für die ganze Formel. Indizes (die kleinen tiefgestellten Zahlen darin) legen den Stoff fest und dürfen nie verändert werden.',
      'Gleiche ein Element nach dem anderen aus; lass Wasserstoff und Sauerstoff zum Schluss; behandle ein mehratomiges Ion als Einheit, wenn es auf beiden Seiten unverändert vorkommt.',
      'Die Koeffizienten sollen das kleinstmögliche ganzzahlige Verhältnis sein.',
      'Schreib in die fertige Gleichung immer die Zustandssymbole.',
    ],
    formulaExampleNames: [
      'Nicht ausgeglichen',
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
    curriculumRef: 'Victorian Curriculum Science Level 10; VCE Unit 2 AoS 1–2.',
    keyTakeaways: [
      'Synthese (Vereinigung): Zwei oder mehr Stoffe verbinden sich – A + B → AB.',
      'Zersetzung: Ein Stoff zerfällt – AB → A + B (braucht oft Wärme oder Strom).',
      'Verbrennung: Brennstoff + Sauerstoff → Kohlenstoffdioxid + Wasser (vollständig) – dabei wird Wärme frei.',
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
    curriculumRef:
      'Victorian Curriculum Science Level 10; VCE Unit 1 AoS 1 (Metalle, Ionenverbindungen, molekulare Stoffe).',
    keyTakeaways: [
      'Atome gehen Bindungen ein, um eine stabile, volle Außenschale zu erreichen (Edelgaskonfiguration). Bei den Hauptgruppenelementen sagt dir die Hauptgruppennummer, wie viele Valenzelektronen ein Atom hat.',
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
    curriculumRef: 'Victorian Curriculum Science Level 10; VCE Unit 1 AoS 1.',
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
          'Hauptgruppe 1 → +1, Hauptgruppe 2 → +2, Al → +3, Hauptgruppe 17 → −1, Hauptgruppe 16 → −2, N und P → −3. Bei den Nebengruppenmetallen wechselt die Ladung – der Name sagt sie dir. Für mehratomige Ionen benutzt du die Nachschlagetabelle.',
      },
    ],
    commonMistakes: [
      'Zu vergessen zu kürzen: Aus Mg2O2 muss MgO werden.',
      'Klammern um ein einzelnes mehratomiges Ion: NaOH, nicht Na(OH).',
      'Das Anion zuerst zu schreiben, weil es in der Umgangssprache zuerst genannt wird.',
    ],
  },

  'polyatomic-ions': {
    title: 'Mehratomige Ionen',
    summary:
      'Die Nachschlagetabelle – und die Namensmuster, dank derer du viel weniger auswendig lernen musst, als du denkst.',
    curriculumRef:
      'VCE Unit 1 AoS 1 (Formeln und Benennung von Ionenverbindungen). Das VCE-Datenheft enthält diese Tabelle in der Prüfung.',
    keyTakeaways: [
      'Ein mehratomiges Ion ist eine Gruppe von Atomen, die durch Atombindungen zusammenhängt, insgesamt eine Ladung trägt und in Reaktionen als Einheit auftritt.',
      'Das einzige häufige mehratomige Kation ist Ammonium, NH4+. Alle anderen sind Anionen.',
      'Die Endung „-at“ bedeutet mehr Sauerstoff als „-it“: Sulfat SO4 2− gegenüber Sulfit SO3 2−; Nitrat NO3− gegenüber Nitrit NO2−. Die Ladung bleibt gleich.',
      '„Per-…-at“ hat ein Sauerstoffatom mehr als „-at“, „Hypo-…-it“ eines weniger als „-it“ (Perchlorat ClO4−, Chlorat ClO3−, Chlorit ClO2−, Hypochlorit ClO−).',
      'Ein zusätzliches H+ am Anion erhöht dessen Ladung um eins und setzt „Hydrogen“ vor den Namen: Carbonat CO3 2− → Hydrogencarbonat HCO3−.',
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
          'Säuren: Schwefelsäure ist H2SO4, weil Sulfat 2− trägt; Salpetersäure ist HNO3, weil Nitrat 1− trägt. Fällung: Fast alle Nitrate und alle Ammoniumsalze sind löslich, deshalb sind sie die üblichen Zuschauer-Ionen. Redox: Permanganat und Dichromat sind die klassischen Oxidationsmittel.',
      },
    ],
    tables: [
      {
        heading: 'Mehratomige Ionen (Auswahl des VCE-Datenhefts)',
        caption:
          'Zuerst die Kationen, dann die Anionen nach Ladung gruppiert. Namen in Klammern sind ältere Bezeichnungen, die dir noch begegnen können.',
        columns: ['Name', 'Formel', 'Ladung'],
        rows: polyatomicIonRowsDe,
      },
    ],
    commonMistakes: [
      'Das Ion in der Formel auseinanderzureißen (Ca(OH)2 als CaO2H2 zu schreiben) – es bleibt zusammen.',
      'Die Ladung nur dem letzten Atom zuzuschreiben – sie gehört zur ganzen Gruppe.',
      'Die Ladung (−2) mit der Anzahl der Sauerstoffatome zu verwechseln – Sulfat hat 4 O und die Ladung 2−.',
    ],
  },

  'naming-compounds': {
    title: 'Anorganische Verbindungen benennen',
    summary:
      'Drei Systeme – Ionenverbindungen, molekulare Stoffe, Säuren – und woran du erkennst, welches gilt.',
    curriculumRef:
      'VCE Unit 1 AoS 1 (IUPAC-Benennung von ionischen und molekularen Verbindungen).',
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

  stoichiometry: {
    title: 'Stoffmenge und Stöchiometrie',
    summary:
      'Umrechnungen mit der Stoffmenge, Stoffmengenverhältnisse, begrenzendes Edukt und prozentuale Ausbeute an einem Ort.',
    curriculumRef:
      'VCE Unit 2 AoS 1–2 (Stoffmenge, Konzentration, Stöchiometrie); Unit 3 AoS 2 (Ausbeute).',
    keyTakeaways: [
      'Ein Mol sind 6,02 × 10^23 Teilchen (Avogadro-Konstante, N_A). Die molare Masse M (g/mol) ist die Masse eines Mols – addiere dazu die Atommassen aus dem Periodensystem.',
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
      'Zu früh zu runden – rechne bis zum Schluss mit voller Genauigkeit und gib dann drei signifikante Stellen an.',
    ],
  },

  'lewis-structures': {
    title: 'Lewis-Formeln',
    summary:
      'Valenzelektronen zählen, so verteilen, dass die Oktettregel erfüllt ist, und mit der Formalladung prüfen.',
    curriculumRef: 'VCE Unit 1 AoS 1 (Atombindung, Lewis-Formeln, VSEPR-Formen).',
    keyTakeaways: [
      'Valenzelektronen = Hauptgruppennummer bei den Hauptgruppenelementen (H 1, C 4, N 5, O 6, Halogene 7). Pro negativer Ladung kommt ein Elektron dazu, pro positiver Ladung fällt eins weg.',
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
          'Jedes Atom bringt seine Außenelektronen als Punkte mit. Ein Punkt, der allein steht, ist ein Einzelelektron (formal: ein ungepaartes Elektron); zwei Einzelelektronen aus zwei verschiedenen Atomen ergeben ein bindendes Elektronenpaar, also eine Bindung (gezeichnet als Strich). Paare, die an einem Atom bleiben, sind freie Elektronenpaare. Ein Atom ist mit 8 Punkten um sich herum voll (ein Oktett) – Wasserstoff ist schon mit 2 voll (ein Duett). Teilst du zwischen denselben zwei Atomen zweimal, wird daraus eine Doppelbindung, dreimal eine Dreifachbindung. Die Zahl der Einzelelektronen sagt dir, wie viele Bindungen ein Atom eingeht: H 1, C 4, N 3, O 2, Cl 1. Schwefel verhält sich wie Sauerstoff und Phosphor wie Stickstoff, weil sie in denselben Hauptgruppen stehen. Alles unterhalb dieses Abschnitts (Formalladung, VSEPR-Formen, Ausnahmen von der Oktettregel) ist Stoff der Oberstufe.',
        exampleNames: [
          'Wasser – Sauerstoff teilt zweimal und behält 2 freie Elektronenpaare',
          'Methan – Kohlenstoff teilt alle vier Einzelelektronen',
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
        heading: 'Valenzelektronen nach Hauptgruppe',
        columns: ['Hauptgruppe', 'Valenz-e⁻', 'Übliche Bindungszahl', 'Beispiele'],
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
    curriculumRef: 'VCE Unit 4 AoS 1 (systematische IUPAC-Benennung organischer Verbindungen).',
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
      'Bei Ketten ab 4 Kohlenstoffatomen die Nummer für -en, -ol oder -on zu vergessen.',
    ],
  },

  'functional-groups': {
    title: 'Funktionelle Gruppen',
    summary:
      'Wie jede Gruppe aussieht, wie sie benannt wird und welche Reaktionen sie eingeht.',
    curriculumRef:
      'VCE Unit 4 AoS 1 (funktionelle Gruppen, homologe Reihen, Reaktionswege) und AoS 2 (Identifizierung über IR/NMR).',
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
          ['Ester', '–COO–', '…-ester', '—', 'Hydrolyse zurück zu Säure + Alkohol'],
          ['Amin', '–NH₂', '-amin', 'CₙH₂ₙ₊₁NH₂', 'Schwache Base; bildet mit Säuren Amide'],
          ['Amid', '–CONH₂', '-amid', '—', 'Hydrolyse'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Der Reaktionsweg, den du kennen musst',
        content:
          'Alken → (H2O, Katalysator H+) → Alkohol. Alken → (HX) → Halogenalkan → (OH−) → Alkohol → (Cr2O7 2−/H+) → Aldehyd → (weitere Oxidation) → Carbonsäure → (Alkohol, Katalysator H2SO4) → Ester. Primäre Alkohole werden zweimal oxidiert, sekundäre einmal zum Keton, tertiäre gar nicht.',
      },
      {
        heading: 'Gruppen im Spektrum erkennen',
        content:
          'IR: Eine breite O–H-Bande um 3200–3550 cm⁻¹ bedeutet Alkohol (oder, sehr breit und über die C–H-Banden gelegt, Carbonsäure); eine starke C=O-Bande bei 1670–1750 cm⁻¹ bedeutet Aldehyd, Keton, Säure, Ester oder Amid. Die genauen Bereiche stehen im VCE-Datenheft – benutz es.',
      },
    ],
    commonMistakes: [
      'Ein Molekül mit –OH am Benzolring Alkohol zu nennen (es ist ein Phenol) – außerhalb des VCE-Stoffs, aber eine häufige Falle.',
      'Einen Aldehyd (C=O am Ende) mit einem Keton (C=O in der Mitte) zu verwechseln.',
      'Ester für Säuren zu halten, weil sie –COO– enthalten – sie haben kein saures H.',
    ],
  },
};
