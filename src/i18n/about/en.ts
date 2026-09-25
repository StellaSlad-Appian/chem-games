// src/i18n/about/en.ts
//
// English (en) copy for the About page — the site's case for itself, written
// for parents and teachers. The For Teachers page (src/i18n/teachers/en.ts)
// keeps the practical detail; this page keeps the story and the "why", and
// each links to the other rather than repeating it.
//
// **English only, for now.** See src/i18n/about.ts for why there is no
// fallback and what adding a locale takes.
//
// This page is allowed to persuade, which makes the claims on it the ones
// most worth getting right. The rules it is written to:
//
//   - A research claim is about the *technique* (retrieval practice, feedback,
//     spacing, games in general), never about this site. Each technique
//     named has a source in `sources` below, checked against Crossref when it
//     was written.
//   - Nothing says the games raise marks. No study of this site exists, and
//     `limitsBody1` says so in as many words.
//   - Site facts (free, no ads, no analytics, no account needed, alias not
//     real name, Year 9–10) are the same ones the For Teachers page states,
//     and are re-checked the same way when the thing they describe changes.
//   - No count of games or sheets: "a handful" cannot go stale the way
//     "five" did every time a game shipped.
//
// The biography is the site owner's own account of herself; do not embellish
// it or add detail she has not given.

import type { Translated } from '../format';

