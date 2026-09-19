// src/i18n/explore/de.ts
//
// German prose for the Explore entries. See src/i18n/explore.ts for how this
// overlays onto the English pool, and why ids, formulae, dates, sources and the
// names of people are not in here at all.
//
// Terminology follows docs/i18n/glossary-de.md. The decisions that recur in this
// file — including the ones the glossary does not cover yet, which are reported
// back so they can be added:
//
//   Benzol (benzene) — the school and everyday German name; "Benzen" is the
//   German IUPAC form that no Year 10 textbook uses. The entry says outright
//   that Benzol is not Benzin, because that is the confusion a German reader
//   actually has and the English has no reason to pre-empt.
//   Citronensäure · Cholesterin (never "Cholesterol") · Ölsäure · Harnstoff ·
//   Limonen · Natron (baking soda — the everyday German word; "Backpulver" is a
//   different product) · Kochsalz · Steinsalz · Glaubersalz · Salzsäure ·
//   Natriumhydroxid · Kohlenstoffdioxid (as in chemistry-names/de.ts) ·
//   Hydroxygruppe / Carboxygruppe / Aminogruppe (the current German IUPAC
//   forms, not Hydroxyl-/Carboxyl-/Amin-) · Wasserstoffbrücken ·
//   Oxidationszahl · Verhältnisformel · mehratomig.
//
//   Not yet in the glossary, decided here and used consistently:
//   FCKW (where the English says "CFCs" — a German reader knows no other word) ·
//   Haber-Bosch-Verfahren (German names the process after both men) ·
//   Beugungsmuster (diffraction pattern) · Röntgenstrukturanalyse (X-ray
//   crystallography) · Quasikristall · verzwillingte Kristalle · zehnzählige
//   Symmetrie · isotaktisch · Flüssigkristall · Aramid · Peroxidbrücke ·
//   Komplex-Ion (one family of the glossary's mehratomiges Ion) · katalytische
//   Hydrierung · Bildungsenthalpie · Wärmespeicher / Latentwärmespeicher
//   (phase-change heat store) · Umami · Prozessivität, rendered as prose
//   ("hält die Vorlage fest und lässt nicht los") · Strangverdrängung, likewise
//   ("schiebt den Gegenstrang aus dem Weg") · R/S-System and
//   Cahn-Ingold-Prelog-Regeln. German joins personal names in a compound with
//   hyphens, not en dashes: Ziegler-Natta-Katalysator,
//   Langmuir-Blodgett-Schichten, Lewis-Langmuir-Theorie.
//   "Bild und Spiegelbild" is the German textbook phrase where the English says
//   "mirror images"; a calque ("Spiegelbildformen") reads like a translation.
//
// Register: informal "du", school vocabulary, one idea per sentence, German
// typography („…“ quotes, – for parenthetical dashes, decimal comma in prose,
// non-breaking space before a unit). The decimal comma stops at the formula:
// notation keeps its own punctuation.
//
// Not translated anywhere in this file: formulae and equations (O3, N2, H2,
// CH4 + 2O2 -> CO2 + 2H2O), element symbols, the names of people, of places and
// of institutions (Royal Society, General Electric, Rockefeller Institute,
// National Bureau of Standards, Albert Einstein College of Medicine, Dover Sun
// House, Politecnico di Milano), brand and product names (Kevlar, Freon-12),
// organism names (Bradyrhizobium, Phi29), and Shechtman's notebook line
// „10 fold ???“, which is a quotation of a real page rather than a sentence.
//
// Two names are the same word in both languages: „Kevlar“, a trade mark, and
// „Artemisinin“. Both are left plain and are listed in `identicalByDesign` in
// src/i18n/explore.test.ts. The first draft glossed them — „Kevlar (Aramid)“,
// „Artemisinin (Qinghaosu)“ — only so that no string would be byte-identical to
// the English, which is exactly what that allowlist exists to prevent: a
// parenthesis on the page to satisfy a test is worse than the exemption.

import type { ExploreOverlay } from '../explore';

