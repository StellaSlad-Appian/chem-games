// src/i18n/game-messages/reaction-balancer/ru.ts
//
// Reaction Balancer — «Весы реакций» — in Russian.
//
// Terminology is fixed in docs/i18n/glossary-ru.md. What shapes this file:
//
//   * **Nothing agrees with an interpolated name.** Names arrive from the
//     chemistry-names overlay in the **nominative only**. English's "Which
//     compound with {element} could you change?" needs the instrumental in
//     Russian (*с кислородом*) and "check {element} again" needs the
//     accusative — which happens to equal the nominative for *кислород* and
//     does **not** for *сера*. Both were rewritten: the coach uses a
//     который-clause, where the name is the subject and therefore nominative,
//     and the hints put the name after a colon. README § Where a placeholder
//     may sit; glossary-ru.md § Case government.
//
//   * **Every count string is invariant, or it is a plural record.** A Russian
//     numeral governs the case of the noun after it, so the ledger reads
//     «слева не хватает: {count}» rather than «{count} не хватает слева».
//     `card.clustersA11y` is the one record here and carries all four forms.
//
//   * **The reader is never the subject of a past tense** — it would agree
//     with their gender. «Уравнения освоены», not «ты научился».
//
//   * *Уравнять* is the decided verb for balancing, with *расставить
//     коэффициенты* as its fuller school expansion where there is room. The
//     ledger is *баланс атомов* — which is also why the game's title is
//     «Весы реакций» and not «Баланс атомов»: the title would otherwise name
//     a component of itself.
//
// Formulae and equations inside `backticks` are notation and come through
// byte-identical. Typography: « » with no inner spaces, — with spaces, … as
// one character, and ё written out.

import type { ReactionBalancerMessages } from '@/core-engine/config/games/reaction-balancer-messages';

