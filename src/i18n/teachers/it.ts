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
    'Che cos’è ChemGames, che cosa c’è nel sito e come può contribuire a dargli forma. Tutte le altre pagine sono scritte per chi studia e gioca; questa è scritta per Lei.',

  betaHeading: 'Il sito è in beta',
  betaBody:
    'ChemGames è ancora in costruzione. I giochi cambiano, ne arrivano di nuovi e il testo di un indizio o di un bigino il mese prossimo può essere diverso. Tutto funziona e tutto è gratuito, ma provi una partita di persona prima di portare un gioco in classe.',

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
  sheetsIntro:
    'Dodici bigini raccolgono il materiale di consultazione su cui i giochi si appoggiano. Ognuno sta in una pagina, si legge bene dal proiettore e si può stampare:',

  languagesHeading: 'Lingue',
  languagesBody1:
    'Il sito esiste in sei lingue: inglese, tedesco, francese, spagnolo, italiano e russo. Il selettore è nella barra di navigazione e la scelta viene ricordata su quel browser.',
  languagesBody2:
    'Tutto ciò che legge chi studia è tradotto: l’interfaccia, l’accompagnamento e gli indizi dentro i giochi, e i bigini. Le formule chimiche, i simboli degli elementi e le equazioni non vengono mai tradotti; un’equazione si scrive allo stesso modo in tutte le lingue.',
  languagesBody3:
    'Due cose non cambiano con la lingua: i link esterni dei bigini portano tutti a siti in inglese e ogni bigino cita il Victorian Curriculum, un programma australiano. Utile saperlo se Lei segue un altro programma.',

  privacyHeading: 'Privacy di chi studia',
  privacyBody1:
    'In questo sito non ci sono strumenti di analisi, né pubblicità, né tracciatori di terze parti. Quello che qualcuno fa qui non viene misurato per nessun altro.',
  privacyBody2:
    'Per giocare non serve un account. Chi gioca senza non lascia dietro di sé nulla, a parte le preferenze di suono e di tema che conserva il suo browser.',
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
  collaborateHow:
    'Per farsi avanti, usi il pulsante delle segnalazioni in basso a destra in qualsiasi pagina, scelga la categoria «{category}» e scriva che insegna e che vorrebbe dare una mano. La procedura è tutta qui: non c’è un secondo modulo e non viene raccolto nulla oltre a ciò che quel pulsante raccoglie già.',
  collaborateReply:
    'Leggo tutto e rispondo, ma qui lavora una persona sola e lo fa accanto a un impiego: metta in conto un paio di settimane invece di un paio di giorni, e non legga il silenzio come un no.',
  collaborateRecords:
    'Un avvertimento pratico, meglio detto adesso che scoperto dopo: le segnalazioni arrivano in una casella di posta, non in un elenco di collaboratori. Le risponderò chiedendole un indirizzo da conservare, perché senza un posto stabile in cui tenerlo non potrei mantenere la promessa sulla 1.0 e sulla 2.0.',

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
