// src/i18n/dictionaries/ru.ts
//
// Russian (ru). The sixth locale and the first written in anything but the
// Latin alphabet. Register and terminology decisions, all of them argued in
// docs/i18n/glossary-ru.md:
//
//  - Address the reader with informal "ты" throughout. Less contentious than
//    French's *tu*: Russian school material mixes *ты* with impersonal
//    constructions, and *вы* is for exam rubrics and teachers. Flagged for the
//    owner anyway, because changing it touches every imperative in this file.
//  - **The reader is never the subject of a past tense.** A Russian past-tense
//    verb agrees with the speaker's gender, so «ты прошёл все уровни» is wrong
//    for half the readers — with no placeholder involved at all. Every such
//    string is an impersonal passive instead («все уровни пройдены»), which is
//    also the register a Russian game actually uses.
//  - **Nothing agrees with an interpolated name.** The chemistry-names overlay
//    stores nominatives only and a Russian sentence wants six cases, so a name
//    goes in a position that governs nothing — after a colon, after a dash, or
//    as the subject of a который-clause. README § Where a placeholder may sit
//    is the rule; glossary-ru.md § Case government is the Russian half of it.
//  - **Every count string here is invariant.** A Russian numeral governs the
//    case of the noun after it *and* selects one of three plural forms, so a
//    numeral is only safe with nothing counted after it: «Уровень {level} из
//    {max}», «Верно: {count}». See src/i18n/count-strings.test.ts.
//  - Chemical formulae, element symbols, state symbols and charges stay Latin,
//    which is what Russian chemistry does. Element and compound *names* are
//    Cyrillic, in src/i18n/chemistry-names/ru.ts.
//  - Russian typography: « … » with no inner spaces, — (em dash) with spaces,
//    … as one character, decimal comma, no-break space for thousands, and **ё
//    written out** rather than folded to е. src/test-utils/i18n-russian.ts
//    enforces all of it.
//  - "Base" is **основание**, never *база* — the one English–Russian false
//    friend in the core vocabulary, and the reason `chemistry.base` is a real
//    translation here where German, French, Spanish and Italian all had to
//    allowlist it as identical.
//  - Russian runs roughly 10–20% longer than English and Cyrillic sets wider at
//    the same point size. Where a string sits in a fixed-width control (header
//    badges, nav buttons, category pills) the translation is deliberately
//    shorter than a faithful rendering would be; those entries are flagged in
//    docs/i18n/ru-review.md.

import type { Dictionary } from './en';