export const ru = {
  header: {
    balance: 'Уравняй: {name}',
    build: 'Собери и уравняй: {name}',
    progress: 'Реакция {round}/{total}',
    challengeProgress: 'Испытание {round}/{total}',
  },

  instructions: {
    title: 'Как играть: Весы реакций',
    lead: 'Сделай так, чтобы атомов было поровну.',
    intro:
      'В химической реакции атомы только перегруппировываются: они не появляются и не исчезают. Значит, с обеих сторон стрелки каждого атома должно быть поровну.',
    bullets: [
      '**Большие числа** перед формулой — это коэффициенты. Их ты и меняешь.',
      '**Маленькие числа** внутри формулы — это индексы. Их менять нельзя: получится другое вещество.',
      '**Баланс атомов** под стрелкой считает каждый элемент слева и справа. Сделай все строки равными — и уравнение закрепится.',
      'Не получается? Нажми на **лампочку** (или H). Первая подсказка всегда бесплатная.',
    ],
    arrow: 'Стрелка значит «получается» или «превращается», а не «равно».',
    /** Column 1 is the physical key and is never translated. */
    keyboard: [
      ['Tab', 'переход между веществами'],
      ['↑ / ↓', 'изменить коэффициент'],
      ['0–9', 'ввести число сразу'],
      ['H', 'подсказка'],
      ['P', 'пауза'],
    ],
    touch: [
      ['Нажми', 'на ▲ / ▼ на карточке, чтобы изменить коэффициент.'],
      ['Нажми', 'на число, чтобы ввести своё.'],
    ],
    compact: [
      'Меняй **большие числа** перед формулой. Маленькие менять нельзя.',
      'Сделай все строки **баланса атомов** равными — уравнение закрепится.',
      'Не получается? Нажми на **лампочку**. Первая подсказка бесплатная.',
    ],
    glossaryTitle: 'Слова, которые встретятся в игре',
  },

  /** The guided walk-through of the first reaction, `2H2 + O2 -> 2H2O`. */
  guided: {
    stepLabel: 'Шаг {step} из {total}',
    steps: [
      'Посмотри на баланс атомов. Водород: слева 2, справа 2 — поровну. Кислород: слева 2, справа 1. Вот его и надо уравнять.',
      'Маленькую 2 в `O2` менять нельзя — получится другое вещество. Значит, добавим воды. Нажми ▲ на `H2O`.',
      'Кислорода теперь 2 и 2. Но посмотри: водород сбился — слева 2, справа 4. Уравняешь один элемент — собьётся другой. Нажми ▲ на `H2`.',
      'Все строки совпали: по 4 H и 2 O с каждой стороны. Уравнение уравнено — `2H2 + O2 -> 2H2O`. Масса сохранилась.',
    ],
  },

  coach: {
    label: 'Наставник',
    // «с {element}» would need the instrumental. A который-clause makes the
    // name the subject of its own clause, so the nominative is right.
    imbalance:
      '{element}: слева {left}, справа {right}. Измени вещество, в котором есть {elementInSentence}.',
    multiple:
      '{fixed} — готово, но сбился другой элемент: {broken}. Уравняешь один — собьётся другой. Дальше проверь: {broken}.',
    balanced: 'Все строки совпали. Масса сохраняется.',
    balancedNotLowest:
      'Уравнено — и все коэффициенты делятся на {k}. Простейший вид: `{equation}`.',
  },

  hint: {
    label: 'Подсказка',
    tierLabel: 'Подсказка {tier} из 3',
    tier1:
      'Начни с элемента, который встречается в наименьшем числе веществ. Здесь это {element}.',
    // Tier 2 is the reaction's own hint, translated in chemistry-names/.
    tier3: 'Поставь {n} перед `{formula}`. Потом снова проверь: {element}.',
    tier3Lower: 'Верни `{formula}` к {n}. Потом снова проверь: {element}.',
    tier3Balanced: 'Все строки уже совпали — уравнение уравнено.',
    tier1Build:
      'Перечитай описание. Там названо каждое исходное вещество и каждое, что получается.',
    tier2Build:
      'Вещества перед словами «реагирует», «горит» или «разлагается» — это реагенты. Вещества после «образуется», «получается» или «превращается в» — это продукты.',
    tier3BuildReactant: 'Добавь в реагенты: {name} (`{formula}`).',
    tier3BuildProduct: 'Добавь в продукты: {name} (`{formula}`).',
  },
  stuck: {
    offer: 'Нужна подсказка посильнее? Нажми на лампочку ещё раз.',
  },

  error: {
    label: 'Так не получится',
    zero: 'Коэффициент не может быть 0 — тогда `{formula}` исчезнет из реакции.',
    max: 'Такие большие коэффициенты — знак, что стоит взять числа поменьше. Ищи простейшее соотношение.',
    subscriptTap:
      'Индексы менять нельзя. `H2O2` — это пероксид водорода, а не вода: меняй большое число.',
    notANumber: 'Коэффициент — целое число от 1 и больше. Введи число или пользуйся ▲ и ▼.',
  },

  /** The Challenge level: build the equation from a word equation first. */
  challenge: {
    label: 'Испытание',
    intro: 'Прочитай описание, собери уравнение и только потом уравнивай.',
    pickerLabel: 'Вещества',
    sideLabel: 'Куда добавить',
    reactants: 'Реагенты',
    products: 'Продукты',
    placeholderReactant: 'добавь реагент',
    placeholderProduct: 'добавь продукт',
    notInReaction:
      'Этого вещества в реакции нет: {name}. Перечитай описание — какие вещества там названы?',
    wrongSideProduct:
      '{name} — продукт: в этой реакции это вещество получается, значит его место справа от стрелки.',
    wrongSideReactant:
      '{name} — реагент: в этой реакции это вещество расходуется, значит его место слева от стрелки.',
    built: 'Уравнение собрано верно. Теперь уравняй его.',
    addAsReactantA11y: 'Добавить в реагенты: {name}, {formula}',
    addAsProductA11y: 'Добавить в продукты: {name}, {formula}',
    removeA11y: 'Убрать: {name}, {formula}',
    tileA11y: '{name}, {formula}',
  },

  success: {
    label: 'Уравнено',
    round: 'Уравнено! `{equation}`',
    points: '+{points}',
    bonus: 'Бонус за простейший вид +{points}',
  },

  overlay: {
    levelUpBadge: 'Масса сохранена',
    levelUpTitle: 'Уровень пройден',
    levelUpSubtitle: 'Все атомы на месте',
    levelUpDescription: 'Уровень {level} добавляет: {changes}.',
    /** What each level adds, following the reaction levels in reactions.ts. */
    levelChanges: {
      level2:
        'реакции, где, уравняв один элемент, сбиваешь другой, и подсветка следующей строки пропадает',
      level3:
        'многоатомные ионы, первые скобки и реакции из четырёх веществ; наставник ждёт, пока его позовут, а кружки уступают место формулам',
      level4:
        'углеводороды побольше и реакции обмена из четырёх веществ; баланс атомов скрыт, пока его не откроешь',
    },
    victoryBadge: 'Все цели достигнуты',
    victoryTitle: 'Уравнения освоены',
    victorySubtitle: 'Все атомы на месте',
    victoryDescription: 'Попробуй уровень-испытание или открой лабораторный журнал.',
    challengeBadge: 'Испытание пройдено',
    challengeTitle: 'Уравнения собраны и уравнены',
    challengeSubtitle: 'От слов к формулам',
    challengeDescription:
      'Открой лабораторный журнал — там все уравнения этой партии.',
    pausedBadge: 'Опыт на паузе',
    pausedTitle: 'Пауза',
    pausedSubtitle: 'Время никто не считает.',
    pausedDescription: 'Коэффициенты остались ровно такими, какими были.',
  },

  notebook: {
    header: 'Твои уравнения',
    columnHint: 'Подсказка',
    columnPoints: 'Очки',
    noHint: 'без подсказок',
    hintTier: 'уровень {tier}',
    lowestTerms: 'простейший вид сразу',
    simplified: 'сокращено на {k}',
    challenge: 'собрано по описанию',
    empty: 'Уравнений пока нет.',
  },

  ledger: {
    title: 'Баланс атомов',
    left: 'Слева',
    right: 'Справа',
    statusA11y: 'Состояние',
    row: '{element}: слева {left}, справа {right}',
    balancedRow: 'поровну',
    // Invariant: the numeral is last and counts nothing after it.
    needsMoreLeft: 'слева не хватает: {count}',
    needsMoreRight: 'справа не хватает: {count}',
    allBalanced: 'Все строки совпали.',
    show: 'Показать баланс атомов',
    hide: 'Скрыть баланс атомов',
    showCost: 'Если открыть баланс на этом уровне, бонус за простейший вид пропадёт.',
    nextUp: 'эту строку уравнивай следующей',
  },
  beam: {
    label: 'Относительная масса: вход / выход',
    readout: 'Относительная масса: слева {left}, справа {right}.',
    level: 'Коромысло в равновесии.',
    tipsLeft: 'Коромысло клонится влево.',
    tipsRight: 'Коромысло клонится вправо.',
  },
  card: {
    coefficientA11y: 'Коэффициент: {name}, {formula}',
    increaseA11y: 'Добавить одну молекулу: {name}',
    decreaseA11y: 'Убрать одну молекулу: {name}',
    formulaTapA11y: '{name} — индексы менять нельзя',
    clustersA11y: {
      one: '{count} молекула — {name}',
      few: '{count} молекулы — {name}',
      many: '{count} молекул — {name}',
      other: '{count} молекулы — {name}',
    },
    reactants: 'Реагенты',
    products: 'Продукты',
  },

  /**
   * Tap-to-explain vocabulary. Russian inflects heavily, so these lists are
   * longer than the German ones: they carry the case forms the copy above
   * actually uses, verified by the "cover the running text" assertion in
   * game-messages.test.ts.
   */
  glossary: {
    coefficient: {
      term: 'коэффициент',
      definition: 'большое число перед формулой; оно умножает всю молекулу',
      matches: ['коэффициенты', 'коэффициент', 'коэффициента', 'коэффициентов', 'коэффициентам'],
    },
    subscript: {
      term: 'индекс',
      definition: 'маленькое число внутри формулы; оно говорит, сколько атомов в одной молекуле',
      matches: ['индексы', 'индекс', 'индекса', 'индексов'],
    },
    reactant: {
      term: 'реагент',
      definition: 'то, с чего начинается реакция (слева от стрелки)',
      matches: ['реагенты', 'реагент', 'реагента', 'реагентов', 'реагентах'],
    },
    product: {
      term: 'продукт',
      definition: 'то, что получается (справа от стрелки)',
      matches: ['продукты', 'продукт', 'продукта', 'продуктов', 'продуктах'],
    },
    conserved: {
      term: 'сохраняется',
      definition: 'остаётся прежней — атомы в реакции не появляются и не исчезают',
      matches: ['сохраняется', 'сохраняются', 'сохранилась', 'сохранения'],
    },
    stateSymbols: {
      term: '(s) (l) (g) (aq)',
      definition: 'твёрдое, жидкое, газ, растворено в воде',
      matches: ['обозначения состояния', 'обозначение состояния'],
    },
  },

  ui: {
    nextReaction: 'Следующая реакция',
    finishLevel: 'Завершить уровень',
    skipGuide: 'Я уже это умею',
    nextStep: 'Дальше',
    tryChallenge: 'Пройти испытание',
    openNotebook: 'Открыть журнал',
    closeNotebook: 'Назад',
    playAgain: 'Играть снова',
    supportMode: 'Режим поддержки',
    supportModeHelp:
      'Наставник и баланс атомов остаются открытыми на каждом уровне. Точность от этого не падает.',
    hintButtonA11y: 'Получить подсказку',
    dismissHintA11y: 'Скрыть подсказку',
    coachRegionA11y: 'Сообщения наставника',
    observation: 'Что можно увидеть',
    equationLabelA11y: 'Уравнение: {name}',
    liveChanged: '{name} — теперь {n}.',
    liveLocked: 'Уравнено. {equation}. Уравнение закреплено.',
    liveBuilt: 'Уравнение собрано. Теперь уравняй его.',
  },

  /**
   * The reaction-class badge above the equation, in the names a Russian
   * textbook prints. Sentence case here, uppercased by CSS.
   *
   * Two worth noting. «Соединение» is both "synthesis" and "a compound" in
   * Russian — one word genuinely does both jobs, and the badge is unambiguous
   * because it sits above an equation; flagged in ru-review.md. And Redox is
   * the one place Russian does *not* keep the international word: German,
   * Spanish and Italian all print "Redox", but *редокс* is laboratory jargon
   * in Russian where the school term is the full compound adjective. It is
   * thirty characters and it is the longest badge on the site.
   */
  reactionType: {
    Synthesis: 'Соединение',
    Decomposition: 'Разложение',
    'Single Replacement': 'Замещение',
    'Double Replacement': 'Обмен',
    Combustion: 'Горение',
    'Acid-Base': 'Кислотно-основная',
    Redox: 'Окислительно-восстановительная',
    Precipitation: 'Осаждение',
  },
} satisfies ReactionBalancerMessages;

export default ru;
