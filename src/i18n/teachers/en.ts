// src/i18n/teachers/en.ts
//
// English (en) copy for the For Teachers page.
//
// This is a per-page catalogue, not part of the shared dictionary, because
// src/app/[lang]/layout.tsx hands the whole dictionary to I18nProvider and so
// serializes every byte of it into the RSC payload of every page. This page is
// the copy's only reader and it is a Server Component, so none of it needs to
// travel anywhere else — see docs/i18n/README.md § "The dictionary is a budget,
// and a game will eat it", which is the same reasoning that moved the game
// catalogues out.
//
// The "For Teachers" page (docs/TEACHERS_PAGE.md). It is the only page on
// the site written for an adult, and the only place money is mentioned —
// the players are 14 to 16 and cannot complete a payment, so the ask lives
// on a page an adult has to go looking for and is never surfaced to a
// student. That audience is why the four translations use the formal
// address (Sie / vous / usted / Lei) while every other namespace uses the
// informal one; each locale file repeats the reasoning where it starts.
//
// Every factual claim here was checked against the repository when it was
// written, and has to be re-checked when the thing it describes changes:
// the locale list against src/i18n/config.ts, the games against
// src/app/[lang]/(gameplay)/games/, the privacy sentences against the
// `privacy` namespace above, and the accessibility paragraphs against
// docs/ACCESSIBILITY.md § 2. A wrong claim here is worse than a wrong
// claim elsewhere: it is read by someone deciding whether to put the site
// in front of a class.
//
// Game names are `{placeholders}` filled from `gamesHub`, never spelled out
// here, so renaming a game cannot leave this page naming the old one.

import type { Translated } from '../format';

