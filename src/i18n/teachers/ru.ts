// src/i18n/teachers/ru.ts
//
// Russian (ru) copy for the For Teachers page.
//
// This is a per-page catalogue, not part of the shared dictionary, because
// src/app/[lang]/layout.tsx hands the whole dictionary to I18nProvider and so
// serializes every byte of it into the RSC payload of every page. This page is
// the copy's only reader and it is a Server Component, so none of it needs to
// travel anywhere else — see docs/i18n/README.md § "The dictionary is a budget,
// and a game will eat it", which is the same reasoning that moved the game
// catalogues out.
//
// Страница «Учителям».
//
// **Address: formal «вы», and only here.** docs/i18n/glossary-ru.md fixes
// informal **ты** for the whole site — "Decided by the owner on 2026-09-19; no
// longer provisional" — and its stated reason is the 14–16 audience: the
// English says "Stuck? Press the lightbulb", and *вы* turns that into an
// invigilator. This page has no teenage reader. It is written for the adult
// deciding whether to put the site in front of a class, and *ты* to a teacher
// is not friendly in Russian, it is rude. So this namespace departs, exactly
// as German, French, Spanish and Italian do (Sie / vous / usted / Lei), and
// the departure is confined to this file — nothing in the Russian dictionary
// changes. **If you are "correcting" this back to ты, read the register table
// in glossary-ru.md first: the ты rule is scoped to copy a student reads.**
// Every imperative here is therefore second-person plural: пройдите, нажмите,
// выберите, напишите, начните, считайте.
//
// **Lower-case «вы», not «Вы».** The capital is the deferential form used when
// writing to one named person — a letter, a contract. This page addresses
// teachers as a class, on a public web page, where lower case is the modern
// standard and the capital reads as either a mail-merge or an antique.
// Flagged for a native reviewer: it is the second register call on the page.
//
// **The money paragraph is a request, not a pitch.** «Пожертвование» and
// «донат» are both avoided: the first belongs to charities and almsgiving and
// this is one person's project with no legal status behind it, the second is
// gaming slang. What is left is «поддержать» and «любая посильная сумма»,
// which is how a Russian-speaking adult asks an equal for help without
// performing need. The sentence about tax is kept flat for the same reason.
//
// **First person needs the same gender care the reader does.** The glossary's
// rule is about the *reader* — a Russian past tense agrees with its subject,
// so «ты насчитал» is wrong for half the readers. This page is the one place
// the **author** speaks in the first person, and the site's owner is a woman,
// so «я бы не смог» would be wrong in the other direction. Every such sentence
// here is present tense, future tense or impersonal; `collaborateRecords` ends
// «выполнить невозможно» for exactly this reason.
//
// Terms, per docs/i18n/glossary-ru.md: шпаргалка (cheat sheet), подсказка
// (hint), наставник (the in-game coach panel), счёт / очки, таблица лидеров,
// псевдоним, уровень, аккаунт, отзыв; **неспаренный электрон** and
// **неподелённая пара**, the formal terms — correct here because this page
// explains rather than instructs, and since 2026-09-19 they are the *only*
// names the site gives those ideas anyway (the game word «одиночка» and the
// dot label «соло» were both abolished; do not reintroduce either).
// **основание**, never «база», for a base. The year band is **8–9 класс**,
// which is what the site's Year 9–10 is in the Russian system; **never
// «старшие классы»**, which names 10–11 класс, ages 16–18 — the same mistake
// German shipped once as "Oberstufe" and had to correct. `teachers.test.ts`
// gates it.
//
// **Not in `RUSSIAN_SOURCES` in cyrillic.test.ts, deliberately.** That gate
// covers the three catalogues that ship to a reader's *browser*; this one is
// server-only, like the cheat-sheet and chemistry-name overlays it sits
// beside. Adding it would also mean exempting «WCAG 2.2», «1.0» and «2.0»
// from the decimal-comma check, which would weaken a gate that currently
// earns its keep. The typography rules were applied by hand instead:
// guillemets «…», ё written out everywhere (всё, ещё, счёт, ведёт, остаётся,
// неподелённые, лёгким, преподаёте, надёжного, трёх), em dash with spaces,
// and the en dash reserved for numeral ranges (8–9, 14–16).
//
// Every factual claim was re-checked against the repository on 2026-09-19:
// six locales in src/i18n/config.ts, five game routes in
// src/app/[lang]/(gameplay)/games/, twelve sheets in src/lib/cheat-sheet-data.ts,
// the privacy sentences against the `privacy` namespace in
// src/i18n/dictionaries/ru.ts, and the accessibility paragraphs against
// docs/ACCESSIBILITY.md § 2.
//
// Game names are `{placeholders}` filled from `gamesHub`, never spelled out
// here, so renaming a game cannot leave this page naming the old one.

