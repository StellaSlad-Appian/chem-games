// src/i18n/explore/it.ts
//
// Italian prose for the Explore entries. See src/i18n/explore.ts for how this
// overlays onto the English structure and why `name` is present on exactly the
// fifteen molecules that carry one in English.
//
// Terminology follows docs/i18n/glossary-it.md. The decisions that already
// existed and recur here: diossido di carbonio · doppietto solitario /
// doppietto di legame · legame singolo / doppio / triplo (adjective after the
// noun, never «doppio legame») · reticolo · ione poliatomico ·
// idrogenocarbonato (glossed as «bicarbonato», which is what people say) ·
// elettroni esterni · nichel · zolfo / solfato · la mole, feminine.
//
// Terms this file had to decide because the glossary does not cover them yet.
// Each is used identically in every entry that needs it; they are listed in the
// milestone report so they can be added to the glossary:
//
//   quasicristallo · ponte perossidico / perossido · isotattico ·
//   cristallo liquido · calore latente, calore di formazione · «non fonde in
//   modo pulito» for incongruent melting · chirale / chiralità, immagine
//   speculare · il sistema R/S, regole di Cahn–Ingold–Prelog · ione complesso
//   (a family of ione poliatomico) · monostrato, pellicola (a thin film) ·
//   idrogenazione catalitica · accumulo di calore · figura di diffrazione ·
//   legame a idrogeno · amminoacido, gruppo amminico, gruppo ossidrilico,
//   gruppo carbossilico · filamento, stampo (DNA) · fertilizzante (azotato) ·
//   numero di ossidazione · cristalli geminati.
//
// Register: informal «tu», school vocabulary for a reader of about fourteen,
// one idea per sentence. Italian typography throughout — « … » with no inner
// spaces, NO space before : ; ! ?, – for parenthetical dashes (the English's em
// dashes are converted), decimal comma in prose (104,5 gradi), U+2019 for every
// apostrophe, so no string in this file needs a backslash escape.
//
// Not translated anywhere in this file: formulae and element symbols
// (`CH4 + 2O2 -> CO2 + 2H2O`, `O3`, `N2`, `H2`), temperatures and their
// units, the names of people, institutions and companies (General Electric,
// DuPont, Asahi Kasei, BASF, Royal Society, Technion, National Bureau of
// Standards, Albert Einstein College of Medicine), product and brand names
// (Freon-12, Kevlar, Moplen was deliberately *not* added), the Latin names of
// organisms (Bradyrhizobium, Phi29), the R and S descriptors, and Shechtman's
// notebook line, which is a verbatim quotation and stays in his own words.
//
// Four molecule names are byte-identical to the English because that is what
// Italian calls them: **Benzene**, **Urea**, **Limonene** and **Kevlar** (a
// brand, never translated). They need an identical-by-design allowlist entry in
// the parity test, the way `IDENTICAL_COMPOUNDS_BY_DESIGN` carries the same
// case in chemistry-names.test.ts. Inventing a different word only to clear the
// check is the one thing that allowlist exists to prevent.
//
// The Natta entry and the polypropylene entry beside it were written with extra
// care: the Politecnico di Milano, 11 marzo 1954 and *isotattico* are a story
// Italian readers are likelier than any other audience to already know, so the
// Italian has to be the version they recognise rather than a translation of an
// English retelling.

import type { ExploreOverlay } from '../explore';

