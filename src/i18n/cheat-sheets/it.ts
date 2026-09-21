// src/i18n/cheat-sheets/it.ts
//
// Italian prose for the cheat sheets. See src/i18n/cheat-sheets.ts for how this
// overlays onto the English structure and why it is shaped this way.
//
// Terminology follows docs/i18n/glossary-it.md. The decisions that matter most
// here, because they recur:
//
//   stato della materia · reagenti / prodotti · bilanciare un'equazione ·
//   coefficiente vs. pedice (the contrast this topic turns on) · legame
//   covalente / ionico / metallico · formula minima (the formula of an ionic
//   compound — a ratio, not a molecule) · formula molecolare vs. formula di
//   struttura · doppietto solitario / doppietto di legame · struttura di Lewis ·
//   ione poliatomico · ione idronio (H3O+) · massa molare · quantità di sostanza
//   · reagente limitante · resa teorica / effettiva / percentuale · gruppo
//   funzionale.
//
// Register: informal "tu", school-level vocabulary, Italian typography (« … »
// with no inner spaces, NO space before : ; ! ?, – for parenthetical dashes,
// decimal comma, U+2019 for every apostrophe, È rather than E').
//
// **This overlay has 21 sections, matching the English exactly**, with four in
// `lewis-structures`. That was counted by hand against
// src/lib/cheat-sheet-data.ts rather than trusted to the test:
// `cheat-sheets.test.ts` compares `localizeSheet()`'s output against its own
// input, and `localizeSheet()` falls back to the English section when the
// overlay is short — so an overlay one section shy passes the suite and then
// renders every heading over the wrong body. The German `lewis-structures`
// overlay shipped with three and did exactly that. The overlay-shape gate added
// alongside the German fix now machine-checks the count too.
//
// Two sheets are **adapted, not translated** — the user's decision, recorded in
// docs/i18n/GAMES.md and the brief:
//
//   * `naming-compounds`. English teaches "-ide → hydro-…-ic acid". Italian has
//     its own pattern and, like Spanish, an almost exact parallel one: *-uro →
//     acido …idrico*, *-ato → acido …ico*, *-ito → acido …oso*. The acid-names
//     table teaches the Italian affixes. The molecular-naming rule had to be
//     restated from the other end, because Italian names molecular compounds
//     **anion first** (*diossido di carbonio*), so "drop mono- on the first
//     element" becomes "drop it on the element named after *di*".
//   * `organic-nomenclature`. Italian names esters the other way round
//     (*etanoato di metile*, not "methyl ethanoate"), writes carboxylic acids as
//     *acido …oico* and amines as *-ammina*. The root table is the Italian one
//     (es-, ept-, ott-), not a transliteration of the English.
//
// `functional-groups` is partially adapted — the suffixes are Italian, the
// chemistry is not. There are **no English glosses in parentheses** anywhere:
// the user chose adaptation, not bilingual presentation.
//
// Not translated anywhere in this file: formulae, element symbols, state
// symbols, charges and structural notation (C–OH, –CHO).
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
// The polyatomic-ion table is generated from the ion registry, so its Italian
// rows are generated too rather than transcribed — that way adding an ion in
// the registry cannot leave a half-translated table behind.
// ---------------------------------------------------------------------------

const POLYATOMIC_ION_NAMES_IT: Record<string, string> = {
  Ammonium: 'Ammonio',
  Acetate: 'Acetato',
  'Ethanoate (acetate)': 'Etanoato (acetato)',
  Hydroxide: 'Idrossido',
  Nitrate: 'Nitrato',
  Nitrite: 'Nitrito',
  Sulfate: 'Solfato',
  Sulfite: 'Solfito',
  Carbonate: 'Carbonato',
  Phosphate: 'Fosfato',
  'Dihydrogen Phosphate': 'Diidrogenofosfato',
  'Hydrogen Phosphate': 'Idrogenofosfato',
  Perchlorate: 'Perclorato',
  Chlorate: 'Clorato',
  Chlorite: 'Clorito',
  Hypochlorite: 'Ipoclorito',
  Permanganate: 'Permanganato',
  Chromate: 'Cromato',
  Dichromate: 'Dicromato',
  Thiosulfate: 'Tiosolfato',
  Peroxide: 'Perossido',
  Oxalate: 'Ossalato',
  Cyanide: 'Cianuro',
  'Dihydrogen Borate': 'Diidrogenoborato',
  'Trihydrogen Silicate': 'Triidrogenosilicato',
  Hydrosulfide: 'Idrogenosolfuro',
  'Hydrogen carbonate (bicarbonate)': 'Idrogenocarbonato (bicarbonato)',
  'Hydrogen sulfite (bisulfite)': 'Idrogenosolfito (bisolfito)',
  'Hydrogen sulfate (bisulfate)': 'Idrogenosolfato (bisolfato)',
};

const polyatomicIonRowsIt = POLYATOMIC_ION_TABLE.rows.map((row) => [
  POLYATOMIC_ION_NAMES_IT[row[0]] ?? row[0],
  // Column 1 is the formula (listed in formulaColumns) and column 2 is the
  // charge; both are notation and are passed through untouched.
  row[1],
  row[2],
]);

// ---------------------------------------------------------------------------