export const EXPLORE_OVERLAY_DE = {
  molecules: {
    benzene: {
      name: 'Benzol',
      everyday:
        'Benzol ist einer der kleineren Bestandteile von Benzin – die beiden Wörter klingen ähnlich, meinen aber nicht dasselbe. Hergestellt wird es in riesigen Mengen, als Ausgangsstoff für Kunststoffe, Nylon und Farbstoffe. Eine Flasche davon wirst du wahrscheinlich nie in der Hand halten. Seinem Ring begegnest du dagegen ständig: Das Sechseck aus sechs Kohlenstoffatomen steckt in Paracetamol, in Polystyrol und in mehreren Aminosäuren in deinem eigenen Körper. Benzol löst nachweislich Leukämie aus. Deshalb ist sein Anteil im Kraftstoff in Großbritannien und in der EU gesetzlich auf ein Volumenprozent gedeckelt, und deshalb sind Tankstellen so gebaut, dass sie gut durchlüftet bleiben.',
      chemistry:
        'Der Ring besteht aus sechs Kohlenstoffatomen in einem flachen Sechseck, an jedem hängt ein Wasserstoffatom. Ungewöhnlich ist: Sechs seiner Elektronen gehören zu keiner einzelnen Bindung. Sie sind über den ganzen Ring verteilt, oberhalb und unterhalb der Ebene. Genau diese Verteilung ist der Grund, warum Benzol viel reaktionsträger ist, als man es bei drei Doppelbindungen erwarten würde. Und sie ist der Grund, warum alle sechs Kohlenstoff-Kohlenstoff-Bindungen exakt gleich lang sind, statt sich in kurz und lang abzuwechseln.',
    },

    'citric-acid': {
      name: 'Citronensäure',
      everyday:
        'Citronensäure ist das, was eine Zitrone so sauer macht – etwa fünf Prozent des Zitronensafts bestehen daraus. Sie ist außerdem der saure Überzug auf Bonbons, der Kick in einer Limonade, der Wirkstoff im Entkalker und Zutat in fast jeder Konserve, wo sie würzt und den Inhalt länger haltbar macht. Das meiste, was verkauft wird, ist gar nicht aus Früchten gepresst. Es entsteht, indem man einen Schimmelpilz mit Zucker füttert – der produziert es tonnenweise.',
      chemistry:
        'Das Molekül trägt drei Carboxygruppen, und jede davon kann ein Wasserstoff-Ion abgeben. Damit ist es eine schwache Säure: In Wasser gibt es seine Wasserstoff-Ionen nur teilweise ab, und nicht alle auf einmal. Das Schwache ist hier das Nützliche. Eine starke Säure derselben Konzentration würde dir den Zahnschmelz wegfressen, Citronensäure bringt dich nur dazu, das Gesicht zu verziehen. Außerdem hält sie Metall-Ionen fest, und genau das löst den Kalk aus dem Wasserkocher.',
    },

    'silicon-dioxide': {
      name: 'Siliciumdioxid',
      everyday:
        'Siliciumdioxid ist Sand, Quarz und der größte Teil des Glases um dich herum. Eine Fensterscheibe besteht zu rund 70 Prozent daraus; Natrium- und Calciumoxid sind beigemischt, damit der Schmelzpunkt tief genug sinkt, dass ein Ofen ihn überhaupt erreicht. Dieselbe Verbindung steckt in dem kleinen Tütchen mit der Aufschrift „Nicht essen“ im Schuhkarton – dort ist sie porös gemacht, damit sie stattdessen Wasser aufsaugt.',
      chemistry:
        'Im Quarz ist jedes Siliciumatom an vier Sauerstoffatome gebunden, und jedes Sauerstoffatom verbindet zwei Siliciumatome. Dieses Muster wiederholt sich ohne Ende. Im Glas gibt es dieselben Bindungen, aber das Muster fehlt: Das Netzwerk ist ungeordnet erstarrt, weil die Schmelze schneller abgekühlt ist, als die Atome sich ordnen konnten. Dieser Unterschied ist der ganze Unterschied zwischen einem Kristall und einem Glas. Und eine alte Geschichte gehört beerdigt: Glas ist keine langsam fließende Flüssigkeit. Alte Fensterscheiben sind unten dicker, weil sie so hergestellt wurden – nicht weil sie geflossen wären.',
    },

    'monosodium-glutamate': {
      name: 'Mononatriumglutamat',
      everyday:
        'Mononatriumglutamat ist ein weißes Kristallpulver, das in Suppen, Chips, Brühwürfeln und Instantnudeln steckt. Dasselbe Ion sorgt als freies Glutamat dafür, dass Parmesan, reife Tomaten, Sojasoße und Kombu-Algen herzhaft schmecken – und dein Körper kann die beiden nicht auseinanderhalten, weil sie chemisch identisch sind. In einer üblichen Portion eines Lebensmittels mit zugesetztem Glutamat steckt weniger als ein halbes Gramm davon.',
      chemistry:
        'Glutaminsäure ist eine Aminosäure: Am einen Ende sitzt eine Aminogruppe, und ungewöhnlicherweise trägt sie zwei Carboxygruppen. Nimm von einer dieser beiden Säuregruppen das Natriumsalz, und du hast Mononatriumglutamat – mono, weil ein Natrium, nicht zwei. In Wasser zerfällt es in ein Natrium-Ion und ein Glutamat-Ion, und es ist das Glutamat-Ion, das auf deiner Zunge in den Rezeptor passt. Das Natrium fährt nur mit. Deshalb schmeckt es herzhaft und nicht salzig.',
    },

    'cfc-12': {
      name: 'Dichlordifluormethan',
      everyday:
        'Als Freon-12 verkauft, steckte dieses Gas von den 1930er- bis in die 1990er-Jahre in fast jedem Kühlschrank und in fast jeder Spraydose. Es gehört zu den FCKW, den Fluorchlorkohlenwasserstoffen. Gewählt wurde es, weil es erstaunlich reaktionsträge ist: Es brennt nicht, greift nichts an, ist nicht giftig und tut mit dem, was es berührt, schlicht gar nichts. Genau das machte es sicher für die Küche, und genau das machte es zur Katastrophe. Seine Herstellung ist in den meisten Ländern seit 1996 verboten, und die Menge in der Luft sinkt nur langsam.',
      chemistry:
        'Weil hier unten nichts es zerstört, steigt ein Molekül jahrelang auf, bis es die Stratosphäre erreicht. Dort ist das ultraviolette Licht endlich stark genug, um ein Chloratom abzusprengen. Dieses Chlor greift Ozon an, O3, und wird am Ende des nächsten Schritts wieder freigegeben. Ein einziges Chloratom kann also immer weiter im Kreis laufen und Tausende Ozonmoleküle zerstören. So hat ein Gas, das nur in winzigen Mengen vorkommt, eine Schicht von der Größe eines Kontinents ausgedünnt.',
    },

    ammonia: {
      everyday:
        'Ammoniak ist ein stechend riechendes Gas, das sich sehr leicht in Wasser löst; der beißende Reiniger aus der Flasche ist eine verdünnte Lösung davon. Fast alles davon – ungefähr 180 Millionen Tonnen im Jahr – landet als Dünger auf den Feldern, entweder direkt oder vorher zu Harnstoff oder Ammoniumnitrat verarbeitet. Ein wenig davon steckt auch in deinem Blut: Es entsteht, wenn dein Körper Eiweiß abbaut.',
      chemistry:
        'Das Stickstoffatom sitzt in der Mitte, drei Wasserstoffatome sind darum herum angeordnet, und ein Elektronenpaar bleibt übrig. Das drückt das Molekül in eine gestauchte Pyramide statt in ein flaches Dreieck. Dieses freie Elektronenpaar ist die ganze Geschichte. Es kann sich ein Wasserstoff-Ion schnappen – deshalb ist Ammoniak eine Base –, und es lässt Ammoniak so gut Wasserstoffbrücken zum Wasser ausbilden. Technisch wird es aus N2 und H2 aufgebaut: der Stickstoff aus der Luft, der Wasserstoff meist aus Erdgas. Deshalb entsteht bei der Herstellung auch sehr viel Kohlenstoffdioxid.',
    },

    cholesterol: {
      name: 'Cholesterin',
      everyday:
        'Jede tierische Zelle ist von einer Membran umhüllt, in der Cholesterin sitzt – deine eigenen Zellen eingeschlossen –, und das meiste davon stellt deine Leber selbst her. Es ist außerdem der Rohstoff, aus dem dein Körper Vitamin D, Gallenflüssigkeit und mehrere Hormone baut. Du begegnest ihm in Eiern, Fleisch und Milchprodukten, und es hat einen Ruf, den es nur halb verdient: Bei den meisten Menschen hängt der Wert im Blut viel weniger davon ab, wie viel Cholesterin im Essen steckt, als davon, wie viel gesättigtes Fett darin ist.',
      chemistry:
        'Das Molekül besteht aus vier miteinander verschmolzenen Ringen – dem Steroidgerüst –, mit einer kurzen Kohlenwasserstoffkette an einem Ende und einer einzigen Hydroxygruppe am anderen. Diese eine Hydroxygruppe ist der einzige Teil, der Wasser mag. Deshalb sitzt ein Cholesterinmolekül in der Zellmembran immer richtig herum: die Hydroxygruppe nach außen, wo das Wasser ist, Ringe und Kette vergraben zwischen den Fettketten. So eingeklemmt verhindert es, dass die Membran in der Wärme zu weich und in der Kälte zu starr wird.',
    },

    'oleic-acid': {
      name: 'Ölsäure',
      everyday:
        'Ölsäure ist die wichtigste Fettsäure im Olivenöl – rund drei Viertel davon –, und sie macht auch den größten Teil von Rapsöl, Mandeln und Avocados aus. Sie ist der Grund, warum diese Öle im Schrank flüssig bleiben. Dasselbe Molekül ist ein großer Teil des Öls, das deine eigene Haut produziert.',
      chemistry:
        'Das Molekül ist eine Kette aus achtzehn Kohlenstoffatomen, mit einer Carboxygruppe an einem Ende und einer einzigen Doppelbindung in der Mitte. Diese Doppelbindung ist cis-konfiguriert: Beide Hälften der Kette gehen auf derselben Seite weg, die Kette hat also einen festen Knick. Geknickte Ketten lassen sich nicht sauber aufeinanderstapeln, deshalb bleiben sie bei Temperaturen flüssig, bei denen gerade Ketten längst fest sind – und das ist der ganze Unterschied zwischen einem Öl und einem harten Fett. Lagere an dieser Doppelbindung Wasserstoff an, an einem Nickel-Katalysator, und du bekommst Stearinsäure: achtzehn Kohlenstoffatome, kein Knick, bei Raumtemperatur fest. Mit echten Fetten gemacht, ist das der Weg vom flüssigen Öl zur Margarine.',
    },

    methane: {
      name: 'Methan',
      everyday:
        'Methan ist Erdgas. Es heizt Wohnungen, kocht Essen und erzeugt rund ein Fünftel des Stroms weltweit. Es sickert außerdem aus Feuchtgebieten, Reisfeldern und Mülldeponien, kommt aus Kühen heraus und ist ein Treibhausgas, das viel stärker wirkt als Kohlenstoffdioxid – auch wenn es sich in der Atmosphäre innerhalb von etwa zehn Jahren wieder abbaut, was Kohlenstoffdioxid nicht tut.',
      chemistry:
        'Ein Kohlenstoffatom, vier Wasserstoffatome, angeordnet als Tetraeder, weil vier Elektronenpaare sich so weit voneinander wegdrücken, wie sie können. Seine Verbrennung ist die einfachste, die es gibt: CH4 + 2O2 -> CO2 + 2H2O. Zähl die Atome auf beiden Seiten, dann siehst du, warum es genau zwei Sauerstoffmoleküle braucht und nicht eines: Aus den vier Wasserstoffatomen werden zwei Wasser, das verbraucht zwei Sauerstoffatome, und die anderen beiden nimmt der Kohlenstoff. Mit dieser einen Gleichung fangen die meisten Aufgaben zur Stöchiometrie an.',
    },

    water: {
      everyday:
        'Wasser bedeckt den größten Teil des Planeten, macht etwa 60 Prozent von dir aus und ist der einzige verbreitete Stoff, dem du an einem einzigen Tag fest, flüssig und gasförmig begegnen kannst. Es ist auch der Grund, warum ein Teich von oben nach unten zufriert: Festes Wasser ist weniger dicht als flüssiges, und das ist so ungewöhnlich, dass es fast einmalig ist.',
      chemistry:
        'Sauerstoff bringt sechs Außenelektronen mit und teilt zwei davon, je eines mit einem Wasserstoffatom. Damit bleiben zwei Paare ungeteilt – die freien Elektronenpaare. Alle vier Paare drücken sich voneinander weg, und weil die freien Paare mehr Platz beanspruchen als die bindenden, ist das Molekül am Ende gewinkelt: etwa 104,5 Grad statt gestreckt. Ein gewinkeltes Molekül, in dem der Sauerstoff die Elektronen zu sich zieht, hat ein negatives und ein positives Ende, die Moleküle bleiben also aneinander hängen. Diese Klebrigkeit ist der Grund, warum Wasser bei 80 °C noch flüssig ist, obwohl etwas so Leichtes eigentlich längst ein Gas sein müsste.',
    },

    kevlar: {
      // Ein Markenname, in beiden Sprachen derselbe. Siehe die Ausnahmeliste
      // in src/i18n/explore.test.ts.
      name: 'Kevlar',
      everyday:
        'Kevlar steckt in Schutzwesten, Motorradjacken, schnittfesten Handschuhen, Bremsbelägen, den Gürtellagen von Autoreifen und den Rümpfen von Rennbooten. Verkauft wird es als gelbe Faser, zu Seilen gedreht und zu Gewebe verwoben. Es gehört zu den Aramidfasern. Sein korrekter Name, Poly(para-phenylenterephthalamid), beschreibt, woraus es gebaut ist – aussprechen will ihn niemand.',
      chemistry:
        'Die Formel oben ist die Einheit, die sich wiederholt: ein Benzolring, eine Amidbindung, noch ein Ring, noch ein Amid, und so weiter, tausendfach entlang einer Kette. Zwei Dinge machen es dann fest. Die Ringe halten jede Kette steif und gerade statt schlaff, eine Faser, an der gezogen wird, hat also nichts mehr zum Ausfalten. Und die Amidgruppen benachbarter Ketten bilden untereinander Wasserstoffbrücken in flachen Schichten aus, sodass die Ketten nicht aneinander vorbeirutschen können. Auf das Gewicht bezogen schlägt es Stahl im geraden Zug – bei fast allem anderen gewinnt Stahl, auch beim Überstehen eines Brandes.',
    },

    'lithium-cobalt-oxide': {
      name: 'Lithiumcobaltoxid',
      everyday:
        'Lithiumcobaltoxid ist die positive Elektrode in sehr vielen Handy- und Laptop-Akkus. Zu sehen bekommst du es nie: Es ist ein schwarzes Pulver, auf Aluminiumfolie gestrichen und in der Zelle aufgerollt. Das Cobalt darin ist der Grund, warum die Hersteller immer weniger davon verwenden wollen: Rund drei Viertel des weltweiten Cobalts werden in der Demokratischen Republik Kongo abgebaut, ein Teil davon in kleinen, unkontrollierten Minen mit echten Problemen bei Sicherheit und Kinderarbeit.',
      chemistry:
        'Der Aufbau besteht aus Schichten: Lagen aus Cobalt und Sauerstoff, dazwischen Lithium-Ionen in den Lücken. Beim Laden werden die Lithium-Ionen zwischen den Schichten herausgezogen und zur Kohlenstoffelektrode am anderen Ende getrieben; beim Benutzen wandern sie zurück. Das Cobalt wechselt dabei jedes Mal seine Oxidationszahl, damit die Ladung ausgeglichen bleibt. Nichts wird zerstört und nichts Neues gebaut, deshalb lässt sich eine Zelle hunderte Male wieder aufladen. Zieht man allerdings zu viele heraus, brechen die Schichten zusammen – und deshalb hat jeder Akku eine Elektronik, deren Aufgabe es ist, dich daran zu hindern.',
    },

    adenine: {
      name: 'Adenin',
      everyday:
        'Adenin ist das A im A, T, C und G der DNA – eine der vier Basen, deren Reihenfolge ein Gen buchstabiert. In jeder deiner Zellen stehen etwa drei Milliarden dieser Buchstaben, und rund ein Viertel davon sind Adenin. Es steckt außerdem im ATP, dem Molekül, mit dem deine Zellen Energie hin und her schaffen. Du baust es also jede Sekunde neu auf und gibst es wieder aus.',
      chemistry:
        'Das Molekül besteht aus zwei verschmolzenen Ringen, einem sechsgliedrigen und einem fünfgliedrigen, mit Stickstoffatomen in beiden. Die Chemie nennt diese Anordnung ein Purin. An einem der Ringe hängt eine Aminogruppe. In der DNA bilden diese Aminogruppe und eines der Ringstickstoffatome zwei Wasserstoffbrücken zu einem Thymin auf dem Gegenstrang – genau zwei, und deshalb paart sich Adenin mit Thymin und nicht mit Cytosin, das drei braucht. An der Paarung ist nichts Magisches. Es sind Wasserstoffbrücken, die passen oder eben nicht.',
    },

    'sodium-bicarbonate': {
      everyday:
        'Das ist Natron. Es lässt Kuchen aufgehen, bringt das Sprudeln in eine Badekugel und die Erleichterung in eine Tablette gegen Sodbrennen, und es ist das, womit viele Pulverlöscher gefüllt sind. Dieselbe Verbindung ist in deinem Blut gelöst, wo sie dafür sorgt, dass der Säuregrad beim Sport nicht wegdriftet.',
      chemistry:
        'Es ist eine Ionenverbindung, besteht also gar nicht wirklich aus Molekülen: Es sind Natrium-Ionen und Hydrogencarbonat-Ionen, gestapelt in einem Gitter. Das Hydrogencarbonat-Ion ist die interessante Hälfte – vier Atome, die als eine Einheit mit einer negativen Ladung unterwegs sind, und genau das heißt mehratomig. Gib ihm ein Wasserstoff-Ion aus einer Säure, und es zerfällt in Wasser und Kohlenstoffdioxid, und das Kohlenstoffdioxid ist das Sprudeln. Erhitze es stattdessen, und es passiert ungefähr dasselbe. Deshalb funktioniert es auch in einem Kuchen, in dem weit und breit keine Säure ist.',
    },

    urea: {
      name: 'Harnstoff',
      everyday:
        'Harnstoff ist der Weg, auf dem dein Körper Stickstoff loswird, den er nicht brauchen kann: Die Leber baut ihn aus Ammoniak, und die Nieren schicken ihn mit dem Urin hinaus. Er ist außerdem der meistgenutzte Dünger der Erde – mehr als die Hälfte des gesamten Stickstoffdüngers, der auf Felder kommt, ist Harnstoff. Und er steckt in Gesichtscremes, wo er der Haut hilft, Wasser zu halten.',
      chemistry:
        'Das Molekül ist ein einzelnes Kohlenstoffatom mit einem doppelt gebundenen Sauerstoffatom und je einer Aminogruppe auf beiden Seiten. Fast die Hälfte seiner Masse ist Stickstoff, deshalb lohnt es sich, ihn um die halbe Welt zu verschiffen. Technisch wird er aus Ammoniak und Kohlenstoffdioxid hergestellt; sein Stickstoff kam also über das Haber-Bosch-Verfahren aus der Luft. 1828 stellte Friedrich Wöhler Harnstoff her, indem er ein anorganisches Salz erhitzte, und das verblüffte die Chemie: Harnstoff sollte etwas sein, das nur ein Lebewesen hervorbringen kann. Die hübsche Geschichte, dass damit der Streit über Nacht beendet war, ist übertrieben – der Schreck war echt.',
    },

    limonene: {
      name: 'Limonen',
      everyday:
        'Drück eine Orangenschale neben einer Kerze zusammen, und die kleinen Stichflammen sind brennendes Limonen. Es ist der Hauptbestandteil des Öls aus Zitrusschalen und wird tonnenweise aus den Schalen gepresst, die bei der Saftherstellung übrig bleiben. Von dort wandert es in Reinigungsmittel, in Abbeizmittel und in den Geruch von fast allem, was als frisch verkauft wird.',
      chemistry:
        'Limonen ist chiral: Eines seiner Kohlenstoffatome trägt vier verschiedene Gruppen, das Molekül gibt es also in zwei Formen, die sich wie Bild und Spiegelbild verhalten. Auseinanderhalten lassen sie sich mit dem R/S-System. Und jetzt der Teil, den die meisten Lehrbücher falsch haben. Sie behaupten, die eine Form rieche nach Orangen und die andere nach Zitronen. Sorgfältige Messungen von 2021 ergaben, dass Orangenöl und Zitronenöl beide dieselbe Form enthalten – die R-Form – und zwar zu über 99,9 Prozent. Zitronen riechen vor allem wegen eines anderen Moleküls nach Zitrone, nämlich wegen Citral, und nicht wegen diesem hier.',
    },

    'sodium-sulfate': {
      everyday:
        'Natriumsulfat wird in Millionen Tonnen hergestellt, und das meiste davon geht in Waschpulver, wo es die Masse ist, in die alles andere eingemischt wird. Kristallisiert mit zehn eingebauten Wassermolekülen heißt es Glaubersalz, und diese Form wurde schon als Wärmespeicher genutzt: Sie schmilzt in einem warmen Raum und erstarrt wieder, wenn der Raum abkühlt.',
      chemistry:
        'Das Nützliche passiert bei etwa 32 °C. Beim Schmelzen wird Energie aufgenommen, ohne dass die Temperatur steigt, und beim Erstarren kommt dieselbe Energie wieder heraus. Ein Fass des Salzes ist damit ein Wärmespeicher, der bei Zimmertemperatur arbeitet. Der Haken ist, dass es nicht sauber schmilzt. Die Kristalle zerfallen in festes Natriumsulfat und eine gesättigte Lösung, und der Feststoff sinkt, weil er dichter ist, nach unten, wo weniger davon auf dem Rückweg wieder ins Wasser findet. Jeder Zyklus speichert ein wenig weniger als der vorige. Siebzig Jahre später ist das immer noch das Problem, das gelöst werden muss.',
    },

    polypropylene: {
      name: 'Polypropylen',
      everyday:
        'Polypropylen ist der am zweithäufigsten hergestellte Kunststoff der Welt. Es sind Flaschendeckel, Joghurtbecher, die Frischhaltedosen, die du in die Mikrowelle stellen darfst, Stoßstangen, Seile, Teppichfasern und der Vliesstoff in einer OP-Maske. Wenn du ein Recycling-Dreieck mit einer 5 darin siehst, ist genau das gemeint.',
      chemistry:
        'Die Formel oben ist die sich wiederholende Einheit, und sie ist dieselbe wie die von Propen, weil beim Bilden der Ketten nichts dazukommt und nichts verloren geht: Jedes Molekül öffnet einfach seine Doppelbindung und hängt sich an. Ob der Kunststoff etwas taugt, entscheidet sich daran, wohin jede Methylgruppe am Ende zeigt. Mit einem gewöhnlichen Katalysator hergestellt, sind die Ketten ein Knäuel, und der Kunststoff ist weich und schwach. Mit einem Ziegler-Natta-Katalysator hergestellt, zeigt jede Methylgruppe in dieselbe Richtung, die Ketten winden sich zu regelmäßigen Schrauben, und die packen sich zu kristallinen Bereichen zusammen. Diese Regelmäßigkeit ist der Unterschied zwischen einem klebrigen Gummi und einer Stoßstange.',
    },

    artemisinin: {
      // Im Deutschen wie im Englischen dasselbe Wort; in der Ausnahmeliste in
      // src/i18n/explore.test.ts vermerkt.
      name: 'Artemisinin',
      everyday:
        'Artemisinin stammt aus dem Einjährigen Beifuß, einer Pflanze, die in der chinesischen Medizin seit mehr als zweitausend Jahren verwendet wird. Heute ist es die Grundlage der Standardbehandlung gegen Malaria – immer zusammen mit einem zweiten Medikament und nie allein, damit der Parasit nicht so leicht dagegen resistent wird. Der größte Teil des weltweiten Nachschubs wird noch immer aus angebauten Pflanzen gewonnen und nicht von Grund auf synthetisiert.',
      chemistry:
        'Der größte Teil des Moleküls ist eine unauffällige Anordnung von Ringen. Worauf es ankommt, ist eine Brücke aus zwei Sauerstoffatomen, die direkt aneinander gebunden sind – eine Peroxidbrücke. Eine Sauerstoff-Sauerstoff-Einfachbindung ist schwach und ungewöhnlich, und die Chemie vermeidet es meistens, so eine zu bauen. In einem Malariaparasiten, der voller Eisen aus dem verdauten Hämoglobin steckt, bricht diese Brücke auf und erzeugt Bruchstücke, die den Parasiten von innen zerlegen. Nimm die Brücke aus dem Molekül heraus, und das Medikament wirkt nicht mehr. So weiß die Chemie, dass sie das arbeitende Ende ist.',
    },

    'sodium-chloride': {
      everyday:
        'Kochsalz. Es wird als Steinsalz abgebaut, aus dem Meer verdunstet, auf vereiste Straßen gestreut und von der chemischen Industrie als Ausgangspunkt für Chlor, Natriumhydroxid und Salzsäure genutzt. Dein Körper braucht wirklich etwas davon, und die meisten Menschen essen deutlich mehr als etwas.',
      chemistry:
        'In einem Salzkorn gibt es keine Natriumchlorid-Moleküle. Der Kristall besteht aus Natrium-Ionen und Chlorid-Ionen, die sich in jede Richtung abwechseln: Jedes Natrium ist von sechs Chloriden umgeben und jedes Chlorid von sechs Natrium-Ionen, und das wiederholt sich milliardenfach in einer Reihe. Die Formel ist eine Verhältnisformel, eins zu eins, und keine Anzahl von Atomen in einem Molekül. Dieses endlos wiederholte Muster macht es zu einem Kristall, und deshalb zerspringt ein Korn in kleine Würfel: Du trennst es entlang von Ebenen, auf denen die Ionen ohnehin schon aufgereiht waren.',
    },
  },

  scientists: {
    'kathleen-lonsdale': {
      work: 'Seit den 1860er-Jahren zeichnete man Benzol als Ring aus sechs Kohlenstoffatomen, gemessen hatte das aber niemand. Kathleen Lonsdale tat es 1929. Benzol ist flüssig, sie konnte also nicht Benzol selbst nehmen; sie wählte Hexamethylbenzol, einen Feststoff, der um denselben Ring herum gebaut ist. Röntgenstrahlen, die von den Atomschichten eines Kristalls zurückgeworfen werden, erzeugen ein Beugungsmuster, und dieses Muster verrät, wo die Atome sitzen. Ihr Ergebnis: Die sechs Kohlenstoffatome liegen flach, an den Ecken eines regelmäßigen Sechsecks. Zwei Jahre später vermaß sie Hexachlorbenzol und fand jede Kohlenstoff-Kohlenstoff-Bindung im Ring gleich lang – etwa 1,42 Ångström, zwischen einer Einfach- und einer Doppelbindung.',
      legacy: 'Deshalb zeichnet dein Lehrbuch einen Kreis in das Benzol-Sechseck statt drei Doppelbindungen: Die Bindungen sind wirklich alle gleich. Es zeigte außerdem, dass die Röntgenstrukturanalyse Fragen zu Molekülen beantworten kann und nicht nur zu Salzen. 1945 wurden Lonsdale und die Mikrobiologin Marjory Stephenson als erste zwei Frauen in die Royal Society gewählt.',
    },

    'soren-sorensen': {
      work: 'Säuren unterscheiden sich enorm in ihrer Stärke, und 1909 gab es keine saubere Art zu sagen, um wie viel. Søren Sørensen erforschte im Carlsberg-Laboratorium in Kopenhagen Proteine, und kleine Änderungen im Säuregrad ruinierten ihm ständig die Versuche. Die Zahl, die er brauchte, war die Konzentration der Wasserstoff-Ionen, und über gewöhnliche Lösungen hinweg reicht die über mehr als hundert Billionen. Also nahm er den Logarithmus davon und drehte das Vorzeichen um. Aus einer Lösung mit 0,0000001 Mol Wasserstoff-Ionen pro Liter wurde einfach eine 7. Jeder Schritt die Skala hinunter bedeutet zehnmal mehr Wasserstoff-Ionen, nicht eines mehr.',
      legacy: 'Das ist die pH-Skala, und sie steht seitdem auf jedem Teststreifen fürs Schwimmbad, in jedem Bodentest und in jedem Blutbefund. Sørensen hat nie erklärt, wofür das p steht. Die Chemie streitet bis heute darüber: Potenz, Potential oder einfach der Buchstabe, den er zufällig für eine seiner Testlösungen benutzt hat. Wer dir sagt, das sei geklärt, irrt sich.',
    },

    'katharine-blodgett': {
      work: 'Katharine Blodgett fand heraus, wie man eine Beschichtung Molekülschicht für Molekülschicht aufbaut. Ihr Kollege Irving Langmuir hatte gezeigt, dass sich eine einzige Lage aus fettartigen Molekülen über Wasser ausbreitet. Blodgett entdeckte: Taucht man eine Platte durch diese Lage hindurch und zieht sie wieder heraus, kommt die Lage mit – und man kann das wieder und wieder tun. 1938 stapelte sie bei General Electric 44 solcher Lagen aus Bariumstearat auf Glas, und das Glas hörte auf zu spiegeln. Licht, das oben an der Beschichtung umkehrt, und Licht, das erst am Glas darunter umkehrt, kommen gegeneinander versetzt heraus und löschen sich aus.',
      legacy: 'General Electric nannte es „unsichtbares Glas“, und das war Werbung: Das Glas ist so sichtbar wie eh und je, die Spiegelungen sind es nicht. Ihre Filme waren zu weich, um sie zu verkaufen – man konnte sie abwischen –, und moderne entspiegelte Gläser tragen stattdessen harte, aufgedampfte Schichten. Aber Langmuir-Blodgett-Schichten sind bis heute die Art, wie Labore eine Schicht nach Maß bauen, Molekül für Molekül.',
    },

    'kikunae-ikeda': {
      work: 'Kikunae Ikeda fand, dass die Brühe aus Kombu-Algen nach etwas schmeckte, das weder süß noch sauer, salzig oder bitter war. 1908 kochte er an der Kaiserlichen Universität Tokio rund zwölf Kilogramm getrockneten Seetang ein und holte etwa dreißig Gramm Kristalle heraus. Es war Glutaminsäure – eine Aminosäure, die man längst kannte und die auch in Weizen steckt. Neu war die Verknüpfung: Ikeda zeigte, dass das Glutamat-Ion der Träger dieses fünften Geschmacks ist. Er nannte ihn Umami und ließ sich ein Verfahren patentieren, mit dem sich Glutamat in ein Würzmittel verwandeln lässt.',
      legacy: 'Mononatriumglutamat kam im Jahr darauf in den Handel und steht heute in Küchen überall auf der Welt. Der Rest der Welt brauchte viel länger, um ihm zuzustimmen. Umami wurde erst um das Jahr 2000 herum allgemein als Grundgeschmack anerkannt, nachdem man die Rezeptoren auf der Zunge gefunden hatte, die auf Glutamat ansprechen. Ikeda hatte neunzig Jahre lang recht gehabt.',
    },

    'susan-solomon': {
      work: '1985 berichteten britische Forschende, dass die Ozonschicht über der Antarktis in jedem Frühling der Südhalbkugel dramatisch dünner wird. Chlor aus FCKW war der naheliegende Verdächtige, aber die Reaktionen zwischen Gasen, die man damals kannte, waren viel zu langsam für so viel Schaden in so kurzer Zeit. Susan Solomons Antwort von 1986 lautete: Die entscheidenden Reaktionen laufen gar nicht zwischen Gasen ab. Im antarktischen Winter wird die Stratosphäre kalt genug, dass sich Wolken aus Eis und Salpetersäure bilden. Auf den Oberflächen dieser Wolkenteilchen wird harmlos gebundenes Chlor in Formen umgewandelt, die das zurückkehrende Frühlingslicht auseinanderreißt. Danach leitete sie 1986 und 1987 Expeditionen zur McMurdo-Station und maß dort genau die Chlorverbindungen, die ihre Erklärung vorhergesagt hatte.',
      legacy: 'Deshalb ist der Schaden antarktisch, jahreszeitlich und so abrupt – und die Antwort kam, während Regierungen gerade entschieden, was sie gegen FCKW tun wollten. Das Montreal-Protokoll wurde 1987 beschlossen.',
    },

    'fritz-haber': {
      work: 'Pflanzen brauchen Stickstoff, und die Luft besteht zu 78 Prozent aus Stickstoff – aber als N2, zusammengehalten von einer Dreifachbindung, die fast nichts aufbricht. 1909 brach Fritz Haber sie auf. Gemeinsam mit Robert Le Rossignol presste er in Karlsruhe Stickstoff und Wasserstoff bei rund 200 Atmosphären Druck und 500 °C über einen Katalysator, und heraus kam Ammoniak. Ein Versuch auf dem Labortisch ist aber noch keine Fabrik. Carl Bosch bei der BASF brauchte die nächsten vier Jahre, um einen billigen Eisenkatalysator zu finden und Stahlbehälter zu bauen, die dem Druck standhalten. Die erste Anlage ging 1913 in Betrieb, und seitdem trägt das Verfahren beide Namen: Haber-Bosch-Verfahren.',
      legacy: 'Fast der gesamte Dünger der Welt beginnt mit dieser Reaktion; Fachleute schätzen, dass der Stickstoff daraus etwa die Hälfte aller heute lebenden Menschen ernährt. Haber leitete auch das deutsche Chemiewaffenprogramm und beaufsichtigte den ersten Massenangriff mit Chlorgas persönlich, im April 1915 bei Ypern. Beides ist derselbe Mann. 1933 wurde er als Jude aus Deutschland gedrängt und starb im Jahr darauf.',
    },

    'marie-maynard-daly': {
      work: 'Marie Maynard Daly arbeitete an zwei ganz verschiedenen Problemen. Ab 1948 untersuchte sie am Rockefeller Institute gemeinsam mit Alfred Mirsky die Chemie des Zellkerns – die Histone, um die die DNA gewickelt ist, und woraus Nukleinsäuren bestehen. Ab 1955 wandte sie sich mit dem Arzt Quentin Deming den Arterien zu. Ihre Versuche, größtenteils an Ratten mit hohem Blutdruck, gehörten zu den ersten, die drei Dinge zusammenbrachten, die man bis dahin getrennt untersucht hatte: hohen Blutdruck, Cholesterin und sich verengende Arterien.',
      legacy: 'Dieser Zusammenhang ist heute das gewöhnliche Bild von Herzkrankheiten. Aufgebaut haben ihn viele Gruppen über mehrere Jahrzehnte, und Daly und Deming lieferten einige der ersten experimentellen Belege dafür. Sie lehrte fünfundzwanzig Jahre lang Biochemie am Albert Einstein College of Medicine und stiftete ein Stipendium für Schwarze Studierende, die in die Naturwissenschaften gehen.',
      credit: '1947 wurde sie als erste Schwarze Frau in den Vereinigten Staaten in Chemie promoviert, an der Columbia University – in einem Fachbereich mit genau einer Professorin.',
    },

    'paul-sabatier': {
      work: 'Eine Kohlenstoff-Kohlenstoff-Doppelbindung nimmt Wasserstoff nicht einfach so auf, egal wie viel Wasserstoff man ihr anbietet. 1897 fanden Paul Sabatier und Jean-Baptiste Senderens in Toulouse heraus, dass fein verteiltes Nickel das völlig ändert. Das Metall hält den Wasserstoff und die Doppelbindung auf seiner Oberfläche fest, bringt sie nebeneinander und lässt sie sich verbinden. Am Ende ist das Nickel unverändert: Es ist ein Katalysator, und ein billiger dazu. Sabatiers Variante arbeitete mit Dämpfen. Vier Jahre später übertrug Wilhelm Normann in Deutschland dieselbe Chemie auf flüssige Öle – und das ist der Schritt, der aus einem dünnflüssigen Pflanzenöl ein festes Fett macht.',
      legacy: 'Die katalytische Hydrierung ist heute eine der meistgenutzten Reaktionen der Industrie, von Margarine bis zu Medikamenten. Sabatier teilte sich den Nobelpreis von 1912 mit Victor Grignard, allerdings für getrennte Arbeiten und nicht für eine Zusammenarbeit.',
      credit: 'Senderens, der die Versuche von 1897 mit ihm gemacht hat, ging bei diesem Preis leer aus – eine Auslassung, die die Chemie bis heute für ihn zur Sprache bringt.',
    },

    'reatha-clark-king': {
      work: 'Um zu beurteilen, ob ein Raketentreibstoff etwas taugt, brauchst du eine Zahl: genau wie viel Energie beim Verbrennen frei wird. Reatha Clark King maß solche Zahlen in den 1960er-Jahren am National Bureau of Standards für Fluorverbindungen. Fluor ist das reaktionsfreudigste Element überhaupt, und Sauerstoffdifluorid greift fast alles an, worin man es verbrennen will. King entwarf einen Brenner aus Nickel mit einem gewendelten Rohr, mit dem sich die Flamme kühlen und steuern ließ, statt die Apparatur zu zerstören. So bekam sie eine Bildungsenthalpie für Sauerstoffdifluorid, die genau genug war, um veröffentlicht zu werden. Dafür bekam sie den Preis ihrer Behörde für die beste Arbeit des Jahres.',
      legacy: 'Diese Zahlen flossen in die Bewertung von Fluorverbindungen als Oxidationsmittel für Raketen ein. Geflogen sind sie nie: Sie sind zu giftig und zu aggressiv, um sie in dieser Größenordnung zu handhaben – und genau dafür sind Messungen da, um so etwas herauszufinden. King wurde später Universitätspräsidentin und leitete danach die General Mills Foundation.',
    },

    'gilbert-lewis': {
      work: 'Vor 1916 war eine chemische Bindung ein Strich auf dem Papier, ohne eine Erklärung dahinter. Gilbert Lewis lieferte eine: Eine Bindung ist ein Elektronenpaar, das sich zwei Atome teilen. Atome landen gern bei acht Elektronen in ihrer Außenschale, und Teilen ist ein Weg dorthin. Er zeichnete diese Elektronen als Punkte – deshalb heißt eine Zeichnung aus Punkten um ein Elementsymbol herum Lewis-Formel. 1923 kam eine zweite Idee dazu: Eine Säure ist alles, was ein Elektronenpaar aufnimmt, und eine Base alles, was eines abgibt. Diese Definition erfasst auch Reaktionen, in denen überhaupt kein Wasserstoff vorkommt.',
      legacy: 'Irving Langmuir baute dasselbe Bild aus und machte es bekannt, gab der Chemie das Wort „kovalent“, und jahrelang hieß die Sache Lewis-Langmuir-Theorie. Lewis wurde Dutzende Male für den Nobelpreis vorgeschlagen und bekam ihn nie. Jedes Punktediagramm, das du zeichnest, ist seines.',
    },

    'stephanie-kwolek': {
      work: '1965 löste Stephanie Kwolek bei DuPont ein steifes, stäbchenförmiges Polymer auf und bekam eine Lösung, die falsch aussah. Polymerlösungen sind dick, sirupartig und klar; ihre war dünn und trüb. Trüb hieß sonst: ungelöste Reste, die die Spinnmaschine verstopfen, und normalerweise kippte man so etwas weg. Kwolek filtrierte die Lösung, um zu zeigen, dass sie sauber war, und überredete die Leute an der Spinnmaschine, sie trotzdem zu verspinnen. Die Trübung war genau der Punkt: Die starren Ketten legten sich in der Flüssigkeit von selbst nebeneinander, so wie es ein Flüssigkristall tut. Zur Faser versponnen, blieben sie ausgerichtet.',
      legacy: 'Diese Ausrichtung ist der Grund, warum die Faser – ab 1971 als Kevlar verkauft – dem Zerreißen so gut widersteht: Auf das Gewicht bezogen schlägt sie Stahl. Schutzwesten, schnittfeste Handschuhe, Bremsbeläge und Bootsrümpfe verlassen sich darauf. Aus der Entdeckung ein Produkt zu machen, brauchte ein ganzes Team bei DuPont, vor allem Herbert Blades, der einen Weg fand, die Faser in großem Maßstab zu verspinnen.',
    },

    'akira-yoshino': {
      work: 'Frühe wiederaufladbare Lithiumbatterien enthielten metallisches Lithium, und metallisches Lithium wächst bei jedem Laden zu Spitzen aus. Früher oder später erreicht eine Spitze die andere Elektrode, und die Batterie fängt Feuer. 1985 baute Akira Yoshino bei Asahi Kasei eine Zelle, in der überhaupt kein metallisches Lithium mehr steckte. Er kombinierte John Goodenoughs Lithiumcobaltoxid als positive Elektrode mit einem Kohlenstoffmaterial – Petrolkoks – als negative. Die Lithium-Ionen gleiten in beide Elektroden hinein und wieder heraus, statt sich als Metall abzuscheiden. Das Laden schiebt sie in die eine Richtung; beim Benutzen wandern sie zurück.',
      legacy: 'Das ist der Lithium-Ionen-Akku in deinem Handy, und Sony brachte 1991 den ersten davon in den Handel. Yoshino teilte sich den Nobelpreis 2019 mit Goodenough und Stanley Whittingham: drei Menschen, drei Etappen, eine Batterie.',
    },

    'margarita-salas': {
      work: 'Phi29 ist ein Virus, das Bakterien befällt, und Margarita Salas verbrachte dreißig Jahre damit herauszufinden, wie es seine DNA kopiert. 1984 isolierte ihre Gruppe in Madrid gemeinsam mit Luis Blanco dessen DNA-Polymerase – das Enzym, das kopiert – und fand sie gleich in dreifacher Hinsicht ungewöhnlich. Sie hält die Vorlage fest und kopiert Zehntausende Basen, ohne loszulassen. Sie schiebt den Gegenstrang dabei aus dem Weg und braucht deshalb kein zweites Enzym, das die Doppelhelix aufzieht. Und sie liest Korrektur, macht also sehr wenige Fehler.',
      legacy: 'Nimm diese drei Eigenschaften zusammen, und eine verschwindend kleine DNA-Probe lässt sich auf eine brauchbare Menge vervielfältigen – bei einer einzigen, gleichbleibenden Temperatur, ohne das ständige Aufheizen und Abkühlen, das die PCR braucht. Genutzt wird das an Spuren in der Forensik, an einzelnen Zellen und an DNA aus archäologischen Funden. Das Patent wurde zum einträglichsten, das der spanische Forschungsrat je gehalten hat.',
    },

    'alfred-werner': {
      work: 'Manche Verbindungen wollten sich nicht an die Regeln halten. Cobaltchlorid mit sechs angelagerten Ammoniakmolekülen verhielt sich so, als seien alle drei Chloride lose; mit fünf Ammoniakmolekülen waren es nur noch zwei. 1893 sagte Alfred Werner, damals 26, der Grund sei: Bei einem Metall-Ion laufen zwei Dinge getrennt nebeneinander her – eine Ladung, die ausgeglichen werden muss, und eine feste Zahl von Plätzen ringsherum, an denen Moleküle oder Ionen andocken können. Bei Cobalt sind das sechs, angeordnet an den Ecken eines Oktaeders. Sehen konnte er davon nichts. Er bewies es durch Abzählen: Ein Oktaeder sagt genau zwei Formen einer Verbindung mit vier gleichen und zwei anderen Gruppen voraus, und zwei fand er immer.',
      legacy: 'Werner bekam 1913 den Nobelpreis, als erster Schweizer Chemiker und als erster anorganischer Chemiker überhaupt. Komplex-Ionen wie seine sind eine Familie der mehratomigen Ionen: ein Metall in der Mitte, mit Molekülen ringsherum angeklemmt. Die meisten mehratomigen Ionen, die du lernst – etwa Sulfat und Nitrat –, sind gar keine Komplexe.',
    },

    'johanna-dobereiner': {
      work: 'Hülsenfrüchten – Bohnen, Erbsen, Sojabohnen – muss man keinen Stickstoff geben. Sie beherbergen Bakterien in Knöllchen an ihren Wurzeln, und diese Bakterien holen N2 direkt aus der Luft und machen daraus Ammoniak, das die Pflanze nutzen kann. Johanna Döbereiner, die ab 1950 in Brasilien arbeitete, fragte, ob das auch eine Nutzpflanze im großen Maßstab auf tropischem Boden tragen kann; die brasilianische Landwirtschaft kopierte damals das amerikanische Modell und kippte Stickstoffdünger aufs Feld. Sie suchte nach Bradyrhizobium-Stämmen, die zu brasilianischen Böden und brasilianischen Sojasorten passen, prüfte sie auf dem Acker und trieb die Ergebnisse in ein nationales Programm zur Impfung des Saatguts. Ihre Gruppe beschrieb außerdem mehrere neue stickstofffixierende Arten.',
      legacy: 'Brasilianische Sojabohnen holen sich ihren Stickstoff heute praktisch vollständig von Bakterien statt aus dem Sack. Eine Schätzung von 2021 beziffert die Ersparnis auf über vierzehn Milliarden US-Dollar pro Ernte. Phosphor und Kalium brauchen sie weiterhin. Das ist also keine Landwirtschaft ohne Dünger, sondern Landwirtschaft ohne Stickstoffdünger – und das ist die schwierigere Hälfte.',
    },

    'vladimir-prelog': {
      work: 'Manche Moleküle gibt es in zwei Formen, die sich wie Bild und Spiegelbild verhalten, so wie deine beiden Hände, und kein noch so geschicktes Drehen macht die eine zur anderen. Das konnte die Chemie sehen; wofür sie keine vereinbarte Sprache hatte, war: welche davon welche ist. Vladimir Prelog tat sich mit Robert Cahn und Christopher Ingold zusammen, und 1956 veröffentlichten die drei Regeln, die das klären. Du schaust dir die vier Gruppen am Kohlenstoffatom an und ordnest sie, das schwerste Atom zuerst. Dann drehst du das Molekül so, dass die niedrigste Gruppe von dir weg zeigt, und liest die anderen drei ab: im Uhrzeigersinn ist R, gegen den Uhrzeigersinn ist S.',
      legacy: 'Das sind die Cahn-Ingold-Prelog-Regeln, und deshalb bedeutet ein R oder ein S in einem chemischen Namen in jedem Labor und in jeder Sprache dasselbe. Wichtig ist das, weil zwei spiegelbildliche Formen eines Medikaments sich im Körper völlig unterschiedlich verhalten können. Prelog wurde in Sarajevo geboren, wuchs in Zagreb auf, floh 1941 nach Zürich und teilte sich 1975 den Nobelpreis mit John Cornforth.',
    },

    'maria-telkes': {
      work: 'Die Sonne scheint tagsüber, und die Wärme willst du nachts haben – ein Sonnenhaus braucht also einen Ort, an dem sie bleibt. Mária Telkes wählte eine chemische Lösung statt eines Tanks mit heißem Wasser. Glaubersalz – Natriumsulfatkristalle mit eingebautem Wasser – schmilzt bei etwa 32 °C. Einen Feststoff zu schmelzen nimmt Energie auf, ohne dass seine Temperatur steigt, und diese Energie kommt beim Erstarren wieder heraus. Eine bestimmte Masse des Salzes speichert deshalb viel mehr Wärme als dieselbe Masse erwärmten Wassers. 1948 baute sie zusammen mit der Architektin Eleanor Raymond das Dover Sun House in Massachusetts, mit Fässern voller Salz in den Wänden.',
      legacy: 'Eine Familie wohnte darin, allein von der Sonne beheizt, zwei Winter lang und einen dritten zum Teil. Dann versagte es. Das Salz schmilzt nicht sauber, es setzt sich Feststoff ab, und bei jedem Zyklus findet ein wenig weniger davon wieder zusammen; dazu fraß sich die salzige Lösung durch die Stahlfässer. Das ist Chemie und kein Baufehler – und es ist bis heute das Haupthindernis für Wärmespeicher aus Salz.',
    },

    'giulio-natta': {
      work: 'Propenmoleküle verbinden sich zu langen Ketten. Tun sie das aber, wie es ihnen gerade passt, entsteht ein Knäuel mit Methylgruppen auf beiden Seiten, und der Kunststoff ist weich und schwach. Am 11. März 1954 stellte Giulio Natta am Politecnico di Milano eine Kette her, in der jede Methylgruppe in dieselbe Richtung zeigt. Er benutzte einen Katalysator der Art, die Karl Ziegler entwickelt hatte: Er hält jedes ankommende Molekül in einer festen Ausrichtung, bis es angedockt hat. Natta nannte diese regelmäßige Anordnung isotaktisch. Regelmäßige Ketten können dicht aneinanderpacken und sich zu Kristallen ordnen; verknäuelte können das nicht.',
      legacy: 'Deshalb ist Polypropylen steif, fest und leicht genug, um überall zu stecken: in Flaschendeckeln, Stoßstangen, Seilen, Frischhaltedosen und Thermounterwäsche. Natta und Ziegler teilten sich 1963 den Nobelpreis.',
      credit: 'Ziegler war über das Teilen nicht erfreut. Natta war über Zieglers Katalysatorchemie zu der Reaktion gekommen, und die beiden Seiten stritten mehr als zwanzig Jahre lang vor Gericht um die Patente – meist mit dem besseren Ende für Ziegler.',
    },

    'tu-youyou': {
      work: 'Malariaparasiten waren gegen die üblichen Medikamente resistent geworden, und 1969 bekam Tu Youyou die Leitung der Gruppe ihres Instituts innerhalb von Projekt 523, einer geheimen chinesischen Suche nach einem neuen Mittel. Ihr Team prüfte Hunderte Pflanzenauszüge aus der traditionellen Medizin. Einjähriger Beifuß wirkte mal und mal nicht. Beim Lesen eines Handbuchs mit Notfallrezepten aus dem 4. Jahrhundert fiel ihr auf, dass dort stand, man solle die Pflanze in kaltem Wasser einweichen und den Saft auswringen – nicht kochen. Wenn Hitze den Wirkstoff zerstörte, dann lag das Problem im Auszugsverfahren. Sie stieg auf Ether um, der schon bei 35 °C siedet, und bekam im Oktober 1971 einen Auszug, der die Parasiten jedes Mal abtötete.',
      legacy: 'Die reine Verbindung, Artemisinin, folgte 1972. Artemisinin zusammen mit einem zweiten Medikament ist heute die Behandlung, die die Weltgesundheitsorganisation empfiehlt, und sie hat Millionen Leben gerettet. An Projekt 523 waren Hunderte Forschende in ganz China beteiligt, und wie der Verdienst aufzuteilen ist, wird dort bis heute diskutiert.',
      credit: 'Tu bekam 2015 einen Nobelpreis – ohne Doktortitel, ohne Ausbildung im Ausland und ohne Mitgliedschaft in Chinas Akademien. Zu Hause heißt sie deshalb die „Drei-ohne-Wissenschaftlerin“.',
    },

    'dan-shechtman': {
      work: 'Kristalle wiederholen sich. Das war keine Vermutung, das war die Definition: Die Atome sitzen in einem Muster, das sich in jede Richtung immer wieder selbst kopiert, und ein solches Muster kann keine fünf- oder zehnzählige Symmetrie haben – einen Boden kann man mit Fünfecken nicht lückenlos auslegen. Am 8. April 1982 schoss Dan Shechtman, von der Technion in Haifa an ein US-Regierungslabor abgeordnet, Elektronen durch eine schnell abgekühlte Aluminium-Mangan-Legierung und bekam ein Beugungsmuster mit zehnzähliger Symmetrie. Sein Laborbuch hält zu dieser Probe fest: „10 fold ???“. Die Atome waren perfekt geordnet – man konnte sagen, wohin das nächste gehört –, aber die Anordnung wiederholte sich nie.',
      legacy: 'Es dauerte Jahre, bis das anerkannt wurde. Linus Pauling schrieb, die Probe bestehe schlicht aus verzwillingten Kristallen, und blieb bis zuletzt dabei. Die Belege häuften sich trotzdem, und 1992 schrieb die Internationale Union für Kristallographie ihre Definition eines Kristalls um, damit Muster hineinpassen, die sich nie wiederholen. Shechtman bekam 2011 den Nobelpreis für Chemie. Quasikristalle sind seitdem auch in der Natur gefunden worden, in einem Meteoriten.',
    },
  },
} satisfies ExploreOverlay;
