// src/i18n/teachers/de.ts
//
// German (de) copy for the For Teachers page.
//
// This is a per-page catalogue, not part of the shared dictionary, because
// src/app/[lang]/layout.tsx hands the whole dictionary to I18nProvider and so
// serializes every byte of it into the RSC payload of every page. This page is
// the copy's only reader and it is a Server Component, so none of it needs to
// travel anywhere else — see docs/i18n/README.md § "The dictionary is a budget,
// and a game will eat it", which is the same reasoning that moved the game
// catalogues out.
//
// Die Seite „Für Lehrkräfte“.
//
// **Address: formal „Sie“, and only here.** The glossary fixes informal „du“
// for the whole site, and its stated reason is the 14–16 audience — „Sie“
// reads like a bank letter to a teenager. This page has no teenage reader:
// it is written for the adult deciding whether to use the site in class, and
// „du“ to a Lehrkraft would read as presumptuous rather than friendly. The
// departure is confined to this file; nothing in the German dictionary
// changes.
// Flagged for a native reviewer — if the owner wants „du“ everywhere, the
// edit is contained to these keys.
//
// Terms: Lehrkraft / Lehrkräfte (glossary), „ungepaartes Elektron“ and
// „freies Elektronenpaar“ (the formal terms, correct for explaining prose —
// the game word „Einzelelektron“ belongs in the game, not here), Klasse 9–10
// for the year band. **Never Oberstufe**, which names Klasse 11–13, ages
// 16–19; that exact mistake was already corrected once in meta.keywords.

import type { TeachersCopy } from './en';