export const ru = {
  meta: {
    siteName: 'ChemGames',
    title: 'ChemGames | Химия в интерактивных играх',
    description:
      'Разбирайся в химии играя: наглядные мини-игры, тренажёры и шпаргалки по каждой теме.',
    // Keyword lists are chosen per language, not translated. The age band is
    // the thing to get right: this site is Year 9–10, which is 8–9 класс in the
    // Russian system. A bare «химия в школе» would repeat the mistake Phase 1
    // had to correct in German («Chemie Oberstufe» names ages 16–19).
    // Rated low: these are plausible Russian search terms, not researched ones.
    keywords: [
      'химия',
      'химия 8 класс',
      'химия 9 класс',
      'обучающие игры',
      'молекулы',
      'химические реакции',
      'шпаргалки по химии',
    ],
    privacyTitle: 'Конфиденциальность | ChemGames',
    privacyDescription:
      'Что ChemGames хранит о тебе, что видят другие, кто обрабатывает данные и как их скачать или удалить.',
    // The one page on the site written for an adult, so this description and
    // the copy it summarises use «вы» rather than the site-wide «ты» — the
    // argument is at the top of src/i18n/teachers/ru.ts.
    teachersTitle: 'Учителям | ChemGames',
    teachersDescription:
      'Что такое ChemGames, на каких шести языках он выходит, как он обращается с данными учеников, на каком уровне доступность и как учителя могут помочь развивать его во время беты.',
    cheatSheetTitle: 'Шпаргалка: {title} | ChemGames',
    cheatSheetNotFound: 'Тема не найдена — ChemGames',
  },

  common: {
    backToDashboard: 'Вернуться на главную',
    dashboard: 'Главная',
    playNow: 'Играть',
    cancel: 'Отмена',
    opensInNewTab: '(откроется в новой вкладке)',
    loading: 'Загрузка…',
  },

  language: {
    label: 'Язык',
  },

  nav: {
    sectionsA11y: 'Разделы сайта',
    profile: 'Профиль',
    leaderboards: 'Таблица лидеров',
    games: 'Игры',
    cheatSheets: 'Шпаргалки',
    // Imperative, like the other nav labels, and short: this sits in the
    // horizontal row, where Cyrillic sets wider at the same point size.
    explore: 'Открывай',
    login: 'Войти / Зарегистрироваться',
    logout: 'Выйти',
    // First person plural: Russian's own way of avoiding a past tense that
    // would have to agree with the reader's gender.
    loggingOut: 'Выходим…',
    settingsA11y: 'Открыть общие настройки',
    menuOpenA11y: 'Открыть меню',
    menuCloseA11y: 'Закрыть меню',
    menuTitleA11y: 'Меню сайта',
  },

  footer: {
    tagline: 'ChemGames — химия наглядно, с интересом и без зубрёжки.',
    copyright: '© {year} ChemGames. Все права защищены.',
    privacy: 'Конфиденциальность',
    teachers: 'Учителям',
  },

  home: {
    eyebrow: 'Интерактивная химическая лаборатория',
    heading: 'Учи химию в игре.',
    intro:
      'Ставь опыты, следи за личными рекордами, запоминай формулы и сравнивай свои результаты с чужими.',
    exploreGames: 'Выбрать игру',
    viewLeaderboards: 'Смотреть таблицу лидеров',
    profileHeading: 'Профиль',
    profileDescription: 'Твоё лабораторное имя и личный прогресс в опытах.',
    profileLinkAuthenticated: 'Открыть профиль',
    profileLinkAnonymous: 'Войти, чтобы сохранять прогресс',
    leaderboardsHeading: 'Таблица лидеров',
    leaderboardsDescription: 'Лучшие исследователи во всех химических опытах.',
    leaderboardsLink: 'Открыть полную таблицу',
    gamesHeading: 'Интерактивные мини-игры',
    gamesDescription: 'Выбери опыт и разберись в реакциях и формулах.',
    gamesLink: 'Все игры',
    // The section heading and description reuse explore.heading and
    // explore.intro, so only these two strings are new.
    exploreLink: 'Открыть раздел',
    exploreDetail:
      'Каждый понедельник — новое вещество и новый химик, и от каждого есть дорожка к самой химии.',
    emptyProfileAuthenticatedTitle: 'Профиль ещё настраивается',
    emptyProfileAuthenticatedBody:
      'Профиль появится, как только пройдёт перенос базы данных.',
    emptyProfileAnonymousTitle: 'Здесь начинается твой профиль',
    emptyProfileAnonymousBody:
      'Войди, чтобы сохранять прогресс, вести лабораторные записи и собрать профиль исследователя.',
    emptyProfileCta: 'Войти / Зарегистрироваться',
    teaserAcidDetail: 'Разбери вещества и уровни pH',
    teaserBlasterDetail: 'Лопай соединения и собирай ионы',
    teaserNeutraliseDetail: 'Защити лабораторию от бурных реакций',
  },

  gamesHub: {
    heading: 'Игры',
    intro: 'Выбери опыт, с которого начнёшь.',
    playNow: 'Играть →',

    // Every title below is rated low in ru-review.md: these are product-naming
    // calls for the owner, not translation calls. The rejected candidates stay
    // here so the reasoning travels with the code — see the "Game titles" table
    // in docs/i18n/glossary-ru.md for the full version.

    // acidTitle candidates:
    //   'Кислота или щёлочь?'  — shorter, but щёлочь is a *soluble* base, and the
    //                            game also sorts ammonia and solid hydroxides
    //   'Определи вещество'    — reads as a worksheet instruction
    acidTitle: 'Кислота или основание?', // chosen: the question the game asks
    acidDescription: 'Определяй вещества по их свойствам.',

    // blasterTitle candidates:
    //   'Формула-бластер'    — calque; «бластер» is a sci-fi loan that reads as
    //                          English filler and says nothing about chemistry
    //   'Лопни формулу'      — truer to the popping mechanic, but the hub would
    //                          then carry two imperative titles
    //   'Формулы на мушке'   — vivid, and too long for the card
    blasterTitle: 'Охота на формулы', // chosen: an ordinary Russian noun phrase
    // for a game (охота на …), and it says what you do — find the target and
    // pop it — without a single English word
    blasterDescription: 'Лопай нужные соединения, пока они не улетели.',

    // neutraliseTitle candidates:
    //   'Нейтрализация'   — a textbook chapter heading
    //   'Ионная оборона'  — reads more like a product, but drops the word the
    //                       game teaches
    neutraliseTitle: 'Нейтрализуй!', // chosen: mirrors the English's deliberate
    // imperative. GAMES.md's warning applies — check it reads as a name, not an order
    neutraliseDescription: 'Защити лабораторию от молекул-захватчиков.',

    // balancerTitle candidates:
    //   'Балансировщик реакций' — a «балансировщик» in Russian is a machine or a
    //                             job (wheel balancer, load balancer): exactly the
    //                             GAMES.md trap, and the one Italian hit too
    //   'Уравняй реакцию'       — good, but a second imperative in the hub
    //   'Баланс атомов'         — already the glossary's name for the ledger table
    //                             inside this game, so the title would name a
    //                             component of itself
    balancerTitle: 'Весы реакций', // chosen: names the beam the game shows, two
    // short words, and a student can guess the chemistry from it
    balancerDescription: 'Сделай так, чтобы атомов с двух сторон стрелки было поровну.',

    // lewisTitle candidates:
    //   'Поделись, чтобы заполнить' — calque; the purpose clause is heavy in
    //                                 Russian and does not fit the card
    //   'Пара к паре'               — memorable, loses the "fill" half of the rule
    //   'Общая пара'                — names the mechanic, reads as a glossary entry
    lewisTitle: 'Делись и заполняй', // chosen: names the rule in Russian as two
    // short imperatives, instantly readable at 14
    lewisDescription: 'Соединяй неспаренные электроны в пары — получится молекула.',

    // bondsTitle candidates:
    //   'Связи'       — ambiguous: connections, contacts
    //   'Мир связей'  — marketing
    bondsTitle: 'Химические связи', // chosen: a topic name, so the direct
    // translation is the right answer here
    bondsDescription: 'Изучай строение молекул и связи между атомами.',
  },

  auth: {
    backToGames: '← К играм',
    loginTitle: 'С возвращением',
    loginSubtitle: 'Продолжай с того места, где остановились опыты.',
    registerTitle: 'Присоединяйся к ChemGames',
    registerSubtitle: 'Заведи аккаунт, чтобы сохранять прогресс.',
    continueWithGoogle: 'Войти через Google',
    or: 'или',
    email: 'Почта',
    emailPlaceholder: 'ты@пример.рф',
    password: 'Пароль',
    passwordPlaceholder: 'Не меньше 6 символов',
    loginAction: 'Войти',
    registerAction: 'Создать аккаунт',
    switchToRegisterPrompt: 'Впервые на ChemGames?',
    switchToRegisterAction: 'Зарегистрироваться',
    switchToLoginPrompt: 'Уже есть аккаунт?',
    switchToLoginAction: 'Войти',
    checkInbox: 'Загляни в почту, чтобы активировать аккаунт ChemGames.',
    unconfiguredClient: 'Вход сейчас не настроен.',
    unconfiguredNotice:
      'Для входа нужны ключи Supabase. Скопируй .env.example в .env.local и заполни значения.',
    errorVerification: 'Не получилось проверить эту ссылку. Попробуй ещё раз.',
    errorConfiguration: 'Вход пока не настроен.',
  },

  profile: {
    heading: 'Карточка исследователя',
    subheading: 'Лабораторное имя и открытые достижения',
    edit: 'Изменить профиль',
    missingTitle: 'Лабораторный профиль не найден',
    missingBody:
      'Не получилось загрузить твою карточку. Войди ещё раз или настрой профиль заново.',
    missingAction: 'Вернуться ко входу',
    editMissingTitle: 'Лабораторная запись не найдена',
    editMissingBody: 'Не получилось открыть настройки профиля. Попробуй войти ещё раз.',
    defaultTitle: 'Исследователь',
    labMember: 'Сотрудник лаборатории',
    labNotes: 'Лабораторные заметки',
    labNotesEmpty: 'Этот исследователь пока молча наблюдает за реакциями.',
    favouriteCompound: 'Любимое соединение',
    achievements: 'Достижения',
    statExperiments: 'Опыты',
    statLevel: 'Уровень',
    statStreak: 'Дней подряд',
    statAccuracy: 'Точность',

    editHeading: 'Настройка оборудования',
    editIntro: 'Настрой лабораторию под себя и реши, что видно другим.',
    identityHeading: 'Имя исследователя',
    alias: 'Псевдоним',
    aliasPlaceholder: 'например, Любопытный Аргон 4821',
    aliasHelp:
      'Виден всем в таблице лидеров. Выбери прозвище, а не настоящее имя или адрес почты.',
    customTitle: 'Своё звание',
    customTitlePlaceholder: 'например, Химик-исследователь',
    country: 'Страна / регион',
    countryPlaceholder: 'например, Австралия',
    academicLevel: 'Класс',
    academicLevelPlaceholder: 'Выбери свой класс…',
    labNotesField: 'Лабораторные заметки (о себе)',
    visibilityHeading: 'Что видно в статистике',
    save: 'Сохранить',
    saving: 'Сохраняем…',

    dataHeading: 'Твои данные',
    dataIntro: 'Скачай копию того, что ChemGames хранит о тебе, или удали аккаунт.',
    exportHeading: 'Скачать мои данные',
    exportBody: 'Файл JSON с данными аккаунта, профилем, сыгранными партиями и прогрессом.',
    exportAction: 'Скачать мои данные',
    deleteHeading: 'Удалить аккаунт',
    deleteBody:
      'Аккаунт, профиль, очки, прогресс и записи в таблице лидеров будут удалены сразу и навсегда. Отменить это нельзя.',
    deleteConfirmLabel: 'Для подтверждения введи {word}',
    deleteAction: 'Удалить мой аккаунт',
    deletePending: 'Удаляем…',
  },

  profileToggles: {
    showCountry: 'Показывать страну в профиле',
    showYearLevel: 'Показывать класс',
    showLabNotes: 'Показывать лабораторные заметки',
    showTotalSyntheses: 'Показывать число синтезов',
    showAccuracy: 'Показывать точность ответов в процентах',
    showCurrentStreak: 'Показывать серию дней подряд',
  },

  serverMessages: {
    profileUnconfigured: 'Подключение к базе данных сейчас не настроено.',
    profileLoginRequired: 'Войди, прежде чем менять настройки.',
    profileSaveFailed: 'Не получилось сохранить настройки лаборатории. Попробуй ещё раз.',
    profileSaved: 'Настройки оборудования сохранены.',
    profileUnexpected: 'При сохранении что-то пошло не так.',
    // Invariant: the two numerals sit inside a «от … до …» phrase and nothing
    // is counted after them. The natural «от {min} до {max} символов» is wrong
    // at 21 (*до 21 символа*), which is the whole reason this shape exists.
    aliasLength: 'Длина псевдонима в символах: от {min} до {max}.',
    aliasAtSign:
      'В псевдониме не должно быть знака @. Выбери прозвище, а не адрес почты.',
    yearLevelInvalid: 'Выбери класс из списка.',

    deleteConfirmRequired: 'Чтобы подтвердить удаление аккаунта, введи {word}.',
    deleteUnavailable: 'Удалить аккаунт сейчас нельзя. Попробуй позже.',
    deleteLoginRequired: 'Войди ещё раз, прежде чем удалять аккаунт.',
    deleteFailed: 'Не получилось удалить аккаунт. Попробуй позже.',

    exportUnavailable: 'Выгрузка данных сейчас недоступна.',
    exportLoginRequired: 'Чтобы скачать свои данные, нужно войти.',
    exportFailed: 'Не получилось собрать выгрузку. Попробуй позже.',

    feedbackCategoryAndMessage: 'Выбери тему и напиши сообщение.',
    feedbackCategoryInvalid: 'Выбери тему из списка.',
    feedbackMessageRequired: 'Напиши сообщение.',
    // Invariant for the same reason as aliasLength: nothing is counted after
    // the numeral.
    feedbackMessageTooLong: 'Сообщение слишком длинное. Максимум символов: {max}.',
    feedbackRateLimited: 'Слишком много сообщений подряд, попробуй позже.',
    feedbackUnconfigured: 'Приём отзывов в этой среде не настроен.',
    feedbackStoreFailed: 'Не получилось сохранить отзыв. Попробуй позже.',
    feedbackEmailFailed: 'Не получилось отправить отзыв. Попробуй позже.',
    feedbackUnexpected: 'При обработке отзыва что-то пошло не так.',
  },

  privacy: {
    heading: 'Конфиденциальность',
    intro: 'Что ChemGames хранит о тебе, кто это видит и как скачать или удалить данные.',
    // No full stop: `Intl` renders a long Russian date as «14 сентября 2026 г.»
    // — the «г.» abbreviation already ends the sentence, and adding one gave
    // «…2026 г..» on the rendered page. The other five locales need theirs.
    effectiveDate: 'Действует с {date}',

    whoWeAreHeading: 'Кто мы',
    whoWeAreBody:
      'ChemGames ведёт Stella Slad — она и отвечает за данные, описанные на этой странице. Написать можно на {email}.',

    collectHeading: 'Что мы собираем',
    collectAccountLabel: 'Аккаунт.',
    collectAccountBody:
      'Адрес почты и хеш пароля, которые хранит Supabase Auth. Если ты входишь через Google, вместо пароля мы получаем имя аккаунта Google, адрес почты и ссылку на аватар.',
    collectProfileLabel: 'Профиль.',
    collectProfileBody:
      'Псевдоним и необязательные поля, которые ты можешь заполнить: звание, страна, класс, лабораторные заметки, любимые элемент и соединение и полученные значки. Ещё мы храним переключатели видимости — они решают, что видят другие. Псевдоним придумывается автоматически и не содержит настоящего имени. Поменять его можно здесь: {link}.',
    collectGameplayLabel: 'Игра.',
    collectGameplayBody:
      'После каждой партии мы записываем, какая это была игра, сколько набрано очков, до какого уровня дошла партия, чем всё кончилось, сколько она длилась и когда. Из этого мы храним лучший результат и уровень по каждой игре, а также производную статистику профиля — серию дней и точность.',
    collectFeedbackLabel: 'Отзыв.',
    collectFeedbackBody:
      'Когда ты пользуешься кнопкой отзыва, мы сохраняем тему, текст и страницу, с которой он отправлен. Ещё мы сохраняем идентификатор аккаунта, если ты в аккаунте, и необратимый хеш — только для защиты от злоупотреблений.',

    publicHeading: 'Что видно всем',
    publicBody1:
      'Псевдоним и лучший результат по каждой игре попадают в открытую таблицу лидеров, которую видит любой.',
    publicBody2:
      'Остальные поля профиля — страна, класс, лабораторные заметки и статистика — показываются только там, где включён соответствующий переключатель: {link}. Все переключатели, кроме даты регистрации, по умолчанию выключены. Звание, любимые элемент и соединение и значки показываются рядом с псевдонимом всегда.',

    cookiesHeading: 'Куки и локальное хранилище',
    cookiesBody1:
      'При входе Supabase ставит куки сессии. Без них вход не сохранится, поэтому они строго необходимы.',
    cookiesBody2:
      'Ещё мы сохраняем в куки одну настройку — выбранный язык, чтобы в следующий раз сайт открылся на нём. Там нет ничего, кроме кода языка.',
    cookiesBody3:
      'В локальном хранилище браузера лежат настройки звука, темы и отметка о том, что инструкция уже показана. Эти данные остаются на твоём устройстве и нам не передаются.',
    cookiesBody4: 'Мы не используем аналитику, рекламу и сторонние трекеры.',

    processorsHeading: 'Кто обрабатывает данные',
    processorSupabaseLabel: 'Supabase',
    processorSupabaseBody: 'хранит базу данных и отвечает за вход.',
    processorResendLabel: 'Resend',
    processorResendBody: 'доставляет нам письма с отзывами.',
    processorGoogleLabel: 'Google',
    processorGoogleBody: 'только если ты входишь через Google.',
    processorHosting: 'Хостинг-провайдер, который отдаёт сайт.',
    processorsTransport: 'Данные передаются по HTTPS.',

    retentionHeading: 'Сколько мы это храним',
    retentionBody1: 'Мы храним данные, пока существует аккаунт.',
    retentionBody2:
      'Когда ты удаляешь аккаунт, профиль, партии, прогресс и записи в таблице лидеров удаляются сразу. Отправленные отзывы остаются, но обезличиваются: ссылка на аккаунт из них убирается.',

    choicesHeading: 'Что ты можешь сделать',
    choicesEdit: 'Изменить профиль и переключатели видимости: {link}.',
    choicesDownload: 'Скачать копию своих данных на той же странице.',
    choicesDelete: 'Удалить аккаунт на той же странице.',
    choicesEmail: 'Или напиши нам на {email}, и мы поможем.',

    childrenHeading: 'Дети и школьники',
    childrenBody1:
      'ChemGames сделан для школьников, поэтому мы собираем только то, без чего игры и таблица лидеров не работают.',
    childrenBody2:
      'Настоящее имя не нужно. Псевдоним придумывается автоматически, не содержит настоящего имени, и его можно поменять здесь: {link}.',
    childrenBody3:
      'Родители, опекуны и учителя могут написать нам на {email} и попросить удалить аккаунт школьника вместе с данными.',

    legalHeading: 'Правовая основа',
    legalBody1:
      'Мы обращаемся с персональными данными в соответствии с австралийским Privacy Act 1988 и Australian Privacy Principles.',
    legalBody2:
      'Если у тебя есть жалоба, сначала напиши нам. Если наш ответ не устроит, жалобу можно подать в Office of the Australian Information Commissioner: {link}.',

    changesHeading: 'Изменения этой страницы',
    changesBody:
      'Если что-то поменяется в том, как мы работаем с данными, мы обновим эту страницу и дату наверху.',
  },

  cheatSheetCategories: {
    Fundamentals: 'Основы',
    Reactions: 'Реакции',
    'Acids & Bases': 'Кислоты и основания',
    Equations: 'Уравнения',
    Thermodynamics: 'Термодинамика',
    Organic: 'Органика',
    Bonding: 'Химическая связь',
    Nomenclature: 'Номенклатура',
    Stoichiometry: 'Стехиометрия',
  },

  yearLevels: {
    all: 'Все',
    'Year 7': '7 класс',
    'Year 8': '8 класс',
    'Year 9': '9 класс',
    'Year 10': '10 класс',
    Senior: 'Старшие классы',
  },

  leaderboards: {
    heading: 'Таблица лидеров',
    intro: 'Сравни лучшие результаты по всем опытам.',
    topScientists: 'Лучшие исследователи',
    globalNetwork: 'Мировая сеть',
    emptyTitle: 'Пьедестал пока пуст.',
    emptyBody: 'Сыграй первый раунд и займи верхнюю строчку.',
    rank: 'Место',
    rankA11y: 'Место',
    points: 'Очки',
    recorded: 'Записано {date}',
    myResults: 'Мои результаты',
    highScore: 'Рекорд',
    unranked: 'Вне таблицы',
    firstResultTitle: 'Первый результат ещё впереди',
    firstResultBody: 'Сыграй раунд и поставь рекорд.',
    noData: 'Здесь ещё ничего не синтезировали. Будь первым!',
  },

  feedback: {
    openA11y: 'Открыть меню отзыва',
    trigger: 'Отзыв',
    heading: 'Отзыв о ChemGames',
    closeA11y: 'Закрыть отзыв',
    sentTitle: 'Отзыв отправлен!',
    sentBody: 'Спасибо, что помогаешь сделать ChemGames лучше.',
    categoryBug: 'Ошибка',
    categoryChemistry: 'Данные',
    categoryFeature: 'Идея',
    placeholderBug: 'Что пошло не так на этой странице?',
    placeholderChemistry: 'Видишь неверную валентность или формулу?',
    placeholderFeature: 'Чего этой игре не хватает?',
    submit: 'Отправить отзыв',
    submitting: 'Отправляем…',
    genericError: 'Не получилось отправить отзыв.',
  },

  settings: {
    gameTitle: 'Настройки игры',
    globalTitle: 'Настройки',
    closeA11y: 'Закрыть настройки',
    support: 'Поддержка',
    appearance: 'Оформление',
    thisGame: 'Эта игра',
    allGamesDefault: 'По умолчанию для всех игр',
    allGames: 'Все игры',
    useGlobal: 'Как везде',
    dark: 'Тёмное',
    light: 'Светлое',
    overrideHelp:
      'Настройка для отдельной игры важнее общей. Выбери «Как везде», чтобы снова следовать общей.',
    audio: 'Звук',
    soundEffects: 'Звуковые эффекты',
    volumeA11y: 'Громкость',
    account: 'Аккаунт',
  },

  explore: {
    heading: 'Открывай',
    intro: 'Одно вещество и один химик — каждый понедельник новые.',
    /*
     * {date} is formatted by Intl and dropped in after a dash, so it governs
     * nothing: «Неделя с 14 сентября 2026 г.» would need the genitive, and
     * Intl hands back a nominative-shaped string. The dash sidesteps the case
     * problem entirely — README § Where a placeholder may sit.
     */
    dateline: 'Неделя — {date}',
    moleculeHeading: 'Вещество недели',
    scientistHeading: 'Химик недели',
    formulaLabel: 'Формула',
    // Both placeholders sit after a comma, governing nothing. The formula
    // itself stays Latin, as Russian chemistry writes it.
    formulaA11y: '{name}, формула {formula}',
    everydayHeading: 'Где ты с ним встречаешься',
    chemistryHeading: 'Почему это работает',
    workHeading: 'Что он сделал',
    legacyHeading: 'Почему это важно',
    /*
     * «Что он сделал» is the one heading here that has to agree with a person,
     * and Russian gives no genderless third-person past. An impersonal
     * rewrite is the fix the rest of this file uses, and the Italian bug this
     * section already hit — a participle that read «why **he** was important»
     * on every woman's card — is exactly why it matters. `workHeading` is
     * therefore flagged low in docs/i18n/ru-review.md as the one string a
     * native speaker must settle before Russian ships: «Чем он занимался» has
     * the same problem, and «Вклад» loses the voice.
     */
    creditHeading: 'Кому на самом деле принадлежит заслуга',
    // {target} is the name of a cheat sheet or a game, after a colon.
    moleculeCta: 'Потренируйся: {target}',
    scientistCta: 'Химия за этим: {target}',
    sourcesHeading: 'Источники',
    sourcesNote: 'Ссылки проверены — {date}.',
  },

  cheatSheets: {
    heading: 'Лабораторные шпаргалки',
    intro:
      'Формулы, правила реакций и разбор уравнений — коротко и по классам.',
    backToList: 'Ко всем шпаргалкам',
    // Four forms, because Russian needs all four: one (1, 21, 101…), few (2–4),
    // many (0, 5–20…) and other, which only a fraction reaches and which is
    // therefore worded like `few`.
    //
    // `one` was briefly «одна тема», on the argument that the grid never shows
    // 21 topics so the numeral is always literally one. The placeholder gate
    // refused it — a translation may not drop a placeholder the English has —
    // and the gate is right: «{count} тема» is correct at 1, at 21 and at 101,
    // and the prettier wording would have been wrong the day a thirteenth
    // sheet was added.
    count: {
      one: '{count} тема',
      few: '{count} темы',
      many: '{count} тем',
      other: '{count} темы',
    },
    exampleFormula: 'Пример формулы',
    exampleLabel: '{name}:',
    readReference: 'Открыть справку',
    practiseThis: 'Потренироваться',
    keyConcepts: 'Главное',
    exampleFormulas: 'Примеры формул и реакций',
    lookupTables: 'Таблицы',
    goingDeeper: 'Копнуть глубже',
    watchOutFor: 'Осторожно',
    learnMore: 'Узнать больше',
    forStudents: 'Для школьников',
    forTeachers: 'Для учителей',
    curriculum: 'Программа: ',
    filterA11y: 'Отобрать темы по классу',
  },

  chemistry: {
    acid: 'Кислота',
    // Never «база»: in Russian that is a base of operations or a database.
    // The one false friend in the core vocabulary, and the reason this key is
    // a real translation here where all four Latin locales allowlist it.
    base: 'Основание',
    neutral: 'Нейтральное',
    amphoteric: 'Амфотерное',
    basicAlkaline: 'Основное / щелочное',
  },

  games: {
    shared: {
      progress: 'Прогресс',
      level: 'Уровень',
      score: 'Счёт',
      // Invariant: the numeral follows the noun, so it governs nothing.
      // «Уровень 1», «Уровень 2», «Уровень 25» are all correct Russian.
      levelValue: 'Уровень {level}',
      scoreValue: 'Счёт {score}',
      lives: 'ЖИЗНИ: {lives}/{max}',
      exit: 'Выход',
      exitA11y: 'Выйти из игры',
      hintA11y: 'Получить подсказку',
      howToPlay: 'Как играть',
      closeInstructionsA11y: 'Закрыть правила',
      settings: 'Настройки',
      pause: 'Пауза',
      resume: 'Продолжить',
      gotIt: 'ПОНЯТНО',
      hint: 'Подсказка',
      find: 'Найди:',
      reactionError: 'Ошибка реакции',
      labHint: 'Лабораторная подсказка',
      dismissFeedbackA11y: 'Скрыть сообщение',
      dismissHintA11y: 'Скрыть подсказку',
      finalScore: 'Итоговый счёт:',
      finalScoreA11y: 'Итоговый счёт: {score}',
      levelProgressA11y: 'Прогресс: уровень {level} из {max}',
      keyboardAndMouse: 'Клавиатура и мышь',
      touchscreen: 'Сенсорный экран',
    },

    overlay: {
      pausedBadge: 'Опыт на паузе',
      pausedTitle: 'Пауза',
      pausedSubtitle: 'Небольшой перерыв в лаборатории.',
      pausedDescription: 'Опыт замер ровно там, где был.',
      failedBadge: 'Опыт закончен',
      failedTitle: 'Игра окончена',
      failedSubtitle: 'Реакция не пошла!',
      failedDescription: 'Повтори формулы и попробуй ещё раз.',
      victoryBadge: 'Все цели достигнуты',
      victoryTitle: 'Исследование завершено',
      victorySubtitle: 'Лаборатория покорена!',
      // Impersonal passive rather than «ты прошёл»: a Russian past tense
      // agrees with the reader's gender.
      victoryDescription: 'Отличная работа! Все уровни пройдены.',
      levelUpBadge: 'Цель закрыта',
      levelUpTitle: 'Уровень пройден',
      levelUpSubtitle: 'Партия готова!',
      levelUpDescription: 'Пойдём на уровень посложнее?',
      timeoutDescription: 'Время вышло раньше, чем набралась норма.',
      statLevel: 'Уровень',
      statScore: 'Счёт',
      statRound: 'Раунд',
      // Invariant. The natural «{count} верных» is wrong at 1 (*верный*) and
      // wrong at 2 (*верных ответа*); the colon label agrees with nothing.
      statRoundValue: 'Верно: {count}',
      levelOfMax: 'Уровень {level} из {max} • верных ответов: {correct}',
      levelUpProgress: 'Уровень {level} → {next} • разобрано: {correct}',
      resume: 'Продолжить',
      beginLevel: 'Начать уровень {level}',
      tryAgain: 'Ещё раз',
      quitToHub: 'Выйти к играм',
      keyHintResume: 'Нажми Escape, пробел или Enter, чтобы продолжить',
      keyHintRetry: 'Нажми пробел или Enter, чтобы попробовать снова',
    },

    acidClassification: {
      subtitle: 'ОПРЕДЕЛИ ВЕЩЕСТВО',
      task: 'Кислота, основание или нейтральное?',
      progress: 'Разобрано: {correct} / {quota}',
      arenaHeading: 'Определи соединение',
      registryError: 'Ошибка: справочник соединений не найден.',
      instructionsTitle: 'Как играть: Кислота или основание?',
      instructionsSubtitle: 'Посмотри на формулу и определи свойства вещества.',
      stepIdentifyLabel: 'Посмотри:',
      stepIdentifyText: 'В пузырьке по центру показано соединение.',
      stepClassifyLabel: 'Определи:',
      stepClassifyText:
        'Выбери, что это: кислота, основание, нейтральное или амфотерное вещество.',
      stepHintLabel: 'Нужна подсказка?',
      stepHintText: 'Нажми на лампочку наверху, и появится название вещества.',
      stepCarefulLabel: 'Осторожно:',
      stepCarefulText: 'Три ошибки — и стакан разбит!',
    },

    formulaBlaster: {
      subtitle: 'НУЖНАЯ МОЛЕКУЛА',
      progress: 'Цель {phase}/3 • попаданий: {hits}/{quota}',
      hintHeading: 'Подсказка по молекуле',
      instructionsTitle: 'Как играть: Охота на формулы',
      instructionsIntro:
        'Находи и лопай пузырьки с молекулой, которая указана наверху.',
      instructionsBullet1: 'Нажми на верную формулу — попадание засчитано.',
      instructionsBullet2:
        'Нажми на лампочку наверху, если нужна подсказка про состав молекулы.',
      instructionsBullet3:
        'Если лопнешь не ту молекулу, игра подскажет, какой элемент искать.',
      /** Feedback templates. {compound}/{element} are localized names; {formula}/{symbol} never are. */
      hintTemplate: 'Состав вещества {compound}: {elements}.',
      wrongPick: 'Это {compound} ({formula}).',
      wrongPickLookFor:
        'Это {compound} ({formula}). Ищи атомы другого элемента: {element} ({symbol}).',
      wrongPickCheckCounts: 'Это {compound} ({formula}). Проверь число атомов: {target}.',
    },

    neutralise: {
      subtitleFull: 'ЗАДАЧА: гасить кислоты ионом OH⁻, а основания — ионом H⁺',
      subtitleShort: 'НЕЙТРАЛИЗУЙ',
      progressFull: 'Волна {wave}/3 | обезврежено: {cleared}/{total}',
      progressShort: 'Волна {wave}/3',
      fire: 'Огонь',
      fireA11y: 'Выстрел',
      switchIonA11yAcid: 'Сменить ион, сейчас H+ (кислота)',
      switchIonA11yBase: 'Сменить ион, сейчас OH- (основание)',
      instructionsTitle: 'Как играть: Нейтрализуй!',
      instructionsIntro: 'Защити лабораторию от химической угрозы!',
      keyOneLabel: '1',
      keyOneText: 'Зарядить {ion}, чтобы гасить основания.',
      keyOneIon: 'H⁺ (кислота)',
      keyTwoLabel: '2',
      keyTwoText: 'Зарядить {ion}, чтобы гасить кислоты.',
      keyTwoIon: 'OH⁻ (основание)',
      keySpaceLabel: 'Пробел',
      keySpaceText: 'Выстрел из ионной пушки! (Или нажми на поле.)',
      keyArrowsLabel: '←/→',
      keyArrowsText: 'Двигать пушку (или просто веди мышью).',
      touchDragLabel: 'Веди',
      touchDragText: 'Проведи пальцем по полю, чтобы навести пушку.',
      touchFireLabel: 'Огонь',
      touchFireText: 'Нажми кнопку {button} под полем.',
      touchSwitchLabel: 'Смена',
      touchSwitchText: 'Нажми на кнопку иона, чтобы переключиться между H⁺ и OH⁻.',
    },
  },
} satisfies Dictionary;

export default ru;