export const en = {
  metaTitle: 'About | Games in Chemistry',
  metaDescription:
    'Why Games in Chemistry exists, who makes it, and how short chemistry games with instant feedback can help Year 9–10 students practise — written for parents and teachers.',
  /** The footer link. Lives here, not in the dictionary — see src/i18n/about.ts. */
  footerLabel: 'About',

  heading: 'About Games in Chemistry',
  intro:
    'Why this site exists, who is behind it, and what it can and cannot do for a student. Every other page is written for the students playing; this one is written for parents and teachers.',

  storyHeading: 'Why I built it',
  storyBody1:
    'I’m Stella, and I grew up the daughter of ambitious parents. I know how much practice matters, and how easily it turns into a chore. Games in Chemistry is my attempt at a better version: practice that a student might actually choose to do.',
  storyBody2:
    'I hold a master’s degree in Chemical Biology, and during my studies I also took coursework in chemistry teaching. In the end I chose research and technology over the classroom, and later completed a second master’s, in Applied Computer Science. This site is where those two halves meet.',
  storyBody3:
    'I’m also a parent. My own children are still a few years away from Year 9 chemistry, and I would like this to be ready, and good, by the time they get there.',

  helpHeading: 'How the games are meant to help',
  helpIntro:
    'The games are not built on a new theory. They take a few of the best-supported ideas in learning research and put them into something that is quick to start and easy to repeat.',
  principles: [
    {
      title: 'Recalling, not rereading.',
      body: 'Every round asks a student to produce an answer — classify the compound, balance the equation, place the electrons — rather than read one. Practising recall like this is among the most consistently supported study techniques in cognitive psychology.',
    },
    {
      title: 'Feedback that says what to do next.',
      body: 'A wrong answer is explained on the spot: what was wrong, and what to try instead. Research on feedback finds that this kind, specific and pointing forward, helps more than a mark on its own.',
    },
    {
      title: 'One skill at a time.',
      body: 'Each game practises a single skill in short runs, so ten minutes can go on exactly the thing a student finds hard rather than on everything around it.',
    },
    {
      title: 'Low stakes, lots of repetition.',
      body: 'A round is short and a mistake costs nothing but a restart. That makes it easy to get in the amount of practice fluency takes — and, ideally, to come back on another day, which research favours over one long session.',
    },
    {
      title: 'A reason to go again.',
      body: 'Scores, levels and optional leaderboards give a student something to play for. Meta-analyses of learning games find a modest average benefit over the same material taught without a game, with a great deal depending on how the game is designed.',
    },
  ],

  limitsHeading: 'What I am not claiming',
  limitsBody1:
    'There has been no study of Games in Chemistry itself. The ideas above are well supported in general, but whether these particular games raise a particular student’s marks is something I have not measured, and I would rather say so than let you assume it.',
  limitsBody2:
    'The games practise skills: reading formulae, balancing equations, drawing Lewis structures. They do not teach a topic from scratch, and they are no substitute for a teacher, a textbook or a good explanation. They work best alongside those — ten minutes after a lesson, or as revision before a test.',
  limitsBody3:
    'The site is in beta and pitched at Year 9–10, ages 14–16. There is a handful of finished games so far, so it covers part of that syllabus, not all of it, and more are on the way.',

  parentsHeading: 'For parents',
  // The big, bold pull-quote printed as its own section above the smaller
  // pointer text below it — same device as the For Teachers page's
  // `collaborateHero`. One line rather than two, combining the two things
  // parentsBody1/2 say in full: the site is safe (free, private, no
  // tracking), and it is not just a game — it is built on real learning
  // research. It does not claim the games themselves raise marks; limitsBody1
  // says plainly that no study of this site exists, and this line is not
  // allowed to contradict that.
  parentsHero: 'Free, private, and built on the science of how practice actually works.',
  parentsBody1:
    'Everything is free. There is no advertising, no analytics and no third-party tracking anywhere on the site, and playing needs no account. A student who does sign up is given a generated alias rather than appearing under a real name; the {link} page sets out exactly what is stored and how to delete it.',
  parentsBody2:
    'If you would like to help at home: a short session a few times a week is likely to do more than one long one. And when your child gets something wrong, ask them to explain the feedback back to you — putting it in their own words is part of the learning.',
  privacyLinkLabel: 'privacy',

  teachersHeading: 'For teachers',
  teachersBody:
    'The {link} page has the practical detail: every game and cheat sheet, what works from the keyboard and what does not yet, student privacy in full, and how to join as a teacher collaborator and help decide what gets built next.',

  sourcesHeading: 'The research behind this page',
  sourcesIntro:
    'If you would like to read further, these are the sources behind the claims above. Three are reviews or meta-analyses; the fourth is the experiment most often cited for retrieval practice.',
  sources: [
    {
      citation:
        'Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J. & Willingham, D. T. (2013). Improving students’ learning with effective learning techniques. Psychological Science in the Public Interest, 14(1), 4–58.',
      note: 'Rates practice testing and spaced practice the most useful of ten common study techniques.',
      href: 'https://doi.org/10.1177/1529100612453266',
    },
    {
      citation:
        'Roediger, H. L. & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. Psychological Science, 17(3), 249–255.',
      note: 'Recalling material beat restudying it when students were tested days later.',
      href: 'https://doi.org/10.1111/j.1467-9280.2006.01693.x',
    },
    {
      citation:
        'Hattie, J. & Timperley, H. (2007). The power of feedback. Review of Educational Research, 77(1), 81–112.',
      note: 'Feedback helps most when it says where a student is going wrong and what to do next.',
      href: 'https://doi.org/10.3102/003465430298487',
    },
    {
      citation:
        'Clark, D. B., Tanner-Smith, E. E. & Killingsworth, S. S. (2016). Digital games, design, and learning: A systematic review and meta-analysis. Review of Educational Research, 86(1), 79–122.',
      note: 'Across 57 comparisons, game conditions outperformed non-game ones by a modest margin (d = 0.33) that varied with design.',
      href: 'https://doi.org/10.3102/0034654315582065',
    },
  ],

  /**
   * One sentence on the For Teachers page, under "What this is", pointing
   * here. Kept in this catalogue so it appears only in a locale that has an
   * About page to point to.
   */
  teachersPagePointer: 'Why the site exists, and how the games are meant to help, is on the {link} page.',
  teachersPagePointerLinkLabel: 'About',
} as const;

/** The shape a future locale must match, derived from the English. */
export type AboutCopy = Translated<typeof en>;
