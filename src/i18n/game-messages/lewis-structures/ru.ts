// src/i18n/game-messages/lewis-structures/ru.ts
//
// Share to Fill — «Делись и заполняй» — in Russian.
//
// Terminology is fixed in docs/i18n/glossary-ru.md. The four decisions that
// shape this file:
//
//   * **неспаренный электрон** is the only word for an unpaired outer
//     electron, everywhere — coach lines, hints, glossary and the canvas
//     legend alike. The game word «одиночка» and the short canvas label
//     «соло» were both dropped on 2026-09-19; the reasoning is kept in
//     docs/i18n/glossary-ru.md so nobody re-proposes them.
//     The collision warnings that chose «одиночка» are still true and still
//     bind anything written near this term: *свободный* is taken twice over
//     (*свободная электронная пара* is a lone pair, *свободные электроны* are
//     the delocalised ones in a metal), *одинокая пара* is the calque of *lone
//     pair* that Spanish rejected as *solitario*, and *одиночный* collides
//     with *одинарная связь* three levels later.
//     It is a masculine noun phrase, so it counts
//     1 неспаренный электрон / 2 неспаренных электрона / 5 неспаренных
//     электронов, and every case form it uses is listed in
//     `glossary.unpairedElectron.matches`.
//
//   * **Nothing agrees with an interpolated name.** `{atom}`, `{name}` and
//     `{element}` arrive from the chemistry-names overlay in the **nominative
//     only**, and Russian wants six cases. So every one of them sits after a
//     colon, after a dash, or as the subject of a clause — never after a
//     preposition. Where the English writes "the shared pair between {atom1}
//     and {atom2}" (instrumental in Russian) or "the loner on {atom}"
//     (prepositional), the Russian names the atoms in a trailing list instead.
//     README § Where a placeholder may sit; glossary-ru.md § Case government.
//
//   * **Every count string is invariant, or it is a plural record.** The
//     records carry all four CLDR categories Russian needs, and `other` is
//     worded like `few` because only a fraction reaches it.
//
//   * **The reader is never the subject of a past tense.** «Ты насчитал» is
//     wrong for half the readers, so `inspect.countWrong` is «Твой ответ:
//     {given}» and Level 4's "You choose" is «центральный выбираешь ты».
//
// Formulae inside `backticks` and the bond lines are notation and are
// untouched. Typography: « » with no inner spaces, — with spaces, … as one
// character, and ё written out.

import type { LewisStructuresMessages } from '@/core-engine/config/games/lewis-structures-messages';