import type { TeachersCopy } from './en';

export const ru = {
  heading: 'Учителям',
  intro:
    'Что такое ChemGames, что на сайте есть и как вы можете помочь его сформировать. Все остальные страницы написаны для школьников, которые здесь играют; эта — для вас.',

  betaHeading: 'Сайт в бета-версии',
  betaBody:
    'ChemGames ещё строится. Игры меняются, появляются новые, а формулировка подсказки или шпаргалки через месяц может быть другой. Всё, что здесь есть, работает, и всё бесплатно — но пройдите игру сами, прежде чем давать её классу.',

  whatHeading: 'Что это такое',
  whatBody1:
    'Набор бесплатных мини-игр по химии, которые работают прямо в браузере. Устанавливать ничего не нужно, заводить аккаунт — тоже: ученик открывает игру и сразу начинает.',
  whatBody2:
    'Они рассчитаны на 8–9 класс, то есть на 14–16 лет. Каждая игра короткими заходами отрабатывает один навык, а на неверный ответ отвечает не пометкой «ошибка», а разбором: что именно не так и что попробовать дальше.',
  whatBody3:
    'Аккаунт — по желанию. Он сохраняет счёт и прогресс и выводит псевдоним в таблицу лидеров; на сами игры это никак не влияет.',

  onSiteHeading: 'Что есть на сайте',
  gamesIntro: 'Пять игр готовы. Каждая отрабатывает что-то одно:',
  gameAcid:
    'Определить по одной только формуле, кислота это, основание или нейтральное вещество.',
  gameBlaster: 'Читать формулы на скорости и различать почти одинаковые.',
  gameNeutralise:
    'Выбирать H⁺ или OH⁻, чтобы нейтрализовать то, что летит на лабораторию.',
  gameBalancer:
    'Уравнивать реакцию по одному коэффициенту, видя при этом число атомов с каждой стороны.',
  gameLewis:
    'Соединять неспаренные электроны в связи и неподелённые пары и так собирать формулу Льюиса.',
  sheetsIntro:
    'Двенадцать шпаргалок собирают справочный материал, на который опираются игры. Каждая умещается на одну страницу, читается с проектора и печатается:',

  languagesHeading: 'Языки',
  languagesBody1:
    'Сайт выходит на шести языках: английском, немецком, французском, испанском, итальянском и русском. Переключатель — в панели навигации, и выбор запоминается в этом браузере.',
  languagesBody2:
    'Переведено всё, что читает ученик: интерфейс, наставник и подсказки внутри игр, а также шпаргалки. Химические формулы, символы элементов и уравнения не переводятся никогда — уравнение выглядит одинаково на любом языке.',
  languagesBody3:
    'Две вещи от языка не зависят: внешние ссылки на шпаргалках ведут на англоязычные сайты, и каждая шпаргалка ссылается на Victorian Curriculum — австралийскую программу. Это стоит знать, если вы работаете по другой программе.',

  privacyHeading: 'Конфиденциальность данных учеников',
  privacyBody1:
    'На этом сайте нет ни аналитики, ни рекламы, ни сторонних трекеров. То, что ученик здесь делает, ни для кого не измеряется.',
  privacyBody2:
    'Чтобы играть, аккаунт не нужен. Без аккаунта не остаётся ничего, кроме настроек звука и темы, которые браузер хранит у себя на устройстве.',
  privacyBody3:
    'Тот, кто всё же входит в аккаунт, указывает адрес почты и получает сгенерированный псевдоним — никогда не настоящее имя, — и с этого момента сайт хранит его результаты, достигнутые уровни, те необязательные поля профиля, которые он решит заполнить, и его настройки видимости. Что из этого видно всем и как удалить аккаунт вместе со всем его содержимым, написано на отдельной странице: {link}.',
  privacyLinkLabel: 'Конфиденциальность',

  accessibilityHeading: 'Доступность',
  accessibilityBody1:
    'Цель — WCAG 2.2, уровень AA. Именно цель, а не утверждение: аудита не было, и часть сайта до этой планки пока не дотягивает.',
  accessibilityBody2:
    'Что уже работает: цвет никогда не единственный носитель смысла; у кнопок без подписи есть текстовые названия для программ экранного доступа; страницы перестраиваются под экран телефона и под увеличение 200 % без горизонтальной прокрутки; фокус виден везде; и большая часть анимации выключается сама, когда операционная система просит меньше движения.',
  accessibilityBody3:
    'Что не работает — и это стоит знать до того, как планировать урок: {blaster} требует мыши или пальца, потому что до летающих пузырей с клавиатуры не добраться вообще. Таймеры в {blaster} и {neutralise} пока нельзя ни замедлить, ни выключить. Об изменениях счёта, подсказки или сообщения об ошибке программы экранного доступа не сообщают. Работу с клавиатурой в трёх аркадных играх не проверяли игра за игрой, так что считайте её непроверенной, а не поддерживаемой.',
  accessibilityBody4:
    '{balancer} и {lewis} — те две игры, которые с самого начала строили под клавиатуру и так же проверяли. Если кто-то в вашем классе работает с клавиатуры, начните с них.',

  collaborateHeading: 'Учителя-соавторы',
  collaborateWhat:
    'Я ищу нескольких учителей, которые помогут этот проект сформировать. Это значит одно из двух или сразу оба: рассказать, как игра на самом деле прошла в классе — что запутало учеников, какая формулировка не сработала, что оказалось слишком лёгким, — и предложить игры, которых здесь пока нет и которые стоило бы сделать.',
  collaborateCommitment:
    'Никакого минимального участия и никакого графика. Одно сообщение за четверть — уже польза. Одно сообщение один раз — тоже польза.',
  collaborateThanks:
    'В ответ соавторы получают бесплатный доступ к версиям 1.0 и 2.0 игр, как только эти версии появятся.',
  collaborateFreeNow:
    'Чтобы было ясно, чего это стоит: сейчас на сайте всё бесплатно и останется бесплатным на всю бету. Предложение касается платных версий, которые выйдут потом, а не чего-то, за что вы платили бы сегодня.',
  collaborateHow:
    'Чтобы отозваться, нажмите кнопку отзыва в правом нижнем углу любой страницы, выберите категорию «{category}» и напишите, что вы преподаёте и хотели бы помочь. Это весь процесс — второй формы нет, и ничего сверх того, что кнопка отзыва собирает и так, не собирается.',
  collaborateReply:
    'Я читаю всё и отвечаю, но здесь работает один человек и делает это рядом с основной работой: рассчитывайте на пару недель, а не на пару дней, и, пожалуйста, не читайте молчание как отказ.',
  collaborateRecords:
    'Одна практическая оговорка — лучше сказать её сейчас, чем обнаружить потом: отзывы попадают в почтовый ящик, а не в список соавторов. Я отвечу и попрошу адрес, который можно будет сохранить: без надёжного места, где его хранить, обещание про 1.0 и 2.0 выполнить невозможно.',

  feedbackHeading: 'Если что-то не так',
  feedbackBody1:
    'Кнопка отзыва стоит в правом нижнем углу каждой страницы и работает без аккаунта. Категорий три: ошибка в программе, ошибка в химии или в данных, идея.',
  feedbackBody2:
    'Вместе с сообщением уходит страница, на которой вы были, так что описывать место не нужно. Больше всего я хочу знать об ошибках в химии: неверная валентность перед классом — худшее, что этот сайт может сделать.',

  supportHeading: 'Поддержать проект',
  supportBody:
    'Надеюсь, игры пригодились и немного химии по дороге осталось. В проект вложено много труда, а денег за ним нет — ни гранта, ни организации, ни рекламы. Если вы хотите помочь сохранить его бесплатным и без рекламы, поддержите его любой посильной суммой на {link}. Это проект одного человека, а не зарегистрированный благотворительный фонд: налоговый вычет с этого не получить, и никто ничего не ждёт — игры в любом случае останутся бесплатными.',
  supportLinkLabel: 'странице поддержки',
} satisfies TeachersCopy;