export const CHEAT_SHEET_OVERLAY_IT: CheatSheetOverlaySet = {
  'atomic-structure': {
    title: 'Atomi e tavola periodica',
    summary:
      'Di che cosa è fatto un atomo, perché il numero atomico definisce l’elemento e che cosa permette di prevedere l’ordine della tavola.',
    keyTakeaways: [
      'Un atomo è un nucleo di protoni e neutroni, con gli elettroni distribuiti tutt’intorno.',
      'Il numero di protoni — il numero atomico — è ciò che rende un atomo quell’elemento. Cambialo e hai un elemento diverso.',
      'Gli elettroni stanno su livelli di energia, e quanti ce ne sono sul livello esterno è il criterio con cui la tavola è ordinata.',
      'Un gruppo è una colonna e un periodo è una riga. Gli elementi di un gruppo hanno gli stessi elettroni all’esterno, quindi reagiscono allo stesso modo.',
      'I metalli stanno a sinistra e i non metalli a destra. Gli atomi rimpiccioliscono verso destra e crescono verso il basso.',
      'Un atomo è quasi tutto spazio vuoto. Ogni immagine di un atomo sbaglia la scala, comprese quelle qui sopra.',
    ],
    formulaExampleNames: [
      'Cloro-35',
      'Cloro-37',
      'Ione idrogeno',
    ],
    sections: [
      {
        heading: 'Di che cosa è fatto un atomo',
        content:
          'Un atomo ha un nucleo di protoni e neutroni, con gli elettroni intorno. I protoni portano una carica positiva e gli elettroni una carica negativa uguale, quindi un atomo neutro ne ha altrettanti degli uni e degli altri. I neutroni non portano carica. Quasi tutta la massa sta nel nucleo, perché un elettrone non pesa quasi niente accanto a un protone.',
        imageAlt:
          'Un nucleo di protoni e neutroni al centro, circondato da una nuvola sfumata che mostra dove è probabile trovare gli elettroni. Una nota avverte che il nucleo è disegnato molto più grande del vero, altrimenti non si vedrebbe.',
      },
      {
        heading: 'Numero atomico e numero di massa',
        content:
          'Il numero atomico è il numero di protoni, ed è ciò che rende un atomo quell’elemento. Ogni atomo di cloro ha 17 protoni; qualunque cosa abbia 17 protoni è cloro. Il numero di massa è protoni più neutroni. I neutroni possono cambiare senza che cambi l’elemento. Qui i due termini sono un ampliamento: il programma di questi anni non ne nomina nessuno, e senza di essi non puoi leggere una casella della tavola.',
        exampleNames: ['Cloro-35', 'Cloro-37'],
        imageAlt:
          'Il simbolo del cloro-35 con il numero di massa 35 scritto sopra il numero atomico 17, e delle frecce: 17 protoni, e 35 meno 17 dà 18 neutroni.',
      },
      {
        heading: 'Elettroni, livelli di energia e forma della tavola',
        content:
          'Gli elettroni occupano livelli di energia intorno al nucleo. Il primo ne tiene fino a 2, il successivo fino a 8, poi ancora 8 per i primi venti elementi. Chi ti insegna, e anche il programma, può chiamarli gusci: è la stessa cosa. Contare gli elettroni in questo modo si chiama modello di Bohr: è utile, e non è la fotografia di un atomo vero. Quanti ce ne sono sul livello esterno decide come reagisce un atomo. Due elementi stanno nello stesso gruppo quando ne hanno lo stesso numero all’esterno. È per questo che un gruppo si comporta in modo simile.',
        imageAlt:
          'Un atomo di sodio disegnato con tre livelli di energia che contengono 2, 8 e 1 elettroni, accanto alla tavola periodica con il gruppo 1 evidenziato.',
      },
      {
        heading: 'Gruppi e periodi',
        content:
          'Un gruppo è una colonna della tavola e un periodo è una riga. Gli elementi di uno stesso gruppo hanno lo stesso numero di elettroni sul livello esterno. La colonna prevede quindi come reagisce un elemento. Il gruppo 1 sono i metalli alcalini, il gruppo 17 gli alogeni e il gruppo 18 i gas nobili. Il periodo dice quanti livelli di energia sono in uso: un elemento del periodo 3 ne usa tre. La riga ti dice così, all’incirca, quanto è grande l’atomo.',
      },
      {
        heading: 'Metalli e non metalli',
        content:
          'I metalli riempiono la sinistra e il centro della tavola, e i non metalli stanno nell’angolo in alto a destra. Un metallo conduce l’elettricità e il calore, ha una superficie lucida e si lascia battere in lamina senza rompersi. Quasi tutti i metalli sono solidi a temperatura ambiente; il mercurio è quello liquido. Un non metallo di solito conduce male, è opaco e si spezza, ammesso che sia solido. Molti non metalli sono gas. Ampliamento: alcuni elementi sulla scala che sta fra gli uni e gli altri, come il silicio, si comportano un po’ come entrambi. Si chiamano semimetalli, una parola che il programma non usa.',
      },
      {
        heading: 'Raggio atomico',
        content:
          'Gli atomi diventano più piccoli da sinistra a destra lungo un periodo. Ogni passo aggiunge un protone, e la carica positiva più grande tira più stretto lo stesso livello esterno. Gli atomi diventano più grandi scendendo lungo un gruppo, perché ogni passo verso il basso apre un nuovo livello di energia più lontano. Gli atomi più grandi stanno quindi in basso a sinistra nella tavola e i più piccoli in alto a destra.',
      },
      {
        heading: 'La reattività, e perché un gruppo si comporta allo stesso modo',
        content:
          'Puoi mettere alla prova un gruppo facendo reagire i suoi elementi con ossigeno, acqua e acidi: fra loro si comportano allo stesso modo. I metalli del gruppo 1 reagiscono con l’acqua e diventano più violenti scendendo: il litio sfrigola, il sodio sfreccia in superficie, il potassio prende fuoco. Gli stessi metalli con un acido liberano idrogeno, e ancora più in fretta. Gli elementi del gruppo 17 vanno nel verso opposto e diventano meno reattivi scendendo. Il gruppo 18 ha già il livello esterno pieno, quindi i gas nobili non reagiscono quasi con niente.',
      },
      {
        heading: 'Ordinata per numero atomico, non per massa',
        content:
          'Mendeleev ordinò la tavola per massa, e alcuni elementi finirono nel posto sbagliato. Nel 1913 Henry Moseley misurò la carica del nucleo e trovò l’ordine che funziona: il numero atomico. Il tellurio è più pesante dello iodio, ma viene prima, perché ha un protone in meno.',
        imageAlt:
          'Il tellurio e lo iodio uno accanto all’altro. Il tellurio ha la massa atomica relativa maggiore ma il numero atomico minore, e la tavola lo mette per primo.',
      },
    ],
    tables: [
      {
        heading: 'Le tre particelle',
        columns: ['Particella', 'Carica', 'Massa relativa', 'Dove si trova'],
        rows: [
          ['Protone', '+1', '1', 'nel nucleo'],
          ['Neutrone', '0', '1', 'nel nucleo'],
          ['Elettrone', '−1', 'circa 1/1836', 'intorno al nucleo'],
        ],
      },
      {
        heading: 'I primi venti elementi',
        caption:
          'La configurazione elettronica si scrive dal livello interno a quello esterno: il sodio è 2, 8, 1.',
        columns: ['Elemento', 'Simbolo', 'Numero atomico', 'Configurazione elettronica'],
        rows: [
          ['Idrogeno', 'H', '1', '1'],
          ['Elio', 'He', '2', '2'],
          ['Litio', 'Li', '3', '2, 1'],
          ['Berillio', 'Be', '4', '2, 2'],
          ['Boro', 'B', '5', '2, 3'],
          ['Carbonio', 'C', '6', '2, 4'],
          ['Azoto', 'N', '7', '2, 5'],
          ['Ossigeno', 'O', '8', '2, 6'],
          ['Fluoro', 'F', '9', '2, 7'],
          ['Neon', 'Ne', '10', '2, 8'],
          ['Sodio', 'Na', '11', '2, 8, 1'],
          ['Magnesio', 'Mg', '12', '2, 8, 2'],
          ['Alluminio', 'Al', '13', '2, 8, 3'],
          ['Silicio', 'Si', '14', '2, 8, 4'],
          ['Fosforo', 'P', '15', '2, 8, 5'],
          ['Zolfo', 'S', '16', '2, 8, 6'],
          ['Cloro', 'Cl', '17', '2, 8, 7'],
          ['Argon', 'Ar', '18', '2, 8, 8'],
          ['Potassio', 'K', '19', '2, 8, 8, 1'],
          ['Calcio', 'Ca', '20', '2, 8, 8, 2'],
        ],
      },
    ],
    commonMistakes: [
      'Disegnare gli elettroni su orbite circolari, come pianeti. Non seguono una traiettoria. Un livello è un’energia, e un elettrone sta da qualche parte in una regione intorno al nucleo, non su un punto di una linea.',
      'Credere alle dimensioni dei disegni. Se il nucleo fosse un pisello, l’atomo sarebbe un campo sportivo. Ogni schema schiaccia quella distanza per stare nella pagina, compresi quelli di questo bigino.',
      'Confondere numero atomico e numero di massa. Il numero atomico sono i protoni e dà il nome all’elemento. Il numero di massa sono protoni più neutroni.',
      'Pensare che uno ione sia un altro elemento. Perdere o acquistare un elettrone cambia la carica, non il numero di protoni. Il sodio e Na+ sono entrambi sodio.',
    ],
  },
  'isotopes-and-radioactivity': {
    title: 'Isotopi e radioattività',
    summary:
      'Che cosa cambia quando cambia il numero di neutroni: isotopi, decadimento, tempo di dimezzamento e gli elementi che è stato necessario fabbricare.',
    keyTakeaways: [
      'Gli isotopi sono atomi dello stesso elemento con un numero diverso di neutroni. Dal punto di vista chimico si comportano allo stesso modo.',
      'La massa atomica relativa è una media pesata sugli isotopi di un elemento. È per questo che così poche sono numeri interi.',
      'Un nucleo instabile decade ed emette radiazione, e lascia dietro di sé un atomo più stabile.',
      'Le specie sono tre — alfa, beta e gamma — e si distinguono per che cosa esce e per che cosa le ferma.',
      'Il tempo di dimezzamento è il tempo che serve perché metà di un campione decada. Dopo tre, ne resta un ottavo.',
      'Va da pochi secondi a miliardi di anni, ed è esattamente questo che permette di datare un passato lontanissimo.',
    ],
    formulaExampleNames: [
      'Carbonio-12',
      'Radon-222',
      'Iodio-131',
      'Cobalto-60',
      'Carbonio-14',
      'Uranio-238',
    ],
    sections: [
      {
        heading: 'I due numeri che servono a questo bigino',
        content:
          'Il numero atomico è quanti protoni ha un atomo, ed è ciò che fissa di quale elemento si tratta. Il numero di massa è protoni più neutroni. Tutto questo bigino parla del secondo numero che cambia mentre il primo resta fermo. I due termini sono un ampliamento: il programma di questi anni non ne nomina nessuno, e senza di essi qui non funziona niente.',
      },
      {
        heading: 'Isotopi',
        content:
          'Gli isotopi sono atomi di uno stesso elemento con un numero diverso di neutroni. La chimica la fanno gli elettroni, e gli isotopi ne hanno lo stesso numero, quindi reagiscono allo stesso modo. Quello che cambia è la massa, e a volte la stabilità: alcuni isotopi sono radioattivi, altri no.',
        imageAlt:
          'Tre atomi di idrogeno uno accanto all’altro: uno con un protone, uno con un protone e un neutrone, uno con un protone e due neutroni. Tutti e tre hanno un solo elettrone.',
      },
      {
        heading: 'Perché la massa atomica relativa è raramente un numero intero',
        content:
          'Un campione di un elemento è una miscela dei suoi isotopi, in proporzioni fisse. La massa atomica relativa è la media su quella miscela, pesata su quanto è comune ciascun isotopo. Il cloro è per circa tre quarti cloro-35 e per un quarto cloro-37. La media viene 35,5. Nessun singolo atomo di cloro pesa così. Questa parte è un ampliamento: la massa atomica relativa è materia delle superiori, ed è qui perché senza di essa gli isotopi non hanno senso.',
        imageAlt:
          'Una barra che mostra il 75 per cento di cloro-35 e il 25 per cento di cloro-37, con la media pesata 35,5 segnata più vicino al lato del 35.',
      },
      {
        heading: 'Nuclei instabili e le tre specie di radiazione',
        content:
          'Alcuni nuclei sono instabili. Decadono da soli, emettono radiazione e lasciano dietro di sé un atomo più stabile. Il radon-222 scaglia fuori una particella alfa, cioè due protoni e due neutroni insieme. Lo iodio-131 emette una particella beta, cioè un elettrone veloce uscito dal nucleo. Il cobalto-60 emette radiazione gamma, che è energia e non una particella. Un foglio di carta ferma l’alfa, una lamina di alluminio ferma la beta, e la gamma richiede piombo o cemento spesso.',
      },
      {
        heading: 'Tempo di dimezzamento',
        content:
          'Il tempo di dimezzamento è il tempo che serve perché metà di un campione decada. Dopo un tempo di dimezzamento ne resta metà, dopo due un quarto e dopo tre un ottavo. Per ogni isotopo è fisso: scaldarlo o farlo reagire non lo cambia. Il carbonio-14 ha un tempo di dimezzamento di circa 5730 anni. L’uranio-238 lo ha di circa 4,5 miliardi di anni, ed è per questo che c’è ancora uranio nel terreno.',
        imageAlt:
          'Una curva di decadimento che si dimezza a ogni tempo di dimezzamento, accanto alle ultime righe della tavola periodica con evidenziati gli elementi che esistono solo se fabbricati.',
      },
      {
        heading: 'Datare il passato, e 65 000 anni in Australia',
        content:
          'Il carbonio-14 si forma in alto nell’aria e finisce in ogni essere vivente. Quando qualcosa muore non ne assorbe più, e quello che ha già dentro decade. Misurare quanto ne resta data i resti, fino a circa 50 000 anni fa. Per materiale più antico serve un altro metodo. La luminescenza otticamente stimolata data l’ultima volta che un granello di sabbia ha visto la luce del giorno, e arriva molto più indietro. A Madjedbebe, un riparo sotto roccia nelle terre del popolo mirarr, nel Territorio del Nord, i due metodi sono stati applicati agli stessi depositi. Collocano i popoli aborigeni australiani e gli isolani dello Stretto di Torres nel continente australiano da almeno 65 000 anni.',
      },
      {
        heading: 'La radioattività in medicina e nell’industria',
        content:
          'La radiazione è utile perché attraversa i corpi solidi e la si può indirizzare. In medicina si segue nel corpo una piccola dose di un isotopo di vita breve per trovare un tumore. Una dose grande e concentrata serve a uccidere le cellule tumorali, e il cobalto-60 è una delle sorgenti usate per questo. Nell’industria si attraversano con radiazione gamma i pezzi destinati ad aerei e veicoli spaziali. Una crepa compare sulla pellicola dietro il pezzo, senza che nessuno debba aprirlo.',
      },
      {
        heading: 'Elementi che è stato necessario fabbricare',
        content:
          'Gli elementi dopo l’uranio non hanno isotopi stabili e non si trovano in natura. Vengono costruiti negli acceleratori sparando un nucleo contro un altro, a volte pochi atomi alla volta. Molti durano meno di un secondo e poi decadono. Questo è un ampliamento: il programma non chiede gli elementi fabbricati. Sono qui perché è così che sono state riempite le ultime righe della tavola periodica.',
      },
    ],
    commonMistakes: [
      'Disegnare gli elettroni su orbite circolari, come pianeti. Non seguono una traiettoria. Un livello è un’energia, e un elettrone sta da qualche parte in una regione intorno al nucleo, non su un punto di una linea.',
      'Credere alle dimensioni dei disegni. Se il nucleo fosse un pisello, l’atomo sarebbe un campo sportivo. Ogni schema schiaccia quella distanza per stare nella pagina, compresi quelli di questo bigino.',
      'Leggere la massa atomica relativa come un conteggio di particelle. È una media sugli isotopi: il 35,5 del cloro non è un atomo che potresti trovare.',
      'Sommare le due masse degli isotopi e dividere per due. Per il cloro viene 36, ed è sbagliato, perché il cloro-35 è tre volte più abbondante del cloro-37.',
    ],
  },
  'states-of-matter': {
    title: 'Gli stati della materia',
    summary:
      'Come sono disposte le particelle, energia cinetica e i sei passaggi di stato.',
    keyTakeaways: [
      'Solidi: le particelle vibrano in posizioni fisse; forma fissa e volume fisso.',
      'Liquidi: le particelle scivolano le une sulle altre; volume fisso, ma la forma è quella del recipiente.',
      'Gas: le particelle si muovono liberamente e in fretta; riempiono qualsiasi recipiente e si comprimono facilmente.',
      'La temperatura misura l’energia cinetica media delle particelle.',
      'Durante un passaggio di stato la temperatura non cambia: l’energia serve a rompere o a formare le attrazioni fra le particelle, non ad accelerarle.',
    ],
    formulaExampleNames: [
      'Ghiaccio (solido)',
      'Acqua (liquida)',
      'Vapore acqueo (gas)',
      'Sale sciolto (in soluzione acquosa)',
    ],
    sections: [
      {
        heading: 'I simboli di stato nelle equazioni',
        content:
          'Ogni specie di un’equazione chimica porta un simbolo di stato: (s) solido, (l) liquido, (g) gas, (aq) sciolto in acqua. «Acquoso» non è un quarto stato della materia: vuol dire che c’è un soluto sciolto in acqua liquida.',
      },
      {
        heading: 'Curve di riscaldamento e di raffreddamento',
        content:
          'In una curva di riscaldamento, i tratti orizzontali sono i passaggi di stato (fusione, ebollizione). I tratti che salgono corrispondono a un solo stato che si scalda. Il tratto dell’ebollizione è più lungo di quello della fusione, perché separare del tutto le particelle costa più energia che limitarsi ad allentarle.',
      },
    ],
    tables: [
      {
        heading: 'I sei passaggi di stato',
        columns: ['Passaggio', 'Da → A', 'Energia'],
        rows: [
          ['Fusione', 'solido → liquido', 'assorbita'],
          ['Solidificazione', 'liquido → solido', 'ceduta'],
          ['Vaporizzazione / ebollizione', 'liquido → gas', 'assorbita'],
          ['Condensazione', 'gas → liquido', 'ceduta'],
          ['Sublimazione', 'solido → gas', 'assorbita'],
          ['Brinamento', 'gas → solido', 'ceduta'],
        ],
      },
    ],
    commonMistakes: [
      '«Le particelle si dilatano quando le scaldi»: le particelle restano della stessa dimensione; quello che cresce sono gli spazi fra loro.',
      'Credere che le bolle dell’acqua che bolle siano aria: sono vapore acqueo.',
      'Confondere l’evaporazione (in superficie, a qualsiasi temperatura) con l’ebollizione (in tutto il liquido, alla temperatura di ebollizione).',
    ],
  },

  'acids-and-bases': {
    title: 'Acidi e basi',
    summary: 'pH, donatori e accettori di protoni, forte o debole, e la neutralizzazione.',
    keyTakeaways: [
      'Acido: un donatore di protoni (H+). In acqua forma ioni idronio, H3O+. pH < 7.',
      'Base: un accettore di protoni. Le basi solubili (alcali) liberano ioni idrossido, OH-, in acqua. pH > 7.',
      'Neutro: pH 7 a 25 °C; l’acqua pura e quasi tutti i sali.',
      'Neutralizzazione: acido + base → sale + acqua. L’equazione ionica è sempre H+ + OH- → H2O.',
      'Ogni gradino della scala del pH è un fattore 10 nella concentrazione di H+: un pH 2 è 100 volte più acido di un pH 4.',
    ],
    formulaExampleNames: [
      'Acido cloridrico (forte)',
      'Acido etanoico (debole)',
      'Idrossido di sodio (base forte)',
      'Ammoniaca (base debole)',
    ],
    sections: [
      {
        heading: 'Forte e debole non è lo stesso che concentrato e diluito',
        content:
          'Gli acidi forti si ionizzano del tutto in acqua (HCl, HNO3, H2SO4). Gli acidi deboli si ionizzano solo in parte (CH3COOH, H2CO3). «Concentrato» e «diluito» dicono quanto acido c’è sciolto, non quale parte si ionizza: esistono acidi forti diluiti e acidi deboli concentrati.',
        exampleNames: ['Ionizzazione di un acido forte', 'Neutralizzazione'],
      },
      {
        heading: 'Le reazioni degli acidi da riconoscere',
        content:
          'Acido + metallo → sale + idrogeno. Acido + carbonato metallico → sale + acqua + diossido di carbonio. Acido + ossido o idrossido metallico → sale + acqua. Il sale prende il nome dal metallo e dall’acido (acido cloridrico → cloruro, acido solforico → solfato, acido nitrico → nitrato).',
        exampleNames: ['Acido + metallo', 'Acido + carbonato'],
      },
    ],
    tables: [
      {
        heading: 'Riferimenti della scala del pH',
        columns: ['pH', 'Esempio', 'Colore dell’indicatore universale'],
        rows: [
          ['0–2', 'Succhi gastrici, acido delle batterie', 'Rosso'],
          ['3–6', 'Aceto, succo di limone, bibite gassate', 'Arancione → giallo'],
          ['7', 'Acqua pura', 'Verde'],
          ['8–11', 'Bicarbonato, acqua di mare, sapone', 'Blu'],
          ['12–14', 'Sgrassatore per forni, disgorgante', 'Viola'],
        ],
      },
    ],
    commonMistakes: [
      'Scrivere che gli acidi «contengono» H+: liberano H+ (sotto forma di H3O+) solo una volta sciolti in acqua.',
      'Credere che tutte le basi contengano OH: l’ammoniaca (NH3) è una base perché accetta un protone.',
      'Credere che la scala del pH finisca a 0 e a 14: le soluzioni molto concentrate vanno oltre.',
    ],
  },

  'balancing-equations': {
    title: 'Bilanciare le equazioni chimiche',
    summary:
      'Conservazione della massa: entrano ed escono gli stessi atomi. Cambia i coefficienti, mai i pedici.',
    keyTakeaways: [
      'In una reazione gli atomi si riorganizzano, non si creano e non si distruggono: ogni elemento deve esserci nello stesso numero ai due lati.',
      'I coefficienti (i numeri grandi davanti) moltiplicano tutta la formula. I pedici (i numeri piccoli dentro) definiscono la sostanza e non vanno mai cambiati.',
      'Bilancia un elemento alla volta; lascia l’idrogeno e l’ossigeno per ultimi; tratta uno ione poliatomico come un’unità se compare immutato ai due lati.',
      'I coefficienti devono formare il rapporto di numeri interi più piccolo.',
      'Scrivi sempre i simboli di stato nell’equazione finale.',
    ],
    formulaExampleNames: [
      'Non bilanciata',
      'Bilanciata',
      'Con uno ione poliatomico trattato come un’unità',
    ],
    sections: [
      {
        heading: 'Un metodo che funziona sempre',
        content:
          '1. Scrivi la formula corretta di ogni reagente e di ogni prodotto. 2. Conta gli atomi di ogni elemento per lato. 3. Comincia dall’elemento che compare in meno formule. 4. Cambia solo i coefficienti. 5. Se ti viene una frazione (per esempio 7/2 O2), moltiplica tutto per 2. 6. Ricontrolla ogni elemento. 7. Aggiungi i simboli di stato.',
        exampleNames: ['Combustione del propano'],
      },
    ],
    commonMistakes: [
      'Trasformare H2O in H2O2 per «avere più ossigeno»: quella è un’altra sostanza.',
      'Dimenticare che un coefficiente moltiplica ogni atomo della formula (2Ca(OH)2 ha 4 H).',
      'Fermarsi prima di ricontrollare ogni elemento una seconda volta.',
    ],
  },

  'reaction-types': {
    title: 'Tipi di reazioni chimiche',
    summary:
      'Riconoscere dallo schema la sintesi, la decomposizione, la combustione, lo scambio, la precipitazione e la neutralizzazione.',
    keyTakeaways: [
      'Sintesi (combinazione): due o più sostanze si uniscono; A + B → AB.',
      'Decomposizione: una sostanza si separa; AB → A + B (spesso serve calore o corrente elettrica).',
      'Combustione: combustibile + ossigeno → diossido di carbonio + acqua (combustione completa); si libera calore.',
      'Scambio semplice: un elemento più reattivo prende il posto di uno meno reattivo; A + BC → AC + B.',
      'Doppio scambio: gli ioni si scambiano il partner; AB + CD → AD + CB (la precipitazione e la neutralizzazione sono casi particolari).',
    ],
    formulaExampleNames: [
      'Sintesi',
      'Decomposizione',
      'Combustione',
      'Scambio semplice',
      'Precipitazione',
      'Neutralizzazione',
    ],
    sections: [
      {
        heading: 'Come distinguerle in fretta',
        content:
          'Conta i reagenti e i prodotti. Un solo prodotto da più reagenti → sintesi. Più prodotti da un solo reagente → decomposizione. O2 a sinistra e CO2 e H2O a destra → combustione. Un elemento e un composto che si scambiano → scambio semplice. Due composti che si scambiano gli ioni → doppio scambio; se si forma un solido è una precipitazione; se si forma acqua da un acido e da una base è una neutralizzazione.',
      },
    ],
    tables: [
      {
        heading: 'Forme generali',
        columns: ['Tipo', 'Forma generale', 'Indizio'],
        rows: [
          ['Sintesi', 'A + B → AB', 'Meno prodotti che reagenti'],
          ['Decomposizione', 'AB → A + B', 'Un solo reagente'],
          ['Combustione', 'Combustibile + O₂ → CO₂ + H₂O', 'Ossigeno fra i reagenti, si libera calore'],
          ['Scambio semplice', 'A + BC → AC + B', 'Elemento + composto'],
          ['Doppio scambio', 'AB + CD → AD + CB', 'Due composti si scambiano gli ioni'],
          ['Precipitazione', 'Ioni (aq) → solido', 'Un prodotto (s) da reagenti (aq)'],
          ['Neutralizzazione', 'Acido + base → sale + acqua', 'H⁺ + OH⁻ → H₂O'],
        ],
      },
    ],
    commonMistakes: [
      'Chiamare «combustione» ogni reazione con l’ossigeno: la ruggine è un’ossidazione lenta, non una combustione.',
      'Dimenticare che una combustione incompleta dà CO o C (fuliggine) invece di CO2.',
    ],
  },

  'chemical-bonds': {
    title: 'Legami chimici e strutture',
    summary:
      'Legame ionico, covalente e metallico, e come la struttura spiega le proprietà.',
    keyTakeaways: [
      'Gli atomi si legano per raggiungere un guscio esterno completo e stabile (una configurazione da gas nobile). Il numero del gruppo ti dice quanti elettroni di valenza ha un elemento rappresentativo.',
      'Ionico: metallo + non metallo. Si trasferiscono elettroni e si formano ioni tenuti insieme in un reticolo tridimensionale dall’attrazione elettrostatica.',
      'Covalente: non metallo + non metallo. Gli elettroni si condividono a due a due: ogni doppietto in comune fra due atomi è un legame.',
      'Metallico: atomi di metallo in un reticolo di cationi circondati da un «mare» di elettroni liberi.',
      'Le proprietà vengono dalla struttura: i reticoli sono duri e hanno punti di fusione alti; le molecole piccole fondono a bassa temperatura perché fra loro agiscono solo forze deboli.',
    ],
    formulaExampleNames: [
      'Composto ionico',
      'Molecola covalente',
      'Reticolo covalente',
      'Metallo',
    ],
    sections: [
      {
        heading: 'Perché i composti ionici conducono solo fusi o sciolti',
        content:
          'Nel reticolo solido gli ioni sono fermi al loro posto, quindi non ci sono particelle cariche che possano muoversi. Fondendo o sciogliendosi, gli ioni si liberano e il liquido conduce. I metalli conducono in tutti gli stati perché i loro elettroni liberi possono sempre muoversi.',
      },
    ],
    tables: [
      {
        heading: 'Struttura → proprietà',
        columns: ['Tipo', 'Particelle', 'Punto di fusione', 'Conduce?', 'Esempio'],
        rows: [
          ['Reticolo ionico', 'Cationi + anioni', 'Alto', 'Solo fuso o (aq)', 'NaCl, MgO'],
          ['Covalente molecolare', 'Molecole', 'Basso', 'No', 'H₂O, CO₂'],
          [
            'Reticolo covalente',
            'Atomi (tutti legati)',
            'Molto alto',
            'No (tranne la grafite)',
            'Diamante, SiO₂',
          ],
          [
            'Reticolo metallico',
            'Cationi + e⁻ liberi',
            'Alto (variabile)',
            'Sì, in tutti gli stati',
            'Cu, Fe, Al',
          ],
        ],
      },
    ],
    commonMistakes: [
      'Chiamare «molecola» il NaCl: è un reticolo; la formula è un rapporto, non una molecola.',
      'Credere che i legami covalenti siano deboli perché le sostanze molecolari fondono facilmente: i legami dentro una molecola sono forti; le forze fra le molecole sono deboli.',
      'Dare per scontato che un legame sia del tutto ionico o del tutto covalente: la differenza di elettronegatività lo colloca in una gamma di casi intermedi.',
    ],
  },

  'chemical-formulas': {
    title: 'Scrivere le formule dei composti ionici',
    summary:
      'Pareggia le cariche: prima il catione, incrocia le cariche e metti le parentesi agli ioni poliatomici ripetuti.',
    keyTakeaways: [
      'Un composto ionico non ha carica complessiva: la carica positiva totale è uguale alla carica negativa totale.',
      'Nella formula scrivi prima il catione (il metallo o NH4+) e poi l’anione.',
      'Metodo dell’incrocio: il valore della carica di ogni ione diventa il pedice dell’altro ione; poi si semplifica al rapporto più piccolo.',
      'Uno ione poliatomico è un’unità. Se te ne serve più di uno, va fra parentesi: Ca(OH)2, non CaOH2.',
      'I metalli con più cariche possibili (Fe, Cu, Pb, Sn) indicano la propria con un numero romano nel nome: ferro(III) = Fe 3+.',
    ],
    formulaExampleNames: [
      'Ossido di alluminio (3+ e 2−)',
      'Idrossido di calcio (con le parentesi)',
      'Solfato di ammonio',
      'Cloruro di ferro(III)',
      'Ossido di magnesio (2+ e 2− si semplifica)',
    ],
    sections: [
      {
        heading: 'Esempio svolto: solfato di alluminio',
        content:
          'Al 3+ e SO4 2−. Incrocia le cariche: l’Al prende il pedice 2 e il solfato il pedice 3. Il solfato è poliatomico e si ripete, quindi ha bisogno delle parentesi: Al2(SO4)3. Verifica: 2 × (+3) = +6 e 3 × (−2) = −6. Neutro.',
        exampleNames: ['Solfato di alluminio'],
      },
      {
        heading: 'Le cariche più comuni, lette sulla tavola periodica',
        content:
          'Gruppo 1 → +1, gruppo 2 → +2, Al → +3, gruppo 17 → −1, gruppo 16 → −2, N e P → −3. I metalli di transizione variano: te lo dice il nome. Per gli ioni poliatomici, usa la tabella di consultazione.',
      },
    ],
    commonMistakes: [
      'Dimenticare di semplificare: Mg2O2 deve diventare MgO.',
      'Mettere le parentesi a uno ione poliatomico che sta da solo: NaOH, non Na(OH).',
      'Scrivere prima l’anione nella formula perché in italiano si nomina per primo.',
    ],
  },

  'polyatomic-ions': {
    title: 'Ioni poliatomici',
    summary:
      'La tabella di consultazione, più gli schemi di nomenclatura che fanno sì che ci sia molto meno da imparare a memoria di quanto sembri.',
    keyTakeaways: [
      'Uno ione poliatomico è un gruppo di atomi uniti da legami covalenti che ha una carica complessiva e si muove come un’unità nelle reazioni.',
      'L’unico catione poliatomico comune è l’ammonio, NH4+. Tutti gli altri sono anioni.',
      '«-ato» ha più ossigeno di «-ito»: solfato SO4 2− contro solfito SO3 2−; nitrato NO3− contro nitrito NO2−. La carica non cambia.',
      '«per-…-ato» è un ossigeno in più di -ato; «ipo-…-ito» è uno in meno di -ito (perclorato ClO4−, clorato ClO3−, clorito ClO2−, ipoclorito ClO−).',
      'Aggiungere H+ a un anione ne alza la carica di un’unità e aggiunge «idrogeno» al nome: carbonato CO3 2− → idrogenocarbonato HCO3−.',
    ],
    formulaExampleNames: [
      'Nitrato di sodio',
      'Solfato di rame(II)',
      'Carbonato di ammonio',
      'Permanganato di potassio',
    ],
    tables: [
      {
        heading: 'Ioni poliatomici (quelli del libro dei dati di VCE)',
        caption:
          'Prima i cationi e poi gli anioni, raggruppati per carica. I nomi fra parentesi sono nomi vecchi che si incontrano ancora.',
        columns: ['Nome', 'Formula', 'Carica'],
        rows: polyatomicIonRowsIt,
      },
    ],
    sections: [
      {
        heading: 'Come impararli',
        content:
          'Impara prima gli ioni in «-ato» (solfato, nitrato, carbonato, fosfato, clorato): tutti gli altri ossoanioni sono uno schema applicato a quelli. Impara poi i quattro che escono dallo schema: idrossido OH−, cianuro CN−, ammonio NH4+ e perossido O2 2−.',
      },
      {
        heading: 'Dove compaiono',
        content:
          'Acidi: l’acido solforico è H2SO4 perché il solfato è 2−; l’acido nitrico è HNO3 perché il nitrato è 1−. Precipitazione: quasi tutti i nitrati e tutti i sali di ammonio sono solubili, quindi sono le coppie «spettatrici» di sempre. Redox: il permanganato e il dicromato sono gli ossidanti classici.',
      },
    ],
    commonMistakes: [
      'Spezzare lo ione dentro una formula (scrivere Ca(OH)2 come CaO2H2): sta sempre insieme.',
      'Trattare la carica come se fosse solo dell’ultimo atomo: è di tutto il gruppo.',
      'Confondere la carica (−2) con il numero di ossigeni: il solfato ha 4 O e carica 2−.',
    ],
  },

  'naming-compounds': {
    title: 'Dare il nome ai composti inorganici',
    summary:
      'Tre sistemi di nomenclatura – ionico, molecolare e acidi – e come capire quale si applica.',
    keyTakeaways: [
      'Decidi prima il tipo: metallo + non metallo (o NH4+) → ionico; due non metalli → molecolare; H davanti e sciolto in acqua → acido.',
      'Ionico: nome dell’anione + «di» + nome del catione; in italiano l’anione va per primo, al contrario dell’inglese. Gli anioni monoatomici finiscono in -uro (cloruro, con il caso a parte dell’ossido); quelli poliatomici tengono il loro nome (solfato). Niente prefissi: il rapporto lo fissano già le cariche.',
      'I metalli con più cariche portano un numero romano per la carica del catione: FeCl2 = cloruro di ferro(II), FeCl3 = cloruro di ferro(III). Si ricava dall’anione.',
      'Molecolare: i prefissi greci danno il numero di atomi (CO2 = diossido di carbonio, N2O4 = tetraossido di diazoto). Il prefisso «mono-» si omette sull’elemento nominato dopo «di».',
      'Acidi, a partire dall’anione: -uro → acido …idrico (HCl = acido cloridrico); -ato → acido …ico (H2SO4 = acido solforico); -ito → acido …oso (H2SO3 = acido solforoso).',
    ],
    formulaExampleNames: [
      'Nitruro di magnesio (ionico)',
      'Ossido di rame(I) (ionico, con numero romano)',
      'Pentacloruro di fosforo (molecolare)',
      'Acido nitroso (acido, dal nitrito)',
    ],
    sections: [
      {
        heading: 'Come si ricava il numero romano',
        content:
          'Per Fe2(SO4)3: il solfato è 2− e ce ne sono tre, quindi gli anioni fanno −6. I due ioni ferro devono fare +6, cioè +3 ciascuno → solfato di ferro(III). Il numero serve solo ai metalli con più di una carica comune (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni); il gruppo 1, il gruppo 2, l’alluminio, lo zinco e l’argento non lo portano mai.',
      },
    ],
    tables: [
      {
        heading: 'Prefissi greci per i composti molecolari',
        columns: ['Numero', 'Prefisso', 'Esempio'],
        rows: [
          ['1', 'mono- (si omette dopo «di»)', 'CO monossido di carbonio'],
          ['2', 'di-', 'CO₂ diossido di carbonio'],
          ['3', 'tri-', 'SO₃ triossido di zolfo'],
          ['4', 'tetra-', 'CCl₄ tetracloruro di carbonio'],
          ['5', 'penta-', 'PCl₅ pentacloruro di fosforo'],
          ['6', 'esa-', 'SF₆ esafluoruro di zolfo'],
          ['7', 'epta-', 'Cl₂O₇ eptaossido di dicloro'],
          ['8–10', 'otta-, nona-, deca-', 'P₄O₁₀ decaossido di tetrafosforo'],
        ],
      },
      {
        heading: 'Nomi degli acidi a partire dal nome dell’anione',
        columns: ['Terminazione dell’anione', 'Nome dell’acido', 'Esempio'],
        rows: [
          ['-uro', 'acido …idrico', 'Cl⁻ cloruro → HCl acido cloridrico'],
          ['-ato', 'acido …ico', 'SO₄²⁻ solfato → H₂SO₄ acido solforico'],
          ['-ito', 'acido …oso', 'NO₂⁻ nitrito → HNO₂ acido nitroso'],
        ],
      },
    ],
    commonMistakes: [
      'Usare i prefissi nei composti ionici: «dicloruro di calcio» è sbagliato; CaCl2 è cloruro di calcio.',
      'Scrivere «monoossido»: la vocale cade – monossido, tetraossido, pentaossido.',
      'Mettere un numero romano al sodio, allo zinco o all’alluminio: hanno una carica sola.',
    ],
  },

  'relative-formula-mass': {
    title: 'Massa atomica e massa formula relative',
    summary:
      'Che cosa vuol dire davvero Ar e come sommare gli atomi per ottenere la Mr di qualunque formula, pedici e parentesi compresi.',
    keyTakeaways: [
      'La massa atomica relativa (Ar) è un confronto, non un peso in grammi: un atomo di carbonio pesa quanto 12 atomi di idrogeno, quindi la sua Ar è 12.',
      'Essendo un rapporto, Ar non ha unità di misura. Niente in questo bigino si misura in grammi finché non passi a una quantità reale.',
      'La massa formula relativa (Mr) è la somma di tutti gli atomi della formula. Nient’altro: non si moltiplica alla fine e non si fa la media.',
      'Un pedice moltiplica l’atomo che lo precede. Una parentesi moltiplica tutto quello che contiene.',
      'Leggi Ar sulla tavola periodica. Non devi impararla a memoria, e una tavola scolastica arrotonda: H 1, C 12, O 16, Cl 35,5.',
      'Per un composto ionico vale la stessa idea che per una molecola, ed è per questo che si dice massa formula e non molecolare: in NaCl non c’è nessuna molecola da pesare.',
    ],
    formulaExampleNames: [
      'Acqua',
      'Diossido di carbonio',
      'Carbonato di calcio',
      'Idrossido di magnesio',
      'Nitrato di calcio',
    ],
    sections: [
      {
        heading: 'Che cosa vuol dire «relativa»',
        content:
          'Gli atomi sono troppo leggeri per pesarli uno alla volta, così i chimici li confrontano. Metti un atomo di carbonio su un piatto e atomi di idrogeno sull’altro: ne servono 12 perché la bilancia sia in equilibrio. L’idea è tutta qui: il carbonio pesa 12 volte l’idrogeno, quindi diciamo che la sua massa atomica relativa è 12. Il numero risponde alla domanda «quanti idrogeni?», ed è per questo che non ha unità: è un confronto, non una misura.',
      },
      {
        heading: 'Sommare gli atomi',
        content:
          'La massa formula relativa (Mr) è la somma delle Ar di tutti gli atomi della formula. Procedi da sinistra a destra, un elemento alla volta, e scrivi il passaggio: H2O sono 2 idrogeni da 1 ciascuno più 1 ossigeno da 16, quindi 2 + 16 = 18. L’ordine non conta e alla fine non si moltiplica niente: se ti serve la calcolatrice per qualcosa di più di una somma, c’è qualcosa che non va.',
        exampleNames: ['Ammoniaca', 'Metano', 'Acido solforico'],
      },
      {
        heading: 'Pedici e parentesi',
        content:
          'Un pedice moltiplica solo l’atomo che segue: il 2 di CO2 vuol dire due ossigeni, non due di tutto. Una parentesi moltiplica l’intero gruppo che racchiude: Mg(OH)2 è un magnesio più due unità OH, quindi 24 + 2 × 17 = 58, non 24 + 16 + 1. Quando vedi una parentesi, calcola il gruppo una volta e poi moltiplica.',
        exampleNames: ['Solfato di alluminio'],
      },
      {
        heading: 'Perché la tavola di classe non coincide con internet',
        content:
          'Un libro dei dati dà il cloro a 35,45 e l’idrogeno a 1,008, perché un campione reale è una miscela di isotopi. Una tavola scolastica arrotonda: H 1, C 12, N 14, O 16, Cl 35,5. Sono corrette entrambe: quella arrotondata si somma più facilmente ed è abbastanza precisa per qualunque domanda ti faranno. Usa la tavola della tua classe e di’ quale hai usato se il risultato è al limite.',
      },
      {
        heading: 'A che cosa serve',
        content:
          'Appena sai trovare la Mr dei due lati di un’equazione, puoi mostrare con i numeri che la massa si conserva e puoi scalare una ricetta: se 4 g di idrogeno danno 36 g di acqua, 8 g ne danno 72 g. È massa a massa per proporzione, senza nessuna mole. La mole arriva dopo, come scorciatoia per lo stesso ragionamento.',
      },
    ],
    tables: [
      {
        heading: 'I valori che usa una classe',
        caption:
          'Arrotondati come li arrotonda una tavola scolastica. Cloro e rame tengono un mezzo, perché arrotondarli all’intero rovinerebbe visibilmente un risultato.',
        columns: ['Elemento', 'Simbolo', 'Ar'],
        rows: [
          ['idrogeno', 'H', '1'],
          ['carbonio', 'C', '12'],
          ['azoto', 'N', '14'],
          ['ossigeno', 'O', '16'],
          ['sodio', 'Na', '23'],
          ['magnesio', 'Mg', '24'],
          ['alluminio', 'Al', '27'],
          ['zolfo', 'S', '32'],
          ['cloro', 'Cl', '35.5'],
          ['potassio', 'K', '39'],
          ['calcio', 'Ca', '40'],
          ['ferro', 'Fe', '56'],
          ['rame', 'Cu', '63.5'],
        ],
      },
      {
        heading: 'Esempi svolti',
        columns: ['Formula', 'Calcolo', 'Mr'],
        rows: [
          ['H2', '2 x 1', '2'],
          ['O2', '2 x 16', '32'],
          ['H2O', '2 x 1 + 16', '18'],
          ['NaCl', '23 + 35.5', '58.5'],
          ['MgO', '24 + 16', '40'],
          ['CO2', '12 + 2 x 16', '44'],
          ['CaCO3', '40 + 12 + 3 x 16', '100'],
          ['H2SO4', '2 x 1 + 32 + 4 x 16', '98'],
          ['Mg(OH)2', '24 + 2 x (16 + 1)', '58'],
          ['Ca(NO3)2', '40 + 2 x (14 + 3 x 16)', '164'],
        ],
      },
    ],
    commonMistakes: [
      'Dire che un atomo di carbonio «pesa 12»: 12 che cosa? Ar è un confronto con l’idrogeno e non ha unità. I grammi arrivano solo quando passi a una quantità reale.',
      'Applicare il pedice a tutta la formula: in CO2 il 2 riguarda solo l’ossigeno.',
      'Non vedere una parentesi, così Mg(OH)2 viene 41 invece di 58.',
      'Chiamare la Mr «massa molecolare» per NaCl o MgO. Lì non c’è nessuna molecola, ed è esattamente per questo che si chiama massa formula.',
      'Mescolare un valore del libro dei dati in un esercizio costruito sulla tavola di classe e poi stupirsi che il risultato differisca di una frazione.',
      'Fare la media delle Ar invece di sommarle.',
    ],
  },

  stoichiometry: {
    title: 'La mole e la stechiometria',
    summary:
      'Conversioni con la mole, rapporti molari, reagente limitante e resa percentuale, tutto in un posto.',
    keyTakeaways: [
      'Una mole è 6,02 × 10^23 particelle (la costante di Avogadro, N_A). La massa molare M (g/mol) è la massa di una mole: si sommano le masse atomiche della tavola periodica.',
      'Tutte le strade passano per la mole: converti in moli quello che ti danno, usa il rapporto molare dell’equazione bilanciata e riconverti in quello che ti chiedono.',
      'Il rapporto molare è il rapporto fra i coefficienti, e nient’altro.',
      'Reagente limitante: il reagente che finisce per primo decide quanto prodotto si forma. Calcola le moli di ogni reagente e dividile per il suo coefficiente; il risultato più piccolo è il limitante.',
      'Resa percentuale = (resa effettiva ÷ resa teorica) × 100. La resa teorica si ricava dal reagente limitante.',
    ],
    formulaExampleNames: ['Combustione del metano', 'Sintesi dell’ammoniaca'],
    tables: [
      {
        heading: 'Le formule di conversione',
        columns: ['Formula', 'Usala quando conosci…', 'Unità'],
        rows: [
          ['n = m ÷ M', 'la massa', 'n in mol, m in g, M in g/mol'],
          ['n = N ÷ N_A', 'il numero di particelle', 'N_A = 6,02 × 10²³ mol⁻¹'],
          ['n = c × V', 'la concentrazione di una soluzione', 'c in mol/L, V in L'],
          ['n = V ÷ V_m', 'il volume di un gas in CSA', 'V_m = 24,8 L/mol a 25 °C e 100 kPa'],
          ['PV = nRT', 'un gas in altre condizioni', 'P in kPa, V in L, T in K, R = 8,31'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Esempio svolto: massa → massa',
        content:
          'Che massa di acqua si forma quando bruciano del tutto 8,0 g di idrogeno? 2H2 + O2 → 2H2O. n(H2) = 8,0 ÷ 2,0 = 4,0 mol. Il rapporto H2 : H2O è 2 : 2, quindi n(H2O) = 4,0 mol. m(H2O) = 4,0 × 18,0 = 72 g.',
      },
      {
        heading: 'Esempio svolto: reagente limitante',
        content:
          '4,0 mol di H2 reagiscono con 1,0 mol di O2. Dividi per i coefficienti: H2 → 4,0 ÷ 2 = 2,0; O2 → 1,0 ÷ 1 = 1,0. L’ossigeno è il limitante. n(H2O) = 2 × n(O2) = 2,0 mol; avanzano 2,0 mol di H2 (in eccesso).',
      },
    ],
    commonMistakes: [
      'Usare il rapporto fra le masse invece del rapporto molare: 2 g di H2 non reagiscono con 1 g di O2.',
      'Scegliere come limitante il reagente che ha meno massa, senza passare prima alle moli.',
      'Mescolare le unità: un volume in mL con una c in mol/L dà moli 1000 volte più grandi.',
      'Arrotondare presto: tieni tutta la precisione fino al risultato finale e dai allora 3 cifre significative.',
    ],
  },

  'lewis-structures': {
    title: 'Strutture di Lewis',
    summary:
      'Conta gli elettroni di valenza, condividi fino a completare gli ottetti e verifica con la carica formale.',
    keyTakeaways: [
      'Elettroni di valenza = numero del gruppo per gli elementi rappresentativi (H 1, C 4, N 5, O 6, alogeni 7). Aggiungi un elettrone per ogni carica negativa e togline uno per ogni carica positiva.',
      'Ogni legame è un doppietto in comune fra due atomi (2 elettroni). Singolo = 1 doppietto, doppio = 2, triplo = 3. Gli elettroni che non formano legami restano come doppietti solitari.',
      'Regola dell’ottetto: quasi tutti gli atomi vogliono 8 elettroni di valenza intorno. L’idrogeno ne vuole 2 (il duetto).',
      'Se all’atomo centrale manca qualcosa per l’ottetto dopo aver distribuito tutti gli elettroni, trasforma doppietti solitari degli atomi esterni in legami aggiuntivi.',
      'Carica formale = elettroni di valenza − elettroni dei doppietti solitari − metà degli elettroni di legame. La struttura migliore è quella con le cariche formali più vicine a zero, con la carica negativa sull’atomo più elettronegativo.',
    ],
    formulaExampleNames: [
      'Acqua: 2 legami e 2 doppietti solitari sull’O',
      'Diossido di carbonio: due legami doppi',
      'Azoto: legame triplo',
      'Ione ammonio: 8 elettroni (5 + 4 − 1)',
    ],
    sections: [
      {
        heading: 'L’essenziale di terza media',
        content:
          'Ogni atomo porta i suoi elettroni esterni sotto forma di punti. Un punto da solo è un dispari; due dispari di due atomi diversi formano un doppietto di legame, cioè un legame (si disegna come una linea). I doppietti che restano su un solo atomo sono doppietti solitari. Un atomo è completo con 8 punti intorno (un ottetto); l’idrogeno è completo con 2 (un duetto). Condividi due volte fra gli stessi due atomi per un legame doppio, e tre per uno triplo. Il numero di dispari ti dice quanti legami forma un atomo: H 1, C 4, N 3, O 2, Cl 1. Lo zolfo si comporta come l’ossigeno e il fosforo come l’azoto, perché stanno negli stessi gruppi. Tutto quello che viene sotto questa sezione (carica formale, geometria VSEPR, eccezioni all’ottetto) è materia delle superiori.',
        exampleNames: [
          'Acqua: l’ossigeno condivide due volte e si tiene 2 doppietti solitari',
          'Metano: il carbonio condivide i suoi quattro dispari',
          'Ossigeno: due doppietti di legame fanno un legame doppio',
        ],
      },
      {
        heading: 'I cinque passi',
        content:
          '1. Conta il totale degli elettroni di valenza (correggilo in base alla carica). 2. Metti al centro l’atomo meno elettronegativo (mai l’H). 3. Unisci ogni atomo esterno a quello centrale con un legame singolo. 4. Sistema gli elettroni che restano come doppietti solitari, prima sugli atomi esterni e poi su quello centrale. 5. Se a quello centrale manca qualcosa per l’ottetto, forma legami doppi o tripli. Verifica che il totale degli elettroni coincida con quello del passo 1.',
      },
      {
        heading: 'Dalla struttura di Lewis alla geometria (VSEPR)',
        content:
          'Conta le regioni di elettroni intorno all’atomo centrale (ogni legame, singolo o multiplo, conta una volta; ogni doppietto solitario conta una volta). 4 regioni → tetraedrica (109,5°); con 1 doppietto solitario → piramidale trigonale (NH3); con 2 doppietti solitari → angolare (H2O). 3 regioni → trigonale planare (120°). 2 regioni → lineare (180°).',
      },
      {
        heading: 'Eccezioni all’ottetto',
        content:
          'Il Be e il B sono spesso stabili con meno di 8 (il BF3 ne ha 6). Dal periodo 3 in poi si può andare oltre 8 (il PCl5 ne ha 10 e l’SF6 ne ha 12). L’NO e l’NO2 hanno un numero dispari di elettroni, quindi c’è un atomo che non può completare l’ottetto.',
      },
    ],
    tables: [
      {
        heading: 'Elettroni di valenza per gruppo',
        columns: ['Gruppo', 'e⁻ di valenza', 'Legami che forma di solito', 'Esempi'],
        rows: [
          ['1 (H)', '1', '1', 'H'],
          ['14', '4', '4', 'C, Si'],
          ['15', '5', '3 (+1 doppietto solitario)', 'N, P'],
          ['16', '6', '2 (+2 doppietti solitari)', 'O, S'],
          ['17', '7', '1 (+3 doppietti solitari)', 'F, Cl, Br, I'],
          ['18', '8', '0', 'Ne, Ar'],
        ],
      },
    ],
    commonMistakes: [
      'Disegnare gli elettroni su orbite come se fossero pianeti: i punti dicono quanti sono, non dove stanno.',
      'Dimenticare di aggiungere elettroni a uno ione negativo (o di toglierne a uno positivo).',
      'Dare all’idrogeno più di un legame.',
      'Lasciare l’atomo centrale con meno di 8 quando un legame doppio sistemerebbe tutto (CO2, HCN).',
    ],
  },

  'organic-nomenclature': {
    title: 'Dare il nome ai composti organici',
    summary:
      'Nomi IUPAC passo per passo: la catena più lunga, i numeri più bassi, i sostituenti in ordine alfabetico e il suffisso del gruppo funzionale.',
    keyTakeaways: [
      'Cerca la catena continua di carboni più lunga che comprenda il gruppo funzionale di priorità più alta: può girare agli angoli del disegno.',
      'Numera la catena dall’estremità che dà al gruppo funzionale il numero più basso; se non c’è un gruppo funzionale, dai il numero più basso al primo sostituente.',
      'Nomina i sostituenti come prefissi con il loro numero: 2-metil, 3-cloro. Usa di-, tri- per quelli ripetuti e mettili in ordine alfabetico (senza contare di-/tri-: etil viene prima di dimetil).',
      'La radice dà la lunghezza della catena; il suffisso dà il gruppo funzionale principale: -ano, -ene, -ino, -olo, -ale, -one, acido …oico, -ammina.',
      'I numeri si separano dalle parole con i trattini e fra loro con le virgole: 2,2-dimetilpropan-1-olo.',
    ],
    formulaExampleNames: ['Propan-2-olo', 'But-1-ene', '2-metilpropano', 'Acido etanoico'],
    tables: [
      {
        heading: 'Radici in base al numero di carboni',
        columns: ['Carboni', 'Radice', 'Alcano'],
        rows: [
          ['1', 'met-', 'metano CH₄'],
          ['2', 'et-', 'etano C₂H₆'],
          ['3', 'prop-', 'propano C₃H₈'],
          ['4', 'but-', 'butano C₄H₁₀'],
          ['5', 'pent-', 'pentano C₅H₁₂'],
          ['6', 'es-', 'esano C₆H₁₄'],
          ['7', 'ept-', 'eptano C₇H₁₆'],
          ['8', 'ott-', 'ottano C₈H₁₈'],
          ['9', 'non-', 'nonano C₉H₂₀'],
          ['10', 'dec-', 'decano C₁₀H₂₂'],
        ],
      },
      {
        heading: 'Priorità dei suffissi (dalla più alta alla più bassa)',
        columns: ['Gruppo', 'Suffisso', 'Esempio'],
        rows: [
          ['Acido carbossilico', 'acido …-oico', 'acido propanoico'],
          ['Estere', '-oato di -ile', 'etanoato di metile'],
          ['Aldeide', '-ale', 'etanale'],
          ['Chetone', '-one', 'propan-2-one'],
          ['Alcol', '-olo', 'butan-2-olo'],
          ['Ammina', '-ammina', 'etanammina'],
          ['Alchene / alchino', '-ene / -ino', 'but-2-ene'],
          ['Alogenuro alchilico', 'prefisso: fluoro-, cloro-, bromo-, iodo-', '2-cloropropano'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Esempio svolto',
        content:
          'Una catena di 5 carboni con un OH sul carbonio 2 e un metile sul carbonio 3. Radice: pent-. Suffisso: -olo con il numero 2 (numerando dall’estremità più vicina all’OH). Sostituente: 3-metil. Nome: 3-metilpentan-2-olo.',
      },
    ],
    commonMistakes: [
      'Prendere la catena così com’è disegnata in orizzontale invece della catena più lunga.',
      'Numerare dall’estremità sbagliata: il gruppo funzionale comanda sui sostituenti.',
      'Mettere in ordine alfabetico partendo dal moltiplicatore: «dimetil» va sotto la m, non sotto la d.',
      'Dimenticare il numero di -ene, -olo o -one quando la catena ha 4 carboni o più.',
    ],
  },

  'functional-groups': {
    title: 'Gruppi funzionali',
    summary: 'Che aspetto ha ogni gruppo, come si chiama e quali reazioni dà.',
    keyTakeaways: [
      'Un gruppo funzionale è l’atomo o il gruppo di atomi che dà a una molecola le sue reazioni caratteristiche. Le molecole con lo stesso gruppo reagiscono allo stesso modo.',
      'Una serie omologa è una famiglia con lo stesso gruppo funzionale e una formula generale, in cui ogni membro si distingue dal precedente per un CH2. Le proprietà fisiche cambiano poco a poco lungo la serie.',
      'Idrocarburi: alcani (solo C–C, saturi), alcheni (C=C), alchini (C≡C). Solo gli alcheni e gli alchini danno reazioni di addizione.',
      'Gruppi con ossigeno: alcol (–OH), aldeide (–CHO, sul carbonio dell’estremità), chetone (C=O dentro la catena), acido carbossilico (–COOH), estere (–COO–).',
      'Gruppi con azoto e con alogeno: ammina (–NH2), ammide (–CONH2), alogenuro alchilico (–F, –Cl, –Br, –I).',
    ],
    formulaExampleNames: [
      'Etanolo (alcol)',
      'Etanale (aldeide)',
      'Propanone (chetone)',
      'Acido etanoico (acido carbossilico)',
      'Etanoato di etile (estere)',
      'Etanammina (ammina)',
    ],
    tables: [
      {
        heading: 'Tabella di consultazione dei gruppi funzionali',
        columns: ['Gruppo', 'Struttura', 'Suffisso / prefisso', 'Formula generale', 'Reazione tipica'],
        rows: [
          ['Alcano', 'solo C–C, C–H', '-ano', 'CₙH₂ₙ₊₂', 'Combustione; sostituzione con alogeni (UV)'],
          ['Alchene', 'C=C', '-ene', 'CₙH₂ₙ', 'Addizione (H₂, X₂, HX, H₂O)'],
          ['Alogenuro alchilico', 'C–X', 'alo-', 'CₙH₂ₙ₊₁X', 'Sostituzione con OH⁻ o NH₃'],
          [
            'Alcol',
            'C–OH',
            '-olo',
            'CₙH₂ₙ₊₁OH',
            'Ossidazione (primario → aldeide → acido; secondario → chetone); esterificazione',
          ],
          ['Aldeide', '–CHO', '-ale', 'CₙH₂ₙO', 'Si ossida ad acido carbossilico'],
          ['Chetone', 'C=O (interno)', '-one', 'CₙH₂ₙO', 'Resiste all’ossidazione'],
          [
            'Acido carbossilico',
            '–COOH',
            'acido …-oico',
            'CₙH₂ₙO₂',
            'Acido debole; esterificazione con un alcol',
          ],
          ['Estere', '–COO–', '-oato di -ile', '—', 'Idrolisi, che restituisce l’acido e l’alcol'],
          ['Ammina', '–NH₂', '-ammina', 'CₙH₂ₙ₊₁NH₂', 'Base debole; forma ammidi con gli acidi'],
          ['Ammide', '–CONH₂', '-ammide', '—', 'Idrolisi'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Il percorso di reazione da sapere',
        content:
          'Alchene → (H2O, con H+ da catalizzatore) → alcol. Alchene → (HX) → alogenuro alchilico → (OH−) → alcol → (Cr2O7 2−/H+) → aldeide → (altra ossidazione) → acido carbossilico → (alcol, con H2SO4 da catalizzatore) → estere. Gli alcoli primari si ossidano due volte, i secondari si ossidano una volta e danno chetoni, e i terziari non si ossidano.',
      },
      {
        heading: 'Riconoscere un gruppo in uno spettro',
        content:
          'IR: una banda larga di O–H verso 3200–3550 cm⁻¹ indica un alcol (oppure, se è molto larga e si sovrappone al C–H, un acido carbossilico); un C=O intenso vicino a 1670–1750 cm⁻¹ indica un’aldeide, un chetone, un acido, un estere o un’ammide. Il libro dei dati di VCE dà gli intervalli esatti: usalo.',
      },
    ],
    commonMistakes: [
      'Chiamare alcol una molecola con –OH su un anello benzenico (è un fenolo): è fuori dal programma di VCE, ma è una trappola frequente.',
      'Confondere un’aldeide (C=O all’estremità) con un chetone (C=O in mezzo).',
      'Credere che gli esteri siano acidi perché contengono –COO–: non hanno nessun H acido.',
    ],
  },
};