export const ru = {
  header: {
    subtitle: 'Делись и заполняй',
    // Colon rather than a verb's object: «Собери воду» would need the
    // accusative, and the overlay only has «вода».
    build: 'Собери: {name} ({formula})',
    inspect: 'Проверь: {name} ({formula})',
    progress: 'Молекула {round}/{total}',
    marking: 'Рисунок {round}/{total}',
  },

  instructions: {
    title: 'Как играть: Делись и заполняй',
    lead: 'Соединяй неспаренные электроны в пары.',
    intro:
      'Каждый атом приносит свои внешние электроны — они нарисованы точками. Точка сама по себе — это неспаренный электрон, ему нужен напарник. Два неспаренных электрона от разных атомов дают общую пару, а общая пара — это связь.',
    bullets: [
      'Перетащи мигающую точку на мигающую точку другого атома (или нажми сначала на одну, потом на другую).',
      'Атом заполнен, когда вокруг него 8 точек. Водороду хватает двух.',
      'Поделись дважды между одними и теми же атомами — получится двойная связь.',
      'Структура закрепляется сама, когда все атомы заполнены и неспаренных электронов не осталось. Никакой кнопки не нужно.',
      'Не получается? Нажми на лампочку (или H). Первая подсказка всегда бесплатная.',
    ],
    disclaimer:
      'Точки показывают, сколько у атома внешних электронов, а не где они на самом деле.',
    /** Column 1 is the physical key and is never translated. */
    keyboard: [
      ['Tab', 'выбрать атом'],
      ['← →', 'перебрать его неспаренные электроны'],
      ['Enter', 'начать пару; на другом атоме повторить — и пара готова'],
      ['Esc', 'отменить'],
      ['H', 'подсказка'],
      ['P', 'пауза'],
    ],
    touch: [
      ['Нажми', 'на неспаренный электрон, потом на неспаренный электрон другого атома.'],
      ['Нажми', 'на общую пару, чтобы разорвать её.'],
    ],
    glossaryTitle: 'Слова, которые встретятся в игре',
  },

  guided: {
    stepLabel: 'Шаг {step} из {total}',
    h2: [
      'Два атома водорода. У каждого один неспаренный электрон — он же единственный внешний. Перетащи один на другой.',
      'Теперь у них общая пара. Посчитай точки вокруг каждого H: их 2. Водороду хватает двух — это одинарная связь, H–H.',
    ],
    h2oStep1:
      'У кислорода 6 внешних электронов: две пары (они остаются на месте) и два неспаренных электрона (они мигают).',
    h2oStep2: 'Соедини один неспаренный электрон кислорода с неспаренным электроном водорода.',
    h2oStep2After: 'Теперь вокруг кислорода 7 — остался один.',
    h2oStep3: 'Соедини второй неспаренный электрон кислорода со вторым водородом.',
    h2oStep4:
      'Кислород: 8. Каждый водород: 2. Две общие пары и две неподелённые пары — это вода, H–O–H.',
  },

  coach: {
    label: 'Наставник',
    // Four forms. «Неспаренный электрон» is masculine, so `one` takes the
    // agreeing «остался» and the other three the impersonal «осталось» with
    // the genitive — genitive singular after 2–4 (`few`, `other`), genitive
    // plural from 5 (`many`).
    loners: {
      one: '{atom} — остался {count} неспаренный электрон. Он соединяется с неспаренным электроном другого атома.',
      few: '{atom} — осталось {count} неспаренных электрона. Они соединяются с неспаренными электронами другого атома.',
      many: '{atom} — осталось {count} неспаренных электронов. Они соединяются с неспаренными электронами другого атома.',
      other: '{atom} — осталось {count} неспаренного электрона. Они соединяются с неспаренными электронами другого атома.',
    },
    needsMore:
      '{atom} — {count} из 8. Нужна ещё одна общая пара: у какого атома ещё остался неспаренный электрон?',
    shareAgain:
      '{atom1} и {atom2} — у обоих ещё есть неспаренный электрон. Они могут поделиться ещё раз: получится двойная связь.',
    complete:
      'Все атомы заполнены, неспаренных электронов не осталось. Это {name}: {bonds}, {lonePairs}.',
    // «как у {analogueMolecule}» would need the genitive, so the analogue
    // molecule moves behind a colon.
    sameGroup:
      '{element} — в той же группе, что и {analogue}, поэтому внешних электронов столько же. Строение получится такое же, как здесь: {analogueMolecule}.',
    central: 'В середину обычно идёт атом, у которого больше всего неспаренных электронов.',
    deadEnd:
      '{atom} — {count} из 8, но неспаренных электронов больше ни у кого нет. Нажми на общую пару, чтобы разорвать её, и выбери другого напарника.',
    isomer:
      'Все атомы заполнены, но соединены они не так, как нужно. Должно получиться вот это: {name}. Нажми на общую пару, чтобы разорвать её, и попробуй другое расположение.',
  },

  /** Noun phrases counted inside a sentence, so each has its own plural. */
  counts: {
    sharedPairs: {
      one: '{count} общая пара',
      few: '{count} общие пары',
      many: '{count} общих пар',
      other: '{count} общие пары',
    },
    lonePairs: {
      one: '{count} неподелённая пара',
      few: '{count} неподелённые пары',
      many: '{count} неподелённых пар',
      other: '{count} неподелённые пары',
    },
    bonds: {
      one: '{count} связь',
      few: '{count} связи',
      many: '{count} связей',
      other: '{count} связи',
    },
  },

  hint: {
    label: 'Подсказка',
    tierLabel: 'Подсказка {tier} из 3',
    tier1: 'Найди атомы, у которых ещё мигают точки.',
    // Tier 2 is the molecule's own hint, translated in chemistry-names/.
    tier3: 'Соедини неспаренные электроны двух атомов: {atom1} и {atom2}.',
    tier3Undo: 'Нажми на общую пару этих двух атомов: {atom1} и {atom2}.',
    offerTier2: 'Всё ещё не получается? Нажми на лампочку ещё раз — будет стратегия.',
    noMoreHints: 'Это была последняя подсказка. Все атомы заполнены — нажми «Дальше».',
    inspectTier1: 'Посчитай точки вокруг каждого атома. Должно быть 8, у водорода — 2.',
    inspectTier2:
      'Сначала проверь атомы с наибольшим числом связей. Лишние и пропущенные пары прячутся там.',
    inspectTier3: '{atom} — {count}. Нажми на него и выбери, что не так.',
    inspectTier3Correct:
      'Все атомы заполнены, ничего лишнего не осталось — нажми «Здесь всё верно».',
    inspectTier3Repair: 'Соединяй неспаренные электроны, пока каждый атом снова не заполнится.',
    inspectTier3CountBonds: {
      one: 'Каждая линия между двумя атомами — это одна связь. Здесь {count} связь.',
      few: 'Каждая линия между двумя атомами — это одна связь. Здесь {count} связи.',
      many: 'Каждая линия между двумя атомами — это одна связь. Здесь {count} связей.',
      other: 'Каждая линия между двумя атомами — это одна связь. Здесь {count} связи.',
    },
    inspectTier3CountLonePairs: {
      one: 'Каждая пара точек не на линии — это неподелённая пара. Здесь {count} пара.',
      few: 'Каждая пара точек не на линии — это неподелённая пара. Здесь {count} пары.',
      many: 'Каждая пара точек не на линии — это неподелённая пара. Здесь {count} пар.',
      other: 'Каждая пара точек не на линии — это неподелённая пара. Здесь {count} пары.',
    },
  },

  error: {
    label: 'Так не получится',
    atomFull:
      '{atom} — уже 8, делиться больше нечем. Возьми атом, у которого ещё остался неспаренный электрон.',
    hydrogenFull: 'Водороду хватает двух. Он может отдать только одну пару.',
    sameAtom:
      'Эти две точки на одном атоме — они и так уже пара. Для связи нужны два разных атома.',
    pairedDot:
      'Эта точка уже в паре. Делиться могут только неспаренные электроны — те, что мигают.',
  },

  inspect: {
    classmate: 'Рисунок одноклассника: {name}.',
    prompt: 'Нажми на атом, который считаешь неверным, — или скажи, что рисунок правильный.',
    // «Что не так с {atom}?» would need the instrumental.
    diagnosisPrompt: '{atom} — что здесь не так?',
    diagnosis: {
      tooMany: 'слишком много электронов у этого атома',
      tooFew: 'слишком мало — не хватает неподелённой пары',
      hydrogenFull: 'водород может отдать только одну пару',
      needsDouble: 'этим атомам нужно поделиться дважды (двойная связь)',
      leftover: 'остался неспаренный электрон',
      none: 'ошибки нет',
    },
    wrongAtom: '{atom} — {count}, здесь всё в порядке. Ищи атом, где точек мало или много.',
    wrongDiagnosis: 'Не совсем. Посчитай точки вокруг атома {atom}: {count}. {explanation}',
    explainTooMany: '{atom} — больше чем {full}: нарисована лишняя неподелённая пара.',
    explainTooFew: '{atom} — меньше 8: не хватает неподелённой пары.',
    explainHydrogenFull: 'У водорода 4 — он может отдать только одну пару.',
    explainNeedsDouble:
      '{atom1} и {atom2} — у каждого ещё остался неспаренный электрон: им нужно поделиться дважды.',
    explainLeftover: '{atom} — остался неспаренный электрон: нарисован лишний электрон.',
    correctStructure: 'Верно — все атомы заполнены, ничего лишнего.',
    missedCorrect:
      'А здесь всё правильно: каждый атом заполнен. Ошибка есть не в каждом рисунке.',
    notCorrect:
      'Не совсем — один атом всё-таки не тот. Посчитай точки вокруг каждого и нажми на неверный.',
    repair: 'Теперь исправь: соединяй неспаренные электроны, пока каждый атом не заполнится.',
    repaired: 'Исправлено — все атомы снова заполнены.',
    countBonds: 'Сколько здесь связей? Нажми на каждую общую пару.',
    countLonePairs: 'Сколько здесь неподелённых пар? Нажми на каждую пару, которая не общая.',
    // Not «ты насчитал»: a Russian past tense agrees with the reader's gender.
    countWrong:
      'Твой ответ: {given}, а на самом деле {actual}. Пропущенные подсвечены.',
    countWrongDouble:
      'Твой ответ: {given}, а на самом деле {actual}. Пропущенные подсвечены: двойная связь — это одна связь, но две общие пары.',
    countRight: 'Верно — {counted}.',
    countLabel: 'Насчитано: {counted}',
  },

  success: {
    label: 'Готово',
    round: '{name} — готово: {bondLine}.',
    bonus: 'Бонус без подсказок +{points}',
    points: '+{points}',
  },

  overlay: {
    levelUpBadge: 'Все атомы заполнены',
    levelUpTitle: 'Уровень пройден',
    levelUpSubtitle: 'Неспаренных электронов не осталось',
    levelUpDescription: 'Уровень {level}: {changes}',
    levelChanges: {
      level2:
        'кислород, азот и углерод приносят неподелённые пары, которые остаются на месте, а каждая третья молекула — рисунок одноклассника, его нужно проверить.',
      level3:
        'некоторым атомам нужно поделиться дважды — это двойная связь. Наставник теперь ждёт, пока его позовут.',
      level4: 'атомы не расставлены заранее: центральный выбираешь ты.',
      level5: 'режим проверки — шесть рисунков одноклассников, без наставника, только подсказки.',
    },
    victoryBadge: 'Все цели достигнуты',
    victoryTitle: 'Формулы Льюиса освоены',
    victorySubtitle: 'Неспаренных электронов не осталось',
    victoryDescription: 'Открой лист проверки и посмотри ещё раз, что у тебя получилось.',
    pausedBadge: 'Опыт на паузе',
    pausedTitle: 'Пауза',
    pausedSubtitle: 'Время никто не считает.',
    pausedDescription: 'Структура осталась ровно там, где была.',
  },

  notebook: {
    header: 'Твои структуры',
    markingHeader: 'Твой лист проверки',
    columnMolecule: 'Молекула',
    columnBondLine: 'Структурная формула',
    columnCounts: 'Связи / неподелённые пары',
    columnHint: 'Подсказка',
    columnDiagnosis: 'Что нашлось',
    noHint: 'без подсказок',
    hintTier: 'уровень {tier}',
    diagnosisRow: '{label}',
    diagnosisRowFirstTry: '{label} — с первой попытки',
    empty: 'Структур пока нет.',
  },

  /**
   * Russian inflects heavily, so these lists are two to three times longer
   * than the German ones. They list the forms the copy above actually uses —
   * verified by the "cover the running text" assertion in
   * game-messages.test.ts — rather than every form the grammar allows, which
   * would be unmaintainable and which no test could tell from a correct list.
   */
  glossary: {
    outerElectron: {
      term: 'внешний (валентный) электрон',
      definition: 'электрон на внешней оболочке — именно им атом и делится',
      matches: [
        'внешние электроны',
        'внешних электронов',
        'внешний электрон',
        'внешними электронами',
        'валентные электроны',
        'валентный электрон',
      ],
    },
    unpairedElectron: {
      term: 'неспаренный электрон',
      definition: 'внешний электрон без напарника; делиться могут только они',
      // Russian carries more forms than any other locale here, because the
      // phrase declines in both words and the copy uses six of the twelve
      // case/number cells. The parity gate exempts `matches` length across
      // locales for exactly this reason.
      matches: [
        'неспаренными электронами',
        'неспаренных электронах',
        'неспаренным электронам',
        'неспаренных электронов',
        'неспаренные электроны',
        'неспаренных электрона',
        'неспаренного электрона',
        'неспаренному электрону',
        'неспаренным электроном',
        'неспаренном электроне',
        'неспаренный электрон',
      ],
    },
    lonePair: {
      term: 'неподелённая пара',
      definition: 'два внешних электрона, которые остаются на одном атоме и не делятся',
      matches: [
        'неподелённые пары',
        'неподелённая пара',
        'неподелённых пар',
        'неподелённой пары',
        'неподелённую пару',
      ],
    },
    sharedPair: {
      term: 'общая пара (связь)',
      definition: 'два электрона, по одному от каждого атома, поделённые между ними — на рисунке это линия',
      matches: [
        'общие пары',
        'общая пара',
        'общих пар',
        'общую пару',
        'общей паре',
        'связи',
        'связь',
        'связей',
      ],
    },
    bondOrder: {
      term: 'одинарная / двойная / тройная связь',
      definition: 'одна, две или три общие пары между одними и теми же атомами',
      matches: ['одинарная связь', 'двойная связь', 'тройная связь', 'двойную связь'],
    },
    octet: {
      term: 'октет',
      definition: 'восемь внешних электронов вокруг атома — полный набор',
      matches: ['октет', 'октета'],
    },
    duet: {
      term: 'дублет',
      definition: 'два внешних электрона вокруг водорода — полный набор',
      matches: ['дублет', 'дублета'],
    },
    dot: {
      term: 'точка',
      definition: 'показывает, сколько внешних электронов, а не где они',
      matches: ['точки', 'точка', 'точек', 'точками', 'точку'],
    },
  },

  ui: {
    nextMolecule: 'Следующая молекула',
    nextDrawing: 'Следующий рисунок',
    finishLevel: 'Завершить уровень',
    skipGuide: 'Пропустить обучение',
    nextStep: 'Дальше',
    thisOneIsCorrect: 'Здесь всё верно',
    doneCounting: 'Готово',
    startRepair: 'Исправить',
    openMarkingSheet: 'Открыть лист проверки',
    closeMarkingSheet: 'Назад',
    playAgain: 'Играть снова',
    supportMode: 'Режим поддержки',
    supportModeHelp:
      'Наставник остаётся открытым на каждом уровне. Точность от этого не падает.',
    hintButtonA11y: 'Получить подсказку',
    dismissHintA11y: 'Скрыть подсказку',
    coachRegionA11y: 'Сообщения наставника',
    canvasLabelA11y: 'Точечная формула: {name}',
    atomNameA11y: '{element}: {count} из {full}',
    atomCounterA11y: '{symbol}: {count} из {full}',
    atomLonerA11y: '{element}, неспаренный электрон {index} из {total}',
    atomLonePairA11y: '{element}, неподелённая пара {index} из {total}',
    atomOrdinal: '{element} {ordinal}',
    // The Level 1 scaffold, off from Level 2. The 44 px budget that forced
    // Russian onto the short «соло» was a constraint on stamping a label
    // beside every dot 50 px from its neighbour, not on how long the term may
    // be: since 2026-09-19 the label is printed once, in the canvas legend,
    // so the full phrase fits in every language.
    unpairedLabel: 'неспаренный электрон',
    atomFull: 'заполнен',
    atomSelectedA11y:
      '{element}: неспаренный электрон выбран. Теперь выбери неспаренный электрон на другом атоме.',
    atomInspectTapA11y: '{element} — нажми, если этот атом неверный',
    // «между {atom1} и {atom2}» would need the instrumental, so the atoms are
    // named in a trailing list instead.
    bondSingleA11y: 'Одинарная связь, атомы: {atom1} и {atom2}',
    bondDoubleA11y: 'Двойная связь, атомы: {atom1} и {atom2}',
    bondTripleA11y: 'Тройная связь, атомы: {atom1} и {atom2}',
    bondUndoA11y: 'нажми, чтобы разорвать последнюю общую пару',
    bondCountA11y: 'нажми, чтобы посчитать',
    bondCountedA11y: 'посчитано',
    livePaired:
      'Общая пара готова. Атомы: {atom1} и {atom2}. Теперь {name1} — {count1}, {name2} — {count2}.',
    liveUnpaired: 'Общая пара разорвана. Атомы: {atom1} и {atom2}.',
    liveLocked: '{name} — готово. Структура закреплена.',
  },
} satisfies LewisStructuresMessages;

export default ru;