export const de = {
  heading: 'Für Lehrkräfte',
  intro:
    'Was ChemGames ist, was darauf zu finden ist und wie Sie es mitgestalten können. Alle anderen Seiten sind für die Jugendlichen geschrieben, die hier spielen – diese eine ist für Sie.',

  betaHeading: 'Die Seite ist in der Beta',
  betaBody:
    'ChemGames wird noch gebaut. Spiele ändern sich, neue kommen dazu, und der Wortlaut eines Tipps oder eines Spickzettels kann nächsten Monat ein anderer sein. Alles hier funktioniert und alles ist kostenlos – spielen Sie ein Spiel aber selbst einmal durch, bevor Sie es einer Klasse vorlegen.',

  whatHeading: 'Worum es geht',
  whatBody1:
    'Eine Sammlung kostenloser Chemie-Minispiele, die im Browser laufen. Es gibt nichts zu installieren und kein Konto anzulegen: Spiel öffnen und loslegen.',
  whatBody2:
    'Gedacht sind sie für Klasse 9–10, also für 14- bis 16-Jährige. Jedes Spiel übt in kurzen Durchgängen genau eine Fähigkeit, und bei einer falschen Antwort steht dort, was falsch war und was als Nächstes zu versuchen ist – nicht nur, dass es falsch war.',
  whatBody3:
    'Ein Konto ist freiwillig. Es sichert Punkte und Fortschritt und trägt einen Alias in die Bestenlisten ein; an den Spielen selbst ändert es nichts.',

  onSiteHeading: 'Was es auf der Seite gibt',
  gamesIntro: 'Fünf Spiele sind fertig. Jedes übt genau eine Sache:',
  gameAcid:
    'Eine Verbindung allein anhand ihrer Formel als Säure, Base oder neutral einordnen.',
  gameBlaster:
    'Formeln im Tempo lesen und fast gleich aussehende voneinander unterscheiden.',
  gameNeutralise:
    'H⁺ oder OH⁻ wählen, um zu neutralisieren, was auf das Labor zukommt.',
  gameBalancer:
    'Eine Gleichung Koeffizient für Koeffizient ausgleichen, mit der Atomzahl beider Seiten im Blick.',
  gameLewis:
    'Ungepaarte Elektronen zu Bindungen und freien Elektronenpaaren zusammenführen und so eine Lewis-Formel bauen.',
  sheetsIntro:
    'Zwölf Spickzettel enthalten das Nachschlagematerial, auf das sich die Spiele stützen. Jeder passt auf eine Seite, lässt sich projizieren und ausdrucken:',

  languagesHeading: 'Sprachen',
  languagesBody1:
    'Die Seite erscheint in sechs Sprachen: Englisch, Deutsch, Französisch, Spanisch, Italienisch und Russisch. Die Sprachauswahl sitzt in der Navigationsleiste, und die Wahl wird im jeweiligen Browser gemerkt.',
  languagesBody2:
    'Alles, was Lernende lesen, ist übersetzt – die Oberfläche, die Hinweise und die Begleitung in den Spielen sowie die Spickzettel. Chemische Formeln, Elementsymbole und Gleichungen werden nie übersetzt; eine Gleichung sieht in jeder Sprache gleich aus.',
  languagesBody3:
    'Zwei Dinge ändern sich mit der Sprache nicht: Die weiterführenden Links auf den Spickzetteln führen alle zu englischsprachigen Seiten, und jeder Spickzettel verweist auf das Victorian Curriculum, einen australischen Lehrplan. Gut zu wissen, wenn Sie nach einem anderen Lehrplan unterrichten.',

  privacyHeading: 'Datenschutz für Lernende',
  privacyBody1:
    'Auf dieser Seite gibt es keine Analysewerkzeuge, keine Werbung und kein Tracking durch Dritte. Was jemand hier tut, wird für niemanden sonst gemessen.',
  privacyBody2:
    'Zum Spielen braucht es kein Konto. Wer ohne eines spielt, wird auf der Seite gar nicht erfasst: Der eigene Browser behält die Einstellungen für Ton, Farbschema und Barrierefreiheit sowie den Hinweis, ob die Anleitung eines Spiels schon gesehen wurde, und ein einziges Cookie reist mit den Anfragen mit – es enthält nur die gewählte Sprache.',
  privacyBody3:
    'Wer sich anmeldet, gibt eine E-Mail-Adresse an, bekommt einen erzeugten Alias – nie einen echten Namen – und von da an speichert die Seite die Punkte, die erreichten Level, die freiwillig ausgefüllten Profilfelder und die Sichtbarkeitseinstellungen. Was davon öffentlich ist und wie sich ein Konto samt Inhalt löschen lässt, steht auf der Seite {link}.',
  privacyLinkLabel: 'Datenschutz',

  accessibilityHeading: 'Barrierefreiheit',
  accessibilityBody1:
    'Das Ziel ist WCAG 2.2 Stufe AA. Das ist ein Ziel und keine Zusicherung: Die Seite ist nicht geprüft, und Teile davon erreichen die Messlatte noch nicht.',
  accessibilityBody2:
    'Was heute trägt: Farbe ist nie der einzige Bedeutungsträger, reine Symbolschaltflächen tragen Textnamen für Screenreader, die Seiten laufen ohne seitliches Scrollen auf ein Handydisplay und auf 200 % Zoom um, der Fokus ist überall sichtbar, und die meisten Animationen schalten sich ab, sobald das Betriebssystem weniger Bewegung verlangt.',
  accessibilityBody3:
    'Was nicht trägt – und das sollten Sie vor der Unterrichtsplanung wissen: {blaster} braucht Maus oder Finger, denn seine wandernden Blasen sind mit der Tastatur gar nicht erreichbar. Die Countdowns in {blaster} und {neutralise} lassen sich noch nicht verlangsamen oder abschalten. Änderungen an Punktzahl, Tipp oder Fehlermeldung werden Screenreadern nicht angesagt. Die Tastaturbedienung der drei Arcade-Spiele wurde nicht Spiel für Spiel geprüft; betrachten Sie sie bitte als ungeprüft und nicht als zugesichert.',
  accessibilityBody4:
    '{balancer} und {lewis} sind die beiden Spiele, die von Anfang an für die Tastatur gebaut und so getestet wurden. Wenn jemand in Ihrer Klasse von der Tastatur aus arbeitet, fangen Sie dort an.',

  collaborateHeading: 'Lehrkräfte als Mitgestaltende',
  collaborateWhat:
    'Ich suche einige Lehrkräfte, die dieses Projekt mitgestalten. Gemeint ist eines von beidem oder beides: mir zu berichten, wie ein Spiel in einer Klasse tatsächlich gelaufen ist – was Lernende verwirrt hat, welche Formulierung danebenging, was zu leicht war –, und Spiele vorzuschlagen, die es noch nicht gibt und die sich lohnen würden.',
  collaborateCommitment:
    'Es gibt keine Mindestbeteiligung und keinen Zeitplan. Eine Nachricht pro Halbjahr hilft. Eine einzige Nachricht, ein einziges Mal, hilft auch.',
  collaborateThanks:
    'Als Dank bekommen Mitgestaltende kostenlosen Zugang zu Version 1.0 und Version 2.0 der Spiele, sobald es diese Versionen gibt.',
  collaborateFreeNow:
    'Damit klar ist, was das wert ist: Zurzeit ist alles auf der Seite kostenlos und bleibt es die ganze Beta über. Das Angebot betrifft die kostenpflichtigen Versionen danach, nicht etwas, wofür Sie heute zahlen würden.',
  collaborateHow:
    'Wenn Sie mitmachen möchten, füllen Sie das Formular unten aus. Die E-Mail-Adresse ist das Einzige, was ich wirklich brauche; alles andere steht dort, damit ich etwas über Ihre Klasse weiß, bevor ich zurückschreibe — und Sie dürfen jedes einzelne Feld davon auslassen.',
  collaborateReply:
    'Ich lese alles und ich antworte auch, aber hier arbeitet eine Person neben einem Beruf: Rechnen Sie mit ein paar Wochen statt mit ein paar Tagen, und lesen Sie Schweigen bitte nicht als Nein.',
  collaborateRecords:
    'Warum ein Formular und nicht der Feedback-Knopf, auf den hier vorher verwiesen wurde: Feedback landet in einem Postfach, und ein Postfach ist keine Liste. Ohne einen dauerhaften Ort für eine Adresse wäre das Versprechen auf 1.0 und 2.0 keines, das ich halten könnte. Genau deshalb wird hier nach einer E-Mail-Adresse gefragt.',

  // Das Anmeldeformular. Die Seite reicht diese Strings als Props an
  // `CollaboratorForm` weiter; die Komponente importiert diesen Katalog nie —
  // siehe docs/COLLABORATORS.md § 4.
  formHeading: 'Als mitwirkende Lehrkraft eintragen',
  formIntro:
    'Erforderlich ist hier nur die E-Mail-Adresse. Den Rest dürfen Sie leer lassen — jedes weitere Feld hilft mir, und keines davon ist eine Bedingung für irgendetwas.',
  formUse:
    'Ihre Adresse dient dazu, Sie zu den Spielen zu kontaktieren und Ihnen den Zugang zu Version 1.0 und Version 2.0 zu geben. Sonst nichts, und sie wird nie an jemanden weitergegeben. Eine Bestätigungsmail geht auch nicht an Sie: Das Nächste, was Sie von mir hören, ist eine von Hand geschriebene Antwort.',
  formDelete:
    'Sie können Ihre Angaben jederzeit löschen lassen, und dafür brauchen Sie weder ein Konto noch ein Formular: Schreiben Sie an {email}, dass Sie von der Liste möchten, und der Eintrag wird entfernt.',
  formOptional: 'optional',

  formEmailLabel: 'E-Mail-Adresse',
  formEmailHelp: 'Die Adresse, an die ich Ihnen lieber schreiben soll.',
  formNameLabel: 'Ihr Name',
  formSchoolLabel: 'Schule',
  formCountryLabel: 'Land',
  formYearLevelsLabel: 'Klassenstufen, die Sie unterrichten',
  formYearLevelsHelp: 'So, wie Ihre Schule sie nennt — zum Beispiel Klasse 9 und Klasse 10.',
  formSubjectsLabel: 'Fächer, die Sie unterrichten',
  formSubjectsHelp: 'Zum Beispiel Chemie und Naturwissenschaften in der Mittelstufe.',
  formMessageLabel: 'Wobei Sie helfen möchten',
  formMessageHelp:
    'Wie ein Spiel in einer Klasse gelaufen ist, eine Idee für eines, das es noch nicht gibt, oder beides. Ein Satz genügt.',

  formSubmit: 'Ich mache mit',
  formSubmitting: 'Wird gesendet …',
  formSuccessTitle: 'Danke — Sie stehen auf der Liste.',
  formSuccessBody:
    'In der Zwischenzeit passiert nichts weiter: Es ist keine Bestätigungsmail unterwegs, und Ihre Adresse wird für nichts anderes verwendet, als Ihnen zu antworten.',
  formGenericError:
    'Etwas ist schiefgegangen und die Anmeldung wurde nicht gespeichert. Bitte versuchen Sie es gleich noch einmal.',

  feedbackHeading: 'Wenn etwas falsch ist',
  feedbackBody1:
    'Die Feedback-Schaltfläche sitzt unten rechts auf jeder Seite und funktioniert ohne Konto. Sie bietet drei Kategorien: einen Fehler im Programm, einen Chemie- oder Datenfehler oder eine Idee.',
  feedbackBody2:
    'Mitgeschickt wird die Seite, auf der Sie gerade waren, Sie müssen also nicht beschreiben, wo es passiert ist. Am dringendsten will ich von Chemiefehlern hören: eine falsche Wertigkeit vor einer Klasse ist das Schlimmste, was diese Seite anrichten kann.',

  supportHeading: 'Dieses Projekt unterstützen',
  supportBody:
    'Ich hoffe, die Spiele waren nützlich und ein bisschen Chemie ist hängen geblieben. In diesem Projekt steckt viel Sorgfalt und kein Geld – keine Förderung, keine Institution, keine Werbung. Wenn Sie helfen möchten, es kostenlos und werbefrei zu halten, können Sie auf {link} einen Betrag Ihrer Wahl beisteuern. Das hier ist das Projekt einer einzelnen Person und keine eingetragene gemeinnützige Organisation: nichts davon ist steuerlich absetzbar, und erwartet wird auch nichts – die Spiele bleiben so oder so kostenlos.',
  supportLinkLabel: 'der Unterstützungsseite',
} satisfies TeachersCopy;