export const EXPLORE_OVERLAY_IT = {
  molecules: {
    benzene: {
      // Identical to the English by design: Italian says «benzene».
      name: 'Benzene',
      everyday:
        'Il benzene è uno dei componenti minori della benzina e si produce in quantità enormi, perché è il punto di partenza di plastiche, nylon e coloranti. Una bottiglia di benzene, quasi certamente, non la vedrai mai. Il suo anello, invece, lo incontri di continuo: quell’esagono di sei atomi di carbonio sta al centro del paracetamolo, del polistirene e di alcuni amminoacidi del tuo stesso corpo. Il benzene è una causa accertata di leucemia: per questo la legge nel Regno Unito e nell’Unione europea ne ammette al massimo l’uno per cento in volume nei carburanti, e per questo i distributori sono costruiti in modo da restare sempre ventilati.',
      chemistry:
        'L’anello è fatto di sei atomi di carbonio disposti in un esagono piatto, ognuno con un idrogeno che sporge all’esterno. La cosa insolita è che sei dei suoi elettroni non appartengono a nessun legame in particolare. Sono distribuiti su tutto l’anello, sopra e sotto il piano dell’esagono. È questa distribuzione che rende il benzene molto meno reattivo di quanto tre legami doppi lascerebbero pensare, e che rende i sei legami fra carbonio e carbonio tutti esattamente della stessa lunghezza, invece di alternare tratti corti e tratti lunghi.',
    },

    'citric-acid': {
      name: 'Acido citrico',
      everyday:
        'L’acido citrico è quello che rende aspro un limone: da solo è circa il cinque per cento in peso del succo. È anche la polvere acidula che riveste le caramelle, il pizzicore di una bibita gassata, il principio attivo dell’anticalcare per il bollitore e un ingrediente di quasi ogni cibo in scatola, dove dà sapore e aiuta a evitare che il contenuto si guasti. Quasi tutto l’acido citrico in commercio, però, non viene spremuto da nessun frutto: si ottiene dando zucchero da mangiare a una muffa, che lo produce a tonnellate.',
      chemistry:
        'La molecola porta tre gruppi carbossilici, e ognuno può lasciare andare uno ione idrogeno. Questo ne fa un acido debole: in acqua cede i suoi idrogeni solo in parte, e non tutti insieme. La debolezza è proprio la parte utile. Un acido forte alla stessa concentrazione ti toglierebbe lo smalto dai denti, mentre l’acido citrico si ferma a farti storcere la bocca. Trattiene inoltre saldamente gli ioni metallici, ed è questo che stacca il calcare dalle pareti di un bollitore.',
    },

    'silicon-dioxide': {
      name: 'Diossido di silicio',
      everyday:
        'Il diossido di silicio è la sabbia, è il quarzo ed è gran parte del vetro che ti circonda. Una finestra è fatta per circa il 70 per cento di diossido di silicio, con ossidi di sodio e di calcio mescolati dentro per abbassare la temperatura di fusione fino a un valore che un forno riesca davvero a raggiungere. Lo stesso composto sta nella bustina con scritto «non mangiare» che trovi dentro una scatola di scarpe: lì è stato reso poroso, e il suo compito è invece assorbire l’acqua.',
      chemistry:
        'Nel quarzo ogni atomo di silicio è legato a quattro ossigeni e ogni ossigeno fa da ponte fra due atomi di silicio, secondo uno schema che si ripete senza fine. Nel vetro i legami sono gli stessi, ma lo schema non c’è: il reticolo è congelato alla rinfusa, perché il liquido si è raffreddato più in fretta di quanto gli atomi riuscissero a mettersi in fila. Questa differenza è tutta la differenza fra un cristallo e un vetro. Vale anche la pena di seppellire una vecchia storia: il vetro non è un liquido che scorre lentamente, e i vetri antichi sono più spessi in basso per come sono stati fabbricati, non perché siano colati verso il fondo.',
    },

    'monosodium-glutamate': {
      name: 'Glutammato monosodico',
      everyday:
        'Il glutammato monosodico è un cristallo bianco che si aggiunge a minestre, patatine, dadi da brodo e noodle istantanei. Lo stesso ione, sotto forma di glutammato libero, è quello che dà il gusto saporito al parmigiano, ai pomodori maturi, alla salsa di soia e all’alga kombu: il tuo corpo non sa distinguere i due casi, perché sono chimicamente identici. Una porzione tipica di un alimento con glutammato aggiunto ne contiene meno di mezzo grammo.',
      chemistry:
        'L’acido glutammico è un amminoacido, quindi ha un gruppo amminico a un capo e, cosa insolita, due gruppi carbossilici. Prendi il sale di sodio di uno di quei due gruppi acidi e ottieni il glutammato monosodico: «mono» perché di sodio ce n’è uno solo, non due. Sciolto in acqua si separa in uno ione sodio e uno ione glutammato, ed è lo ione glutammato a incastrarsi nel recettore della tua lingua. Il sodio è soltanto un passeggero, ed è per questo che il gusto è saporito e non salato.',
    },

    'cfc-12': {
      name: 'Diclorodifluorometano',
      everyday:
        'Venduto con il nome di Freon-12, questo gas è stato in quasi tutti i frigoriferi e in quasi tutte le bombolette spray dagli anni Trenta agli anni Novanta. Era stato scelto perché è incredibilmente poco reattivo: non brucia, non corrode niente, non è velenoso e non fa assolutamente nulla a ciò che tocca. È quello che lo rendeva sicuro da mettere in una cucina, ed è anche quello che ne ha fatto un disastro. Dal 1996 produrlo è vietato in quasi tutti i Paesi, e la quantità che resta nell’aria cala solo molto lentamente.',
      chemistry:
        'Siccome quaggiù non lo distrugge niente, una sua molecola sale verso l’alto per anni, finché non arriva nella stratosfera. Lassù la luce ultravioletta è finalmente abbastanza forte da staccarle un atomo di cloro. Quel cloro attacca l’ozono, O3, e alla fine del passaggio successivo viene restituito: così un solo atomo di cloro può girare in tondo e distruggere migliaia di molecole di ozono. È così che un gas presente in quantità minime è riuscito ad assottigliare uno strato grande quanto un continente.',
    },

    // In COMPOUNDS_REGISTRY: the name comes from chemistry-names/it.ts.
    ammonia: {
      everyday:
        'L’ammoniaca è un gas dall’odore pungente che si scioglie in acqua con estrema facilità; il liquido pungente che si usa per pulire è una sua soluzione diluita. Quasi tutta – all’incirca 180 milioni di tonnellate all’anno – finisce come fertilizzante, sparsa direttamente sui campi oppure trasformata prima in urea o in nitrato di ammonio. Un po’ di ammoniaca c’è anche nel tuo sangue: la produci tu, ogni volta che il tuo corpo demolisce delle proteine.',
      chemistry:
        'L’azoto sta al centro con tre idrogeni intorno e un doppietto di elettroni che avanza, e quel doppietto spinge la molecola a prendere la forma di una piramide schiacciata invece che di un triangolo piatto. È tutta lì la storia. Quel doppietto solitario è libero di afferrare uno ione idrogeno, ed è questo a rendere l’ammoniaca una base; ed è sempre lui a permetterle di formare legami a idrogeno con l’acqua così bene. Nell’industria si costruisce a partire da N2 e H2: l’azoto preso dall’aria, l’idrogeno quasi sempre dal gas naturale, ed è per questo che produrla libera anche moltissimo diossido di carbonio.',
    },

    cholesterol: {
      name: 'Colesterolo',
      everyday:
        'Ogni cellula animale che hai è avvolta da una membrana con del colesterolo dentro, e la maggior parte di quello che ti serve la fabbrica il tuo stesso fegato. È anche la materia prima con cui il tuo corpo costruisce la vitamina D, la bile e diversi ormoni. Lo incontri nelle uova, nella carne e nei latticini, e ha una fama che merita solo a metà: per la maggior parte delle persone, quanto colesterolo c’è nel cibo conta molto meno, per il colesterolo nel sangue, di quanti grassi saturi ci sono.',
      chemistry:
        'La molecola è fatta di quattro anelli fusi insieme – lo scheletro degli steroidi – con una corta coda di idrocarburo a un capo e un solo gruppo ossidrilico all’altro. Quell’unico ossidrile è l’unica parte della molecola a cui l’acqua piace. Così una molecola di colesterolo si sistema nella membrana cellulare nel verso giusto: l’ossidrile rivolto fuori, dove c’è l’acqua, e anelli e coda sepolti fra le catene grasse. Incastrata in quel modo, impedisce alla membrana di diventare troppo molle quando fa caldo e troppo rigida quando fa freddo.',
    },

    'oleic-acid': {
      name: 'Acido oleico',
      everyday:
        'L’acido oleico è il principale acido grasso dell’olio d’oliva – ne è circa tre quarti – ed è anche gran parte di ciò che si trova nell’olio di colza, nelle mandorle e negli avocado. È la ragione per cui quegli oli restano liquidi in dispensa. La stessa molecola è una parte importante del sebo che produce la tua pelle.',
      chemistry:
        'La molecola è una catena di diciotto atomi di carbonio con un gruppo carbossilico a un capo e un solo legame doppio nel mezzo. Quel legame doppio è cis: le due metà della catena escono dalla stessa parte, quindi la catena ha una piega fissa. Le catene piegate non riescono a impilarsi bene una contro l’altra, così restano liquide a temperature alle quali quelle diritte si sono già solidificate: è tutta qui la differenza fra un olio e un grasso duro. Aggiungi idrogeno a quel legame doppio su un catalizzatore di nichel e ottieni l’acido stearico: diciotto atomi di carbonio, nessuna piega, solido a temperatura ambiente. Fatto sui grassi veri, è così che un olio liquido diventa margarina.',
    },

    methane: {
      name: 'Metano',
      everyday:
        'Il metano è il gas naturale. Scalda le case, cuoce il cibo e produce circa un quinto dell’elettricità mondiale. Esce anche dalle zone umide, dalle risaie e dalle discariche, e lo emettono le mucche; ed è un gas serra molto più potente del diossido di carbonio, anche se si decompone nell’atmosfera nel giro di una decina d’anni, cosa che il diossido di carbonio non fa.',
      chemistry:
        'Un carbonio, quattro idrogeni, disposti come un tetraedro perché quattro doppietti di elettroni si respingono fino ad allontanarsi il più possibile. Bruciarlo è la combustione più semplice che ci sia: CH4 + 2O2 -> CO2 + 2H2O. Conta gli atomi da una parte e dall’altra e capisci perché servono esattamente due molecole di ossigeno e non una: i quattro idrogeni formano due molecole d’acqua, che usano due atomi di ossigeno, e il carbonio si prende gli altri due. Da quella singola equazione comincia la maggior parte degli esercizi di stechiometria.',
    },

    // In COMPOUNDS_REGISTRY: the name comes from chemistry-names/it.ts.
    water: {
      everyday:
        'L’acqua ricopre la maggior parte del pianeta, costituisce circa il 60 per cento di te ed è l’unica sostanza comune che ti capita di incontrare come solido, come liquido e come gas nello stesso giorno. È anche la ragione per cui uno stagno gela a partire dalla superficie: l’acqua solida è meno densa dell’acqua liquida, una stranezza che in natura è quasi unica.',
      chemistry:
        'L’ossigeno porta sei elettroni esterni e ne condivide due, uno con ciascun idrogeno. Restano così due doppietti non condivisi: i doppietti solitari. Tutti e quattro i doppietti si respingono e, siccome quelli solitari occupano più spazio di quelli di legame, la molecola finisce piegata di circa 104,5 gradi invece che diritta. Una molecola piegata, con l’ossigeno che tira gli elettroni dalla sua parte, ha un capo negativo e un capo positivo, e così le molecole si attaccano le une alle altre. È questo attaccarsi che tiene l’acqua ancora liquida a 80 °C, quando una molecola tanto leggera non avrebbe nessun diritto di essere altro che un gas.',
    },

    kevlar: {
      // Identical to the English by design: a brand name, never translated.
      name: 'Kevlar',
      everyday:
        'Il Kevlar è nei giubbotti antiproiettile, nelle giacche da moto, nei guanti antitaglio, nelle pastiglie dei freni, nelle cinture delle gomme e negli scafi delle barche da regata. Si vende come fibra gialla, si ritorce in corde e si tesse in tessuto. Il suo nome proprio, poli(parafenilentereftalammide), è la descrizione di ciò con cui è costruito, più che qualcosa che una persona pronunci davvero ad alta voce.',
      chemistry:
        'La formula qui sopra è l’unità che si ripete: un anello benzenico, un legame ammidico, un altro anello, un’altra ammide, e così via per migliaia di volte lungo una sola catena. A renderlo resistente sono poi due cose. Gli anelli tengono ogni catena rigida e diritta invece che floscia, quindi una fibra che viene tirata non ha più niente da srotolare. E i gruppi ammidici di catene vicine formano fra loro legami a idrogeno disposti in fogli piatti, così le catene non possono scivolare l’una sull’altra. A parità di peso batte l’acciaio nella trazione pura – l’acciaio vince su quasi tutto il resto, compreso il sopravvivere a un incendio.',
    },

    'lithium-cobalt-oxide': {
      name: 'Ossido di litio e cobalto',
      everyday:
        'L’ossido di litio e cobalto è l’elettrodo positivo di moltissime batterie di telefoni e computer portatili. Non lo vedrai mai: è una polvere nera, stesa su un foglio di alluminio e arrotolata dentro la cella. Il cobalto che contiene è il motivo per cui chi produce batterie continua a cercare di usarne di meno: circa tre quarti del cobalto mondiale si estrae nella Repubblica Democratica del Congo, e una parte viene da piccole miniere non controllate, con problemi reali di sicurezza e di lavoro minorile.',
      chemistry:
        'La struttura è fatta di strati: fogli di cobalto e ossigeno, con ioni litio sistemati negli spazi fra l’uno e l’altro. La carica tira fuori gli ioni litio da fra gli strati e li spinge verso l’elettrodo di carbonio all’altro capo; usare la batteria li lascia tornare indietro. Il cobalto cambia numero di ossidazione ogni volta, per tenere in pari le cariche. Non si distrugge niente e non si costruisce niente di nuovo, ed è per questo che una cella si può ricaricare centinaia di volte. Se però ne togli troppi, gli strati crollano: ed è per questo che ogni batteria ha dell’elettronica il cui unico compito è impedirtelo.',
    },

    adenine: {
      name: 'Adenina',
      everyday:
        'L’adenina è la A della A, T, C e G del DNA: una delle quattro basi il cui ordine scrive un gene. In ognuna delle tue cellule ci sono circa tre miliardi di queste lettere, e all’incirca un quarto sono adenina. Fa parte anche dell’ATP, la molecola con cui le tue cellule spostano l’energia da una parte all’altra, quindi la stai ricostruendo e spendendo in ogni secondo della giornata.',
      chemistry:
        'La molecola è formata da due anelli fusi insieme, uno a sei atomi e uno a cinque, con atomi di azoto incorporati in tutti e due. In chimica questa disposizione si chiama purina. Da uno degli anelli sporge un gruppo amminico. Nel DNA, quel gruppo amminico e uno degli azoti dell’anello formano due legami a idrogeno con una timina del filamento opposto: esattamente due, ed è per questo che l’adenina si accoppia con la timina e non con la citosina, che di legami ne chiede tre. L’accoppiamento non ha niente di magico: sono legami a idrogeno che tornano oppure non tornano.',
    },

    // In COMPOUNDS_REGISTRY: the name comes from chemistry-names/it.ts, which
    // prints the systematic *idrogenocarbonato di sodio*. The prose opens on
    // *bicarbonato*, which is what an Italian kitchen calls it.
    'sodium-bicarbonate': {
      everyday:
        'Questo è il bicarbonato di sodio. Fa lievitare i dolci, mette le bollicine in una bomba da bagno e il sollievo in una pastiglia contro l’acidità di stomaco, ed è quello che riempie molti estintori a polvere. Lo stesso composto è sciolto nel tuo sangue, dove ha il compito di impedire che l’acidità si sposti quando fai sport.',
      chemistry:
        'È un composto ionico, quindi non è fatto di molecole per niente: è un reticolo di ioni sodio e di ioni idrogenocarbonato impilati insieme. La metà interessante è lo ione idrogenocarbonato: quattro atomi che viaggiano insieme come un’unica unità con una carica negativa, che è poi il significato di «poliatomico». Passagli uno ione idrogeno preso da un acido e si sfascia in acqua e diossido di carbonio, e il diossido di carbonio è l’effervescenza. Scaldalo, invece, e succede più o meno la stessa cosa: ecco perché funziona in una torta anche senza un acido nei paraggi.',
    },

    urea: {
      // Identical to the English by design: Italian says «urea».
      name: 'Urea',
      everyday:
        'L’urea è il modo in cui il tuo corpo si libera dell’azoto che non riesce a usare: il fegato la costruisce a partire dall’ammoniaca e i reni la mandano fuori con l’urina. È anche il fertilizzante più usato al mondo: più della metà di tutto l’azoto sparso sui campi è urea. E si trova nelle creme per il viso, dove aiuta la pelle a trattenere l’acqua.',
      chemistry:
        'La molecola è un solo atomo di carbonio, con un ossigeno attaccato da un legame doppio e un gruppo amminico da una parte e dall’altra. Quasi metà della sua massa è azoto, ed è per questo che vale la pena di spedirla in giro per il mondo. Nell’industria si ricava da ammoniaca e diossido di carbonio, quindi il suo azoto è arrivato dall’aria passando per il processo Haber. Nel 1828 Friedrich Wöhler ottenne l’urea scaldando un sale inorganico, e la cosa sconcertò i chimici, perché l’urea doveva essere qualcosa che solo un essere vivente poteva produrre. La versione ordinata secondo cui quell’esperimento chiuse la discussione da un giorno all’altro è esagerata, ma lo stupore fu autentico.',
    },

    limonene: {
      // Identical to the English by design: Italian says «limonene».
      name: 'Limonene',
      everyday:
        'Se spremi la buccia di un’arancia vicino a una candela, i piccoli lampi sono limonene che prende fuoco. È l’ingrediente principale dell’olio essenziale della buccia degli agrumi, e si ricava per spremitura dalle bucce che avanzano dalla produzione di succo, a migliaia di tonnellate. Da lì finisce nei detersivi, negli sverniciatori e nel profumo di quasi tutto ciò che viene venduto come «fresco».',
      chemistry:
        'Il limonene è chirale: uno dei suoi atomi di carbonio porta quattro gruppi diversi, quindi la molecola esiste in due forme che sono l’una l’immagine speculare dell’altra. In chimica si distinguono con il sistema R/S. E qui arriva la parte che quasi tutti i libri di testo sbagliano. Dicono che una forma profuma di arancia e l’altra di limone. Misure accurate pubblicate nel 2021 hanno trovato che l’olio di arancia e l’olio di limone contengono tutti e due la stessa forma – quella R – per più del 99,9 per cento. Il limone sa di limone soprattutto per via di un’altra molecola, il citrale, e non per via di questa.',
    },

    // In COMPOUNDS_REGISTRY: the name comes from chemistry-names/it.ts.
    'sodium-sulfate': {
      everyday:
        'Il solfato di sodio si produce a milioni di tonnellate e la maggior parte finisce nei detersivi in polvere, dove è la massa dentro cui tutto il resto viene mescolato. Cristallizzato con dieci molecole d’acqua incorporate nella sua struttura si chiama sale di Glauber, e quella forma è stata usata per immagazzinare calore: fonde in una stanza calda e si solidifica di nuovo man mano che la stanza si raffredda.',
      chemistry:
        'La cosa utile succede intorno ai 32 °C. La fusione assorbe energia senza che la temperatura salga, e la solidificazione restituisce quella stessa energia: così un fusto di questo sale è un accumulo di calore che funziona a temperatura ambiente. Il problema è che non fonde in modo pulito. I cristalli si separano in solfato di sodio solido e in una soluzione satura, e il solido, essendo più denso, va a fondo, dove una parte minore riesce a ricombinarsi con l’acqua nel viaggio di ritorno. Ogni ciclo immagazzina un po’ meno del precedente. A settant’anni di distanza, è ancora il problema da risolvere.',
    },

    polypropylene: {
      name: 'Polipropilene',
      everyday:
        'Il polipropilene è la seconda plastica più prodotta al mondo. È i tappi delle bottiglie, i vasetti dello yogurt, i contenitori per alimenti che puoi mettere nel microonde, i paraurti delle automobili, le corde, le fibre dei tappeti e il tessuto non tessuto di una mascherina chirurgica. Quando vedi un triangolo del riciclo con dentro un 5, vuol dire questo.',
      chemistry:
        'La formula qui sopra è l’unità che si ripete, ed è la stessa del propene, perché quando le catene si formano non si aggiunge e non si perde niente: ogni molecola apre semplicemente il suo legame doppio e si attacca alle altre. Quello che decide se la plastica sarà buona o no è da che parte finisce per puntare ciascun gruppo metilico. Fatte con un catalizzatore qualunque, le catene sono un groviglio disordinato e la plastica è molle e debole. Fatte con un catalizzatore Ziegler–Natta, ogni metile punta dalla stessa parte, le catene si avvolgono in eliche regolari e queste si impacchettano in zone cristalline. Quella regolarità è la differenza fra una gomma appiccicosa e il paraurti di un’automobile.',
    },

    artemisinin: {
      name: 'Artemisinina',
      everyday:
        'L’artemisinina si ricava dall’artemisia annua, una pianta usata nella medicina cinese da più di duemila anni. Oggi è la base della terapia standard contro la malaria, e si somministra sempre insieme a un secondo farmaco e mai da sola, così che il parassita abbia meno probabilità di diventare resistente. Quasi tutto quello che se ne produce nel mondo si estrae ancora da piante coltivate, invece di essere sintetizzato da zero.',
      chemistry:
        'Quasi tutta la molecola è una disposizione di anelli senza niente di speciale. La parte che conta è un ponte di due atomi di ossigeno legati direttamente fra loro: un perossido. Un legame singolo fra ossigeno e ossigeno è debole e insolito, e quasi tutta la chimica evita di costruirne uno. Dentro un parassita della malaria, che è pieno del ferro dell’emoglobina che ha digerito, quel ponte si rompe e produce frammenti che distruggono il parassita dall’interno. Togli il ponte dalla molecola e il farmaco smette di funzionare: è così che si sa che è lui la parte che lavora.',
    },

    // In COMPOUNDS_REGISTRY: the name comes from chemistry-names/it.ts.
    'sodium-chloride': {
      everyday:
        'Il sale da cucina. Si estrae dalle rocce, si ricava per evaporazione dal mare, si sparge sulle strade ghiacciate e l’industria chimica lo usa come punto di partenza per il cloro, l’idrossido di sodio e l’acido cloridrico. Il tuo corpo ne ha davvero bisogno, in una certa quantità, e quasi tutti ne mangiano parecchio più di quella certa quantità.',
      chemistry:
        'In un granello di sale non c’è nessuna molecola di cloruro di sodio. Il cristallo è fatto di ioni sodio e di ioni cloruro che si alternano in tutte le direzioni: ogni ione sodio è circondato da sei ioni cloruro e ogni ione cloruro da sei ioni sodio, e così, identico, per miliardi di ioni di fila. La formula è un rapporto, uno a uno, non il conto degli atomi di una molecola. È quello schema che si ripete all’infinito a fare di questo solido un cristallo, ed è per questo che un granello si spacca in cubetti: lo stai separando lungo i piani su cui gli ioni erano già allineati.',
    },
  },

  scientists: {
    'kathleen-lonsdale': {
      work: 'Dagli anni Sessanta dell’Ottocento il benzene si disegnava come un anello di sei atomi di carbonio, ma nessuno ne aveva mai misurato uno. Kathleen Lonsdale lo fece nel 1929. Il benzene è liquido, quindi non poteva usare il benzene stesso: scelse l’esametilbenzene, un solido costruito intorno allo stesso anello. I raggi X che rimbalzano sugli strati di atomi di un cristallo formano una figura, e quella figura dice dove sono gli atomi. La sua risposta fu che i sei atomi di carbonio stanno tutti su un piano, ai vertici di un esagono regolare. Due anni dopo misurò l’esaclorobenzene e trovò che nell’anello tutti i legami fra carbonio e carbonio hanno la stessa lunghezza – circa 1,42 ångström, una via di mezzo fra un legame singolo e uno doppio.',
      legacy:
        'È per questo che il tuo libro disegna un cerchio dentro l’esagono del benzene invece di tre legami doppi: i legami sono davvero tutti uguali. Il lavoro mostrò anche che la cristallografia a raggi X poteva rispondere a domande sulle molecole, e non solo sui sali. Nel 1945 Lonsdale e la microbiologa Marjory Stephenson furono le prime due donne elette alla Royal Society.',
    },

    'soren-sorensen': {
      work: 'Gli acidi hanno forze enormemente diverse, e nel 1909 non c’era un modo ordinato per dire di quanto. Søren Sørensen studiava le proteine al laboratorio Carlsberg di Copenaghen, dove piccoli cambiamenti di acidità gli rovinavano di continuo gli esperimenti. Il numero che gli serviva era la concentrazione degli ioni idrogeno, e fra le soluzioni comuni questa copre un intervallo di più di cento milioni di milioni. Allora ne prese il logaritmo e ne cambiò il segno. Una soluzione che contiene 0,0000001 moli di ioni idrogeno per litro diventava, semplicemente, 7. Ogni gradino verso il basso della scala vuol dire dieci volte più ioni idrogeno, non uno in più.',
      legacy:
        'Quella è la scala del pH, e da allora è finita su ogni striscia per l’acqua della piscina, su ogni kit per il terreno e su ogni analisi del sangue. Sørensen non spiegò mai che cosa stesse a indicare quella p. In chimica se ne discute ancora: potenza, potenziale, o semplicemente la lettera che gli era capitato di usare per una delle sue soluzioni di prova. Non lasciarti dire che la questione è chiusa.',
    },

    'katharine-blodgett': {
      work: 'Katharine Blodgett capì come costruire un rivestimento una molecola alla volta. Il suo collega Irving Langmuir aveva mostrato che un singolo strato di una molecola grassa si distende sulla superficie dell’acqua. Blodgett scoprì che, se immergi una lastra attraverso quello strato e poi la sollevi, lo strato viene su attaccato alla lastra – e che puoi immergerla di nuovo, e ancora. Nel 1938, alla General Electric, impilò 44 strati di stearato di bario sul vetro, e il vetro smise di riflettere. La luce che rimbalza sulla superficie del rivestimento e quella che rimbalza sul vetro sottostante tornano indietro sfasate fra loro, e si annullano.',
      legacy:
        'La General Electric lo chiamò «vetro invisibile», ed era pubblicità: il vetro si vede come sempre, sono i riflessi a non vedersi. Le sue pellicole erano troppo delicate per essere vendute – bastava strofinarle per toglierle – e le lenti antiriflesso di oggi usano rivestimenti duri ottenuti per evaporazione. Ma i monostrati di Langmuir–Blodgett sono ancora il modo in cui in laboratorio si costruisce una pellicola su misura, una molecola alla volta.',
    },

    'kikunae-ikeda': {
      work: 'Kikunae Ikeda pensava che il brodo fatto con l’alga kombu avesse un sapore che non era né dolce, né aspro, né salato, né amaro. Nel 1908, all’Università imperiale di Tokyo, fece bollire fino a ridurla una dozzina di chili di alga secca e ne tirò fuori una trentina di grammi di cristalli. Si rivelarono acido glutammico: un amminoacido già noto e già presente nel grano. La novità era il collegamento: Ikeda mostrò che è lo ione glutammato ad avere il sapore di quel quinto gusto. Chiamò quel gusto umami e brevettò un modo per trasformare il glutammato in un condimento.',
      legacy:
        'Il glutammato monosodico andò in vendita l’anno successivo e oggi è nelle cucine di tutto il mondo. Il resto del mondo ci mise molto di più a dargli ragione. L’umami è stato accettato ampiamente come gusto fondamentale solo intorno al 2000, dopo che erano stati trovati sulla lingua i recettori che rispondono al glutammato. Ikeda aveva avuto ragione per novant’anni.',
    },

    'susan-solomon': {
      work: 'Nel 1985 alcuni ricercatori britannici riferirono che lo strato di ozono sopra l’Antartide si assottigliava moltissimo a ogni primavera australe. Il cloro dei CFC era il sospetto più ovvio, ma le reazioni che si conoscevano, quelle fra gas, erano troppo lente per fare tanti danni in così poco tempo. La risposta di Susan Solomon, pubblicata nel 1986, fu che le reazioni importanti non avvenivano affatto fra gas. Durante l’inverno antartico la stratosfera diventa abbastanza fredda da formare nubi di ghiaccio e acido nitrico. Sulla superficie di quelle particelle il cloro, che se ne sta bloccato in forme innocue, viene trasformato in forme che la luce del sole, al ritorno della primavera, fa a pezzi. Poi Solomon guidò due spedizioni alla base McMurdo, nel 1986 e nel 1987, e misurò i composti del cloro che la sua spiegazione prevedeva.',
      legacy:
        'È per questo che il danno è antartico, stagionale e così brusco – e la risposta arrivò mentre i governi stavano decidendo che cosa fare dei CFC. Il Protocollo di Montreal fu adottato nel 1987.',
    },

    'fritz-haber': {
      work: 'Le piante hanno bisogno di azoto, e l’aria è fatta per il 78 per cento di azoto – ma sotto forma di N2, tenuto insieme da un legame triplo che quasi niente riesce a rompere. Nel 1909 Fritz Haber lo ruppe. Lavorando con Robert Le Rossignol a Karlsruhe, spinse azoto e idrogeno l’uno contro l’altro su un catalizzatore, a circa 200 atmosfere di pressione e 500 °C, e ne uscì ammoniaca. Una dimostrazione da banco, però, non è una fabbrica. Carl Bosch, alla BASF, passò i quattro anni successivi a cercare un catalizzatore di ferro che costasse poco e a costruire recipienti d’acciaio capaci di reggere quella pressione, e il primo impianto aprì nel 1913.',
      legacy:
        'Quasi tutto il fertilizzante del mondo comincia con questa reazione; si stima che l’azoto che fornisce dia da mangiare a circa metà delle persone vive oggi. Haber diresse anche il programma tedesco di armi chimiche e sorvegliò di persona il primo attacco di massa con il cloro, a Ypres, nell’aprile del 1915. Sono la stessa persona, tutte e due le cose. Nel 1933 fu costretto a lasciare la Germania perché ebreo, e morì l’anno dopo.',
    },

    'marie-maynard-daly': {
      work: 'Marie Maynard Daly ha lavorato su due problemi molto diversi. Al Rockefeller Institute, dal 1948, insieme ad Alfred Mirsky, studiò la chimica del nucleo della cellula: le proteine istoniche intorno a cui il DNA è avvolto, e di che cosa sono fatti gli acidi nucleici. Dal 1955, con il medico Quentin Deming, passò alle arterie. I loro esperimenti, condotti soprattutto su ratti con la pressione alta, furono fra i primi a mettere insieme tre cose che fino ad allora erano state studiate separatamente: la pressione alta, il colesterolo e le arterie che si restringono.',
      legacy:
        'Quel collegamento è oggi il quadro ordinario delle malattie del cuore. È stato costruito da molti gruppi di ricerca nel giro di parecchi decenni, e Daly e Deming ne fornirono alcune delle prime prove sperimentali. Ha insegnato biochimica per venticinque anni all’Albert Einstein College of Medicine e ha finanziato una borsa di studio per studenti e studentesse neri che sceglievano la strada della scienza.',
      credit:
        'Nel 1947 divenne la prima donna nera degli Stati Uniti a ottenere un dottorato in chimica, alla Columbia, in un dipartimento in cui c’era esattamente una professoressa.',
    },

    'paul-sabatier': {
      work: 'Un legame doppio fra due atomi di carbonio non accetta idrogeno così, semplicemente, per quanto idrogeno tu gliene offra. Nel 1897, a Tolosa, Paul Sabatier e Jean-Baptiste Senderens scoprirono che il nichel finemente suddiviso cambia completamente le cose. Il metallo afferra sulla propria superficie sia l’idrogeno sia il legame doppio, li tiene uno accanto all’altro e li lascia unire. Alla fine il nichel è rimasto com’era: è un catalizzatore, e per giunta a buon mercato. La versione di Sabatier funzionava sui vapori. Quattro anni dopo Wilhelm Normann, in Germania, adattò la stessa chimica agli oli liquidi – ed è quello il passaggio che trasforma un olio vegetale fluido in un grasso solido.',
      legacy:
        'L’idrogenazione catalitica è oggi una delle reazioni più usate nell’industria, dalla margarina ai medicinali. Sabatier divise il premio Nobel del 1912 con Victor Grignard, per lavori distinti e non per una collaborazione.',
      credit:
        'Senderens, che nel 1897 aveva fatto quegli esperimenti insieme a lui, fu lasciato fuori da quel premio: un’esclusione che in chimica si ricorda ancora in sua difesa.',
    },

    'reatha-clark-king': {
      work: 'Per giudicare se un propellente per razzi valga la pena serve un numero: quanta energia esce esattamente quando brucia. Reatha Clark King misurò quei numeri per i composti del fluoro al National Bureau of Standards, negli anni Sessanta. Il fluoro è l’elemento più reattivo che esista, e il difluoruro di ossigeno attacca quasi tutto ciò dentro cui provi a bruciarlo. King progettò un bruciatore di nichel con un tubo a spirale, che permetteva di raffreddare e di controllare la fiamma invece di lasciarle distruggere l’apparecchio, e ottenne per il difluoruro di ossigeno un calore di formazione abbastanza preciso da poter essere pubblicato. Le valse il premio dell’istituto per il miglior articolo dell’anno.',
      legacy:
        'Quei numeri confluirono nella valutazione dei composti del fluoro come ossidanti per i razzi. Non hanno mai volato: sono troppo tossici e troppo corrosivi per essere maneggiati su quella scala – e scoprirlo è esattamente ciò a cui servono le misure. King è poi diventata rettrice di un’università e in seguito ha guidato la General Mills Foundation.',
    },

    'gilbert-lewis': {
      work: 'Prima del 1916 un legame chimico era una linea tracciata sulla carta, senza niente che la spiegasse. Gilbert Lewis la spiegazione la fornì: un legame è un doppietto di elettroni che due atomi condividono. Gli atomi tendono a ritrovarsi con otto elettroni nel guscio esterno, e condividere è uno dei modi per arrivarci. Quegli elettroni lui li disegnò come puntini, ed è per questo che uno schema di puntini intorno a un simbolo chimico si chiama struttura di Lewis. Nel 1923 aggiunse una seconda idea: che un acido è tutto ciò che accetta un doppietto di elettroni e una base è tutto ciò che lo cede, una definizione che comprende anche reazioni in cui di idrogeno non ce n’è affatto.',
      legacy:
        'Irving Langmuir sviluppò e fece conoscere lo stesso quadro, diede alla chimica la parola «covalente», e per anni la teoria fu conosciuta come teoria di Lewis–Langmuir. Lewis fu candidato al premio Nobel decine di volte e non lo vinse mai. Ogni schema a puntini che disegni è suo.',
    },

    'stephanie-kwolek': {
      work: 'Nel 1965, alla DuPont, Stephanie Kwolek sciolse un polimero rigido, fatto di catene a forma di bastoncino, e ottenne una soluzione che sembrava sbagliata. Una soluzione di polimero è densa, sciropposa e trasparente; la sua era fluida e torbida. Torbida di solito voleva dire pezzetti non sciolti che avrebbero intasato la macchina per la filatura, e la reazione normale era buttarla via. Kwolek la filtrò per dimostrare che era pulita, e convinse il tecnico a filarla lo stesso. La torbidezza era proprio il punto: dentro il liquido le catene rigide si stavano allineando fianco a fianco, come fa un cristallo liquido. Filate in una fibra, restarono allineate.',
      legacy:
        'È quell’allineamento che rende la fibra – venduta dal 1971 con il nome di Kevlar – così difficile da strappare: a parità di peso fa meglio dell’acciaio. Giubbotti antiproiettile, guanti antitaglio, pastiglie dei freni e scafi di barche ci contano sopra. Trasformare la scoperta in un prodotto richiese una squadra della DuPont, e in particolare Herbert Blades, che trovò il modo di filarla su scala industriale.',
    },

    'akira-yoshino': {
      work: 'Le prime batterie al litio ricaricabili usavano litio metallico, e il litio metallico fa crescere delle punte a ogni ricarica. Prima o poi una punta arriva all’altro elettrodo e la batteria prende fuoco. Nel 1985 Akira Yoshino, alla Asahi Kasei, costruì una cella che di litio metallico non ne conteneva affatto. Accoppiò l’ossido di litio e cobalto di John Goodenough, come elettrodo positivo, con un materiale di carbonio – il coke di petrolio – come elettrodo negativo. Gli ioni litio entrano ed escono da tutti e due gli elettrodi, invece di depositarsi come metallo. La carica li spinge da una parte; usare la batteria li lascia tornare indietro.',
      legacy:
        'Questa è la batteria agli ioni di litio che hai nel telefono, e la prima la mise in vendita Sony nel 1991. Yoshino ha diviso il premio Nobel del 2019 con Goodenough e Stanley Whittingham: tre persone, tre tappe, una sola batteria.',
    },

    'margarita-salas': {
      work: 'Phi29 è un virus che infetta i batteri, e Margarita Salas ha passato trent’anni a scoprire come fa a copiare il proprio DNA. Nel 1984 il suo gruppo di Madrid, insieme a Luis Blanco, isolò la sua DNA polimerasi – l’enzima che fa le copie – e la trovò insolita in tre modi tutti insieme. Si tiene stretta allo stampo e copia decine di migliaia di basi senza mollare mai la presa. Scosta da sé il filamento opposto mentre procede, quindi non ha bisogno di un secondo enzima che apra l’elica. E rilegge quello che ha scritto e lo corregge, così sbaglia pochissimo.',
      legacy:
        'Metti insieme queste tre cose e una quantità piccolissima di DNA si può copiare fino a ottenerne una quantità utile, a una temperatura sempre uguale, senza i continui riscaldamenti e raffreddamenti che la PCR richiede. Si usa sulle tracce nelle indagini forensi, su singole cellule e sul DNA recuperato dagli archeologi. Il brevetto è diventato il più redditizio che il consiglio nazionale delle ricerche spagnolo abbia mai avuto.',
    },

    'alfred-werner': {
      work: 'Certi composti si rifiutavano di rientrare nelle regole. Il cloruro di cobalto con sei molecole di ammoniaca attaccate si comportava come se tutti e tre i suoi cloruri fossero liberi; con cinque ammoniache, liberi ne erano solo due. Nel 1893 Alfred Werner, che allora aveva 26 anni, disse che il motivo è che in uno ione metallico ci sono due cose distinte: una carica da bilanciare e un numero fisso di posti, tutt’intorno allo ione, in cui molecole o ioni possono attaccarsi. Per il cobalto quel numero è sei, disposti ai vertici di un ottaedro. Tutto questo non poteva vederlo. Lo dimostrò contando: un ottaedro prevede esattamente due forme per un composto con quattro gruppi di un tipo e due di un altro, e due era sempre quello che trovava.',
      legacy:
        'Werner vinse il premio Nobel del 1913, primo chimico svizzero e primo chimico inorganico a riuscirci. Gli ioni complessi come i suoi sono una famiglia di ioni poliatomici: un metallo al centro, con delle molecole agganciate intorno. La maggior parte degli ioni poliatomici che studi, come il solfato e il nitrato, non sono affatto complessi.',
    },

    'johanna-dobereiner': {
      work: 'Le leguminose – fagioli, piselli, soia – non hanno bisogno che qualcuno dia loro dell’azoto. Ospitano dei batteri dentro noduli sulle radici, e quei batteri prendono l’N2 direttamente dall’aria e lo trasformano in ammoniaca che la pianta può usare. Johanna Döbereiner, che lavorava in Brasile dal 1950, si chiese se quel meccanismo potesse reggere una coltura commerciale in un terreno tropicale; all’epoca l’agricoltura brasiliana copiava il modello statunitense e riversava sui campi fertilizzante azotato. Cercò ceppi di Bradyrhizobium adatti ai terreni brasiliani e alle varietà brasiliane di soia, li provò in campo e portò i risultati dentro un programma nazionale per il trattamento delle sementi. Il suo gruppo diede anche il nome a diverse nuove specie capaci di fissare l’azoto.',
      legacy:
        'La soia brasiliana ricava oggi praticamente tutto il suo azoto dai batteri e non da un sacco. Una stima del 2021 valuta il risparmio in più di quattordici miliardi di dollari a raccolto. Fosforo e potassio servono ancora, quindi non è agricoltura senza fertilizzanti: è agricoltura senza fertilizzante azotato, che è la metà più difficile.',
    },

    'vladimir-prelog': {
      work: 'Certe molecole esistono in due forme che sono l’una l’immagine speculare dell’altra, come le tue due mani, e per quanto le giri non farai mai diventare una l’altra. Questo in chimica si vedeva; quello che mancava era un modo condiviso per dire quale è quale. Vladimir Prelog si unì a Robert Cahn e a Christopher Ingold, e nel 1956 i tre pubblicarono le regole che risolvono la questione. Guardi i quattro gruppi attaccati al carbonio e li metti in ordine, prima quello con l’atomo più pesante. Poi giri la molecola in modo che il gruppo all’ultimo posto punti lontano da te, e leggi gli altri tre: in senso orario è R, in senso antiorario è S.',
      legacy:
        'Sono le regole di Cahn–Ingold–Prelog, ed è grazie a loro che una R o una S dentro il nome di una sostanza vogliono dire la stessa cosa in ogni laboratorio e in ogni lingua. La cosa conta, perché due forme speculari di uno stesso farmaco possono comportarsi in modo completamente diverso dentro un corpo. Prelog era nato a Sarajevo, era cresciuto a Zagabria, fuggì a Zurigo nel 1941 e divise il premio Nobel del 1975 con John Cornforth.',
    },

    'maria-telkes': {
      work: 'Il sole arriva di giorno e il calore lo vuoi di notte, quindi una casa solare ha bisogno di un posto dove tenerlo da parte. Mária Telkes scelse una risposta chimica invece di un serbatoio d’acqua calda. Il sale di Glauber – cristalli di solfato di sodio con dell’acqua incorporata – fonde intorno ai 32 °C. Fondere un solido assorbe energia senza alzarne la temperatura, e quell’energia torna fuori quando il solido si solidifica di nuovo. Così una certa massa di quel sale immagazzina molto più calore della stessa massa d’acqua scaldata. Nel 1948 costruì la Dover Sun House, in Massachusetts, insieme all’architetta Eleanor Raymond: fusti di sale sistemati dentro le pareti.',
      legacy:
        'Una famiglia ci ha vissuto, riscaldata dal solo sole, per due inverni e parte di un terzo. Poi la casa smise di funzionare. Il sale non fonde in modo pulito, quindi il solido si deposita sul fondo e a ogni ciclo se ne ricombina un po’ meno; e la soluzione salata corrose i fusti d’acciaio. È chimica, non edilizia fatta male – ed è ancora oggi l’ostacolo principale per l’accumulo di calore nei sali.',
    },

    'giulio-natta': {
      work: 'Le molecole di propene si uniscono volentieri in catene lunghe, ma se si uniscono rivolte ognuna come le pare la catena è un groviglio, con i gruppi metilici che sporgono da tutte e due le parti, e la plastica è molle e debole. L’11 marzo 1954, al Politecnico di Milano, Giulio Natta ottenne una catena in cui ogni gruppo metilico punta dalla stessa parte. Usò un catalizzatore del tipo che aveva messo a punto Karl Ziegler, capace di tenere ferma ogni molecola in arrivo in un orientamento fisso finché non si è attaccata. Quella disposizione regolare Natta la chiamò isotattica. Le catene regolari possono impacchettarsi strette una contro l’altra e allinearsi in cristalli; quelle aggrovigliate no.',
      legacy:
        'È per questo che il polipropilene è rigido, resistente e abbastanza leggero da essere dappertutto: tappi delle bottiglie, paraurti delle automobili, corde, contenitori per alimenti, maglie termiche. Natta e Ziegler divisero il premio Nobel del 1963.',
      credit:
        'Ziegler non fu contento di doverlo dividere. Natta era arrivato alla reazione passando per la chimica dei catalizzatori di Ziegler, e le due parti passarono più di vent’anni in tribunale per i brevetti, con esiti in gran parte favorevoli a Ziegler.',
    },

    'tu-youyou': {
      work: 'I parassiti della malaria erano diventati resistenti ai farmaci di allora e, nel 1969, Tu Youyou fu messa a capo del gruppo del suo istituto dentro il Progetto 523, una ricerca segreta cinese di un farmaco nuovo. La sua squadra provò centinaia di estratti di piante usate nella medicina tradizionale. L’artemisia annua funzionava certe volte e altre no. Leggendo un manuale di prescrizioni d’emergenza del IV secolo, notò che diceva di mettere la pianta a bagno in acqua fredda e di strizzarne il succo, non di farla bollire. Se a distruggere il composto attivo era il calore, allora il problema era l’estrazione. Passò all’etere, che bolle a 35 °C, e nell’ottobre del 1971 ottenne un estratto che uccideva i parassiti tutte le volte.',
      legacy:
        'Il composto puro, l’artemisinina, arrivò nel 1972. L’artemisinina insieme a un secondo farmaco è oggi la terapia raccomandata dall’Organizzazione mondiale della sanità, e ha salvato milioni di vite. Al Progetto 523 hanno preso parte centinaia di ricercatrici e ricercatori in tutta la Cina, e su come vada diviso il merito in Cina si discute ancora.',
      credit:
        'Tu ha vinto un premio Nobel nel 2015 senza dottorato, senza avere studiato all’estero e senza far parte delle accademie cinesi: in patria la chiamano «la scienziata dei tre no».',
    },

    'dan-shechtman': {
      work: 'I cristalli si ripetono. Non era un’ipotesi, era la definizione: gli atomi stanno in uno schema che si ricopia da sé all’infinito in tutte le direzioni, e uno schema così non può avere una simmetria a cinque o a dieci punte – non puoi piastrellare un pavimento con dei pentagoni senza lasciare buchi. L’8 aprile 1982, distaccato dal Technion di Haifa presso un laboratorio del governo statunitense, Dan Shechtman sparò degli elettroni attraverso una lega di alluminio e manganese raffreddata rapidamente, e ottenne una figura di diffrazione con una simmetria a dieci punte. L’appunto sul suo quaderno, per quel campione, dice «10 fold ???». Gli atomi erano ordinati alla perfezione – potevi dire dove sarebbe andato il successivo – ma la disposizione non si ripeteva mai.',
      legacy:
        'Ci vollero anni perché la cosa fosse accettata. Linus Pauling sostenne per iscritto che il campione era semplicemente fatto di cristalli geminati, e non cambiò mai idea. Le prove si accumularono lo stesso e nel 1992 l’Unione internazionale di cristallografia riscrisse la propria definizione di cristallo, per fare posto agli schemi che non si ripetono. Shechtman ha vinto il premio Nobel per la chimica del 2011. Da allora i quasicristalli sono stati trovati anche in natura, dentro un meteorite.',
    },
  },
} satisfies ExploreOverlay;