export const en = {
  heading: 'For Teachers',
  intro:
    'What ChemGames is, what is on it, and how you can help shape it. Every other page is written for the students playing; this one is written for you.',

  betaHeading: 'The site is in beta',
  betaBody:
    'ChemGames is still being built. Games change, new ones arrive, and the wording of a hint or a cheat sheet may be different next month. Everything here works and everything is free — but play a game through yourself before you put it in front of a class.',

  whatHeading: 'What this is',
  whatBody1:
    'A set of free chemistry mini-games that run in a browser. There is nothing to install and no student account to create: a student opens a game and starts.',
  whatBody2:
    'They are pitched at Year 9–10, ages 14–16. Each game practises a single skill in short runs, and a wrong answer says what was wrong and what to try next rather than only marking it.',
  whatBody3:
    'An account is optional. It saves scores and progress and puts an alias on the leaderboards; nothing about the games themselves changes.',

  onSiteHeading: 'What is on the site',
  gamesIntro: 'Five games are finished. Each one practises a single thing:',
  gameAcid: 'Sorting a compound into acid, base or neutral from its formula alone.',
  gameBlaster: 'Reading formulae at speed and telling near-identical ones apart.',
  gameNeutralise: 'Choosing H⁺ or OH⁻ to neutralise whatever is heading for the lab.',
  gameBalancer:
    'Balancing an equation one coefficient at a time, with the atom count on each side visible as you work.',
  gameLewis:
    'Pairing unpaired electrons into bonds and lone pairs to build a Lewis structure.',
  sheetsIntro:
    'Twelve cheat sheets carry the reference material the games lean on. Each is a single page, readable on a projector and printable:',

  languagesHeading: 'Languages',
  languagesBody1:
    'The site ships in five languages: English, German, French, Spanish and Italian. The switcher is in the navigation bar, and the choice is remembered on that browser.',
  languagesBody2:
    'Everything a student reads is translated — the interface, the coaching and hints inside the games, and the cheat sheets. Chemical formulae, element symbols and equations are never translated, so an equation looks the same in every language.',
  languagesBody3:
    'Russian is planned but has not shipped. There is no Russian on the site today.',

  privacyHeading: 'Student privacy',
  privacyBody1:
    'There is no analytics, no advertising and no third-party tracking anywhere on this site. Nothing a student does here is measured for anybody else.',
  privacyBody2:
    'Playing needs no account. Someone who plays without one leaves nothing behind but the sound and theme preferences their own browser keeps for them.',
  privacyBody3:
    'A student who does sign in gives an email address and is given a generated alias, never a real name, and from then on the site stores their scores, the levels they reach, whichever optional profile fields they choose to fill in, and their visibility settings. What of that is public, and how to delete an account and everything in it, is set out on the {link} page.',
  privacyLinkLabel: 'privacy',

  accessibilityHeading: 'Accessibility',
  accessibilityBody1:
    'The target is WCAG 2.2 level AA. That is a target rather than a claim: the site has not been audited, and parts of it do not meet the bar yet.',
  accessibilityBody2:
    'What holds today: colour is never the only thing carrying meaning, icon-only buttons have text names for screen readers, pages reflow to a phone screen and to 200% zoom without sideways scrolling, focus is visible throughout, and most animation switches itself off when the operating system asks for reduced motion.',
  accessibilityBody3:
    'What does not, and it is worth knowing before you plan a lesson: {blaster} needs a pointer, because its moving bubbles cannot be reached from the keyboard at all. The countdowns in {blaster} and {neutralise} cannot yet be slowed down or switched off. Changes to the score, to a hint or to an error message are not announced to a screen reader. Keyboard play in the three arcade games has not been checked game by game, so please treat it as unverified rather than supported.',
  accessibilityBody4:
    '{balancer} and {lewis} are the two that were built keyboard-first and tested that way. If a student in your class works from the keyboard, start there.',

  collaborateHeading: 'Teacher collaborators',
  collaborateWhat:
    'I am looking for a few teachers to help shape this. That means either or both of two things: telling me how a game actually went with a class — what confused students, which wording misfired, what was too easy — and suggesting games worth building that are not here yet.',
  collaborateCommitment:
    'There is no minimum commitment and no schedule. A message once a term is useful. A single message, once, is useful.',
  collaborateThanks:
    'In return, collaborators get free access to version 1.0 and version 2.0 of the games once those versions exist.',
  collaborateFreeNow:
    'To be clear about what that is worth: everything on the site is free right now and stays free for the whole beta. The offer is about the paid versions that come after it, not about anything you would be paying for today.',
  collaborateHow:
    'To put your hand up, use the feedback button in the bottom-right corner of any page, choose the “{category}” category, and say that you teach and would like to help. That is the whole process — there is no second form, and nothing is collected beyond what the feedback button already collects.',
  collaborateReply:
    'I read everything and I do reply, but this is one person working around a job: assume a couple of weeks rather than a couple of days, and please do not read silence as a no.',
  collaborateRecords:
    'One practical caveat, better said now than discovered later: feedback arrives in an inbox, not in a list of collaborators. I will write back and ask for an address to keep on file, because without somewhere durable to keep it, the 1.0 and 2.0 offer is not one I could honour.',

  feedbackHeading: 'Telling me something is wrong',
  feedbackBody1:
    'The feedback button sits in the bottom-right corner of every page and works without an account. It offers three categories: a bug, a chemistry or data error, or an idea.',
  feedbackBody2:
    'It sends the page you were on along with your message, so there is no need to describe where you were. Chemistry errors are the ones I most want to hear about: a wrong valency in front of a class is the worst thing this site can do.',

  supportHeading: 'Support this project',
  supportBody:
    'I hope the games have been useful and that some chemistry stuck along the way. A lot of care goes into this and there is no funding behind it — no grant, no institution, no advertising — so if you would like to help keep it free and ad-free, you can chip in whatever amount suits you on {link}. This is one person’s project rather than a registered charity, so nothing given is tax-deductible and nothing is expected; the games stay free either way.',
  supportLinkLabel: 'the support page',
} as const;

/**
 * The shape every other locale must match. Derived from the English, the same
 * way `Dictionary` is derived from the English dictionary, so adding a key
 * here is a compile error in the other four files until they carry it too.
 */
export type TeachersCopy = Translated<typeof en>;
