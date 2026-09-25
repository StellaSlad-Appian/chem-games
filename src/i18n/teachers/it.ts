// src/i18n/teachers/it.ts
//
// Italian (it) copy for the For Teachers page.
//
// This is a per-page catalogue, not part of the shared dictionary, because
// src/app/[lang]/layout.tsx hands the whole dictionary to I18nProvider and so
// serializes every byte of it into the RSC payload of every page. This page is
// the copy's only reader and it is a Server Component, so none of it needs to
// travel anywhere else — see docs/i18n/README.md § "The dictionary is a budget,
// and a game will eat it", which is the same reasoning that moved the game
// catalogues out.
//
// La pagina «Per chi insegna».
//
// **Address: formal "Lei", and only here.** The rest of it.ts uses "tu", and
// rightly: Italian school material addresses a student that way. This page
// has no student reader — it is written for the adult deciding whether to
// use the site in class — so "Lei" is the register, and the departure is
// confined to this namespace. Flagged for a native reviewer.
//
// Terms: *chi insegna* / *chi studia*, the headless relatives the glossary
// uses to stay gender-neutral; "elettrone spaiato" and "doppietto solitario"
// (the formal terms, correct for explaining prose — the game word *dispari*
// belongs in the game); *indizio* for a hint, per the note at the top. The
// year band is **terza media / primo superiore**, never *liceo*, which names
// ages 16–19.

import type { TeachersCopy } from './en';

export const it = {
  heading: 'Per chi insegna',
  intro:
    'Che cos’è Games in Chemistry, che cosa c’è nel sito e come può contribuire a dargli forma. Tutte le altre pagine sono scritte per chi studia e gioca; questa è scritta per Lei.',

  betaHeading: 'Il sito è in beta',
  betaBody:
    'Games in Chemistry è ancora in costruzione. I giochi cambiano, ne arrivano di nuovi e il testo di un indizio o di un bigino il mese prossimo può essere diverso. Tutto funziona e tutto è gratuito, ma provi una partita di persona prima di portare un gioco in classe.',

  whatHeading: 'Di che cosa si tratta',
  whatBody1:
    'Una raccolta di minigiochi di chimica gratuiti che girano nel browser. Non c’è nulla da installare e nessun account da creare: si apre un gioco e si comincia.',
  whatBody2:
    'Sono pensati per la terza media e il primo superiore, cioè dai 14 ai 16 anni. Ogni gioco allena una sola abilità in partite brevi e, davanti a una risposta sbagliata, spiega che cosa non andava e che cosa provare dopo, invece di limitarsi a segnarla.',
  whatBody3:
    'L’account è facoltativo. Conserva i punteggi e i progressi e mette un alias nelle classifiche; i giochi in sé non cambiano.',

  onSiteHeading: 'Che cosa c’è nel sito',
  gamesIntro: 'Cinque giochi sono finiti. Ognuno allena una cosa sola:',
  gameAcid: 'Classificare un composto come acido, base o neutro dalla sola formula.',
  gameBlaster: 'Leggere formule a tutta velocità e distinguere quelle quasi identiche.',
  gameNeutralise:
    'Scegliere H⁺ oppure OH⁻ per neutralizzare ciò che punta verso il laboratorio.',
  gameBalancer:
    'Bilanciare un’equazione un coefficiente alla volta, con il conteggio degli atomi dei due lati sempre in vista.',
  gameLewis:
    'Accoppiare gli elettroni spaiati in legami e doppietti solitari per costruire una struttura di Lewis.',
  sheetsHeading: 'Bigini',
  sheetsIntro:
    'Quindici bigini raccolgono il materiale di consultazione su cui i giochi si appoggiano. Ognuno sta in una pagina, si legge bene dal proiettore e si può stampare:',

  exploreHeading: 'Esplora',
  exploreBody1:
    'Ogni lunedì una nuova molecola e una nuova persona della chimica, spiegate in poche sezioni brevi: dove si incontra nella vita di tutti i giorni, come funziona e perché la persona dietro di essa è stata importante.',
  exploreBody2:
    'Passata la sua settimana, ogni scheda mantiene un link permanente, e l’archivio le conserva tutte — così una lezione può rimandare a una molecola o a una persona di mesi fa con la stessa facilità di quella di questa settimana. La settimana in corso è sulla pagina {link}.',
  exploreLinkLabel: 'Esplora',

  languagesHeading: 'Lingue',
  languagesBody1:
    'Il sito esiste in sei lingue: inglese, tedesco, francese, spagnolo, italiano e russo. Il selettore è nella barra di navigazione e la scelta viene ricordata su quel browser.',
  languagesBody2:
    'Tutto ciò che legge chi studia è tradotto: l’interfaccia, l’accompagnamento e gli indizi dentro i giochi, e i bigini. Le formule chimiche, i simboli degli elementi e le equazioni non vengono mai tradotti; un’equazione si scrive allo stesso modo in tutte le lingue.',
  languagesBody3:
    'Su un bigino in una lingua diversa dall’inglese mancano due cose. Non porta nessun link esterno, perché tutti i siti a cui rimandiamo sono in inglese, e non cita nessun programma, perché l’unico che abbiamo è il Victorian Curriculum, che è australiano. Mettere davanti a chi studia del materiale che non può usare è peggio che lasciarlo fuori, quindi entrambe le cose vengono trattenute anziché tradotte. Gli equivalenti locali – una corrispondenza di programma per ogni Paese e link che chi studia possa leggere – non sono ancora stati cercati.',

  privacyHeading: 'Privacy di chi studia',
  privacyBody1:
    'In questo sito non ci sono strumenti di analisi, né pubblicità, né tracciatori di terze parti. Quello che qualcuno fa qui non viene misurato per nessun altro.',
  privacyBody2:
    'Per giocare non serve un account. Di chi gioca senza non resta traccia sul sito: è il suo browser a conservare le preferenze di suono, di tema e di accessibilità e il fatto di aver già visto le istruzioni di ciascun gioco, e un solo cookie viaggia con le sue richieste — contiene soltanto la lingua scelta.',
  privacyBody3:
    'Chi invece accede indica un indirizzo email e riceve un alias generato – mai un nome vero – e da quel momento il sito conserva i punteggi, i livelli raggiunti, i campi facoltativi del profilo che decide di compilare e le impostazioni di visibilità. Che cosa di tutto questo è pubblico, e come cancellare un account e tutto ciò che contiene, è spiegato nella pagina {link}.',
  privacyLinkLabel: 'informativa privacy',

  accessibilityHeading: 'Accessibilità',
  accessibilityBody1:
    'L’obiettivo è il livello AA delle WCAG 2.2. È un obiettivo e non una garanzia: il sito non è stato sottoposto a verifica e alcune parti non arrivano ancora a quel livello.',
  accessibilityBody2:
    'Che cosa regge oggi: il colore non è mai l’unica cosa che porta significato, i pulsanti con la sola icona hanno un nome testuale per gli screen reader, le pagine si riadattano allo schermo di un telefono e allo zoom al 200 % senza scorrimento orizzontale, il focus è sempre visibile e quasi tutte le animazioni si spengono da sole quando il sistema chiede meno movimento.',
  accessibilityBody3:
    'Che cosa non regge, ed è meglio saperlo prima di preparare una lezione: {blaster} richiede il mouse o il dito, perché le sue bolle in movimento non si raggiungono affatto da tastiera. I conti alla rovescia di {blaster} e {neutralise} non si possono ancora rallentare né spegnere. I cambiamenti di punteggio, di indizio o di messaggio di errore non vengono annunciati agli screen reader. L’uso della tastiera nei tre giochi arcade non è stato verificato gioco per gioco: lo consideri non verificato anziché supportato.',
  accessibilityBody4:
    '{balancer} e {lewis} sono i due giochi costruiti fin dall’inizio per la tastiera e collaudati così. Se in classe c’è chi lavora da tastiera, cominci da lì.',

  collaborateHeading: 'Chi insegna e collabora',
  collaborateWhat:
    'Cerco alcune persone che insegnano e vogliono aiutare a dare forma a questo progetto. Vuol dire una di due cose, o entrambe: raccontarmi com’è andato davvero un gioco con una classe – che cosa ha confuso chi studia, quale formulazione non ha funzionato, che cosa era troppo facile – e proporre giochi che mancano e che varrebbe la pena costruire.',
  collaborateCommitment:
    'Non c’è un impegno minimo né un calendario. Un messaggio a quadrimestre è utile. Un solo messaggio, una volta sola, è utile lo stesso.',
  collaborateThanks:
    'In cambio, chi collabora riceve l’accesso gratuito alla versione 1.0 e alla versione 2.0 dei giochi non appena quelle versioni esisteranno.',
  collaborateFreeNow:
    'Perché sia chiaro quanto vale: in questo momento tutto il sito è gratuito e resterà tale per tutta la beta. L’offerta riguarda le versioni a pagamento che verranno dopo, non qualcosa che oggi si starebbe pagando.',
  collaborateCta: 'Per proporsi, compili il modulo nella pagina {link}.',
  collaborateCtaLinkLabel: 'di iscrizione',

  collaborateMetaTitle: 'Iscriversi fra chi collabora | Per chi insegna | Games in Chemistry',
  collaborateMetaDescription:
    'Dia un parere sui giochi o ne proponga di nuovi, e riceva in cambio l’accesso gratuito alla versione 1.0 e alla versione 2.0.',
  backToTeachers: 'Torna a «Per chi insegna»',
  collaborateHow:
    'Per proporsi, compili il modulo qui sotto. L’indirizzo e-mail è l’unica cosa di cui ho davvero bisogno; il resto serve a farmi sapere qualcosa della sua classe prima di risponderle, e può saltarlo tutto.',
  collaborateReply:
    'Leggo tutto e rispondo, ma qui lavora una persona sola e lo fa accanto a un altro lavoro: metta in conto un paio di settimane invece di un paio di giorni e, per favore, non legga il silenzio come un no.',
  collaborateRecords:
    'Perché un modulo e non il pulsante delle segnalazioni, a cui questa pagina rimandava prima: le segnalazioni arrivano in una casella di posta, e una casella di posta non è un elenco. Senza un posto stabile in cui tenere un indirizzo, la promessa delle versioni 1.0 e 2.0 non sarebbe mantenibile. È tutta qui la ragione per cui qui si chiede un indirizzo.',

  // Il modulo di iscrizione. La pagina ne passa le stringhe come props a
  // `CollaboratorForm`; il componente non importa mai questo catalogo — si
  // veda docs/COLLABORATORS.md § 4.
  formHeading: 'Iscriversi fra chi collabora',
  formIntro:
    'Qui non è obbligatorio nulla tranne l’indirizzo e-mail. Lasci pure in bianco il resto: gli altri campi servono a me e nessuno di essi è una condizione.',
  formUse:
    'Il suo indirizzo serve a contattarla a proposito dei giochi e a darle l’accesso alla versione 1.0 e alla versione 2.0. Nient’altro, e non viene mai passato a nessuno. Non le viene inviata nemmeno una e-mail di conferma: la prossima cosa che riceverà da me sarà una risposta scritta a mano.',
  formDelete:
    'Può far cancellare i suoi dati quando vuole, e per farlo non le servono né un account né un modulo: scriva a {email} che desidera uscire dall’elenco e la voce viene rimossa.',
  formOptional: 'facoltativo',

  formEmailLabel: 'Indirizzo e-mail',
  formEmailHelp: 'L’indirizzo a cui preferisce che le scriva.',
  formNameLabel: 'Il suo nome',
  formSchoolLabel: 'Scuola',
  formCountryLabel: 'Paese',
  formYearLevelsLabel: 'Anni di corso in cui insegna',
  formYearLevelsHelp: 'Come li chiama la sua scuola — per esempio terza media e primo superiore.',
  formSubjectsLabel: 'Materie che insegna',
  formSubjectsHelp: 'Per esempio scienze e chimica.',
  formMessageLabel: 'In che cosa vorrebbe dare una mano',
  formMessageHelp:
    'Com’è andato un gioco con una classe, un’idea per uno che ancora non c’è, o entrambe le cose. Basta una frase.',

  formSubmit: 'Mi propongo',
  formSubmitting: 'Invio in corso…',
  formSuccessTitle: 'Grazie — è nell’elenco.',
  formSuccessBody:
    'Nel frattempo non succede altro: non c’è nessuna e-mail di conferma in arrivo e il suo indirizzo non serve a niente se non a risponderle.',
  formGenericError:
    'Qualcosa è andato storto e l’iscrizione non è stata salvata. Riprovi fra un momento.',

  feedbackHeading: 'Segnalare un errore',
  feedbackBody1:
    'Il pulsante delle segnalazioni sta in basso a destra in ogni pagina e funziona senza account. Offre tre categorie: un problema, un errore di chimica o nei dati, oppure un’idea.',
  feedbackBody2:
    'Insieme al messaggio invia anche la pagina in cui si trovava, quindi non serve descrivere dov’era. Gli errori di chimica sono quelli che mi interessano di più: una valenza sbagliata davanti a una classe è la cosa peggiore che questo sito possa fare.',

  supportHeading: 'Sostenere questo progetto',
  supportBody:
    'Spero che i giochi siano stati utili e che per strada sia rimasta un po’ di chimica. In questo progetto c’è molta cura e nessun finanziamento: nessun bando, nessuna istituzione, nessuna pubblicità. Se vuole aiutare a tenerlo gratuito e senza pubblicità, può contribuire con la cifra che preferisce su {link}. È il progetto di una persona sola e non un ente benefico riconosciuto: nulla è detraibile e nulla è dovuto; i giochi restano gratuiti in ogni caso.',
  supportLinkLabel: 'la pagina di sostegno',
} satisfies TeachersCopy;
